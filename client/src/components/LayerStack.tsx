import { useEffect, useRef, useState } from "react";

type ThreeModule = typeof import("three");

const LAYERS = [
  { name: "Business goals", tag: "why" },
  { name: "Product & users", tag: "why" },
  { name: "The work", tag: "you are here" },
  { name: "Services & data", tag: "how" },
  { name: "Infrastructure", tag: "how" },
];
const CENTER = 2;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/**
 * A stack of five layers with "the work" in the middle. Illustrates the
 * "two layers above, two layers below" idea from the About copy.
 * three.js is loaded on first approach to the viewport, so it stays out of the
 * initial bundle. Falls back to a plain list if WebGL is unavailable.
 */
export default function LayerStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let started = false;
    let teardown: (() => void) | undefined;

    const start = async () => {
      if (started) return;
      started = true;

      let THREE: ThreeModule;
      try {
        THREE = await import("three");
      } catch {
        setFailed(true);
        return;
      }
      if (disposed) return;

      let renderer: InstanceType<ThreeModule["WebGLRenderer"]>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setFailed(true);
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.prepend(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

      const WIDTH = 4.2;
      const DEPTH = 2.7;
      const ORANGE = 0xf7931a;

      const planes = LAYERS.map((_, i) => {
        const isCenter = i === CENTER;
        const geometry = new THREE.BoxGeometry(WIDTH, 0.03, DEPTH);
        const fill = new THREE.MeshBasicMaterial({
          color: ORANGE,
          transparent: true,
          opacity: 0.05,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geometry, fill);
        const edgeGeometry = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: ORANGE,
          transparent: true,
          opacity: 0.5,
        });
        const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
        mesh.add(edges);
        scene.add(mesh);
        return { mesh, fill, edgeMaterial, geometry, edgeGeometry, isCenter };
      });

      // A small marker that travels down through every layer, like a request.
      const packetGeometry = new THREE.SphereGeometry(0.075, 16, 16);
      const packetMaterial = new THREE.MeshBasicMaterial({ color: ORANGE });
      const packet = new THREE.Mesh(packetGeometry, packetMaterial);
      scene.add(packet);

      let isDark = document.documentElement.classList.contains("dark");
      const applyTheme = () => {
        isDark = document.documentElement.classList.contains("dark");
        planes.forEach((p) => {
          if (p.isCenter) {
            p.fill.color.setHex(ORANGE);
            p.fill.opacity = isDark ? 0.22 : 0.2;
            p.edgeMaterial.color.setHex(ORANGE);
            p.edgeMaterial.opacity = 1;
          } else {
            p.fill.color.setHex(isDark ? 0xffffff : 0x000000);
            p.fill.opacity = isDark ? 0.04 : 0.035;
            p.edgeMaterial.color.setHex(isDark ? 0xffffff : 0x1a1a1a);
            p.edgeMaterial.opacity = isDark ? 0.35 : 0.4;
          }
        });
      };
      applyTheme();
      const themeObserver = new MutationObserver(() => {
        applyTheme();
        if (reduceMotion) render(performance.now());
      });
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      let width = 1;
      let height = 1;
      const resize = () => {
        width = Math.max(container.clientWidth, 1);
        height = Math.max(container.clientHeight, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // Shift the stack left so it sits closer to its labels on wide screens.
        camera.setViewOffset(width, height, width * (width > 700 ? 0.1 : 0.14), 0, width, height);
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(() => {
        resize();
        if (reduceMotion) render(performance.now());
      });
      resizeObserver.observe(container);

      const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
      const onPointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      };
      if (!reduceMotion) container.addEventListener("pointermove", onPointerMove);

      let gap = 0.55;
      const projected = new THREE.Vector3();

      const render = (now: number) => {
        // Scroll progress of the container through the viewport (0 to 1).
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = reduceMotion ? 0.5 : clamp((vh - rect.top) / (vh + rect.height));

        const targetGap = reduceMotion ? 0.95 : 0.55 + 0.5 * clamp((progress - 0.1) / 0.35);
        gap += (targetGap - gap) * 0.08;
        mouse.sx += (mouse.x - mouse.sx) * 0.05;
        mouse.sy += (mouse.y - mouse.sy) * 0.05;

        const azimuth = (reduceMotion ? 0.35 : -0.55 + progress * 1.3) + mouse.sx * 0.18;
        const elevation = 0.34 + mouse.sy * -0.06;
        const distance = camera.aspect < 1.3 ? 17 : 9.5;
        camera.position.set(
          Math.sin(azimuth) * Math.cos(elevation) * distance,
          Math.sin(elevation) * distance,
          Math.cos(azimuth) * Math.cos(elevation) * distance
        );
        camera.lookAt(0, 0, 0);

        planes.forEach((p, i) => {
          p.mesh.position.y = (CENTER - i) * gap;
        });

        const top = CENTER * gap;
        const t = reduceMotion ? 0.5 : (now * 0.00028) % 1;
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        packet.position.set(0, top - eased * top * 2, 0);

        renderer.render(scene, camera);

        // Pin each HTML label to its layer's projected height.
        labelRefs.current.forEach((el, i) => {
          if (!el) return;
          projected.set(0, (CENTER - i) * gap, 0).project(camera);
          const y = (-projected.y * 0.5 + 0.5) * height;
          el.style.transform = `translateY(${y}px) translateY(-50%)`;
        });
      };

      let raf = 0;
      let visible = false;
      const loop = (now: number) => {
        if (!visible || disposed) {
          raf = 0;
          return;
        }
        render(now);
        raf = requestAnimationFrame(loop);
      };

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (reduceMotion) {
            if (visible) render(performance.now());
            return;
          }
          if (visible && !raf) raf = requestAnimationFrame(loop);
        },
        { threshold: 0 }
      );
      visibilityObserver.observe(container);

      if (reduceMotion) render(performance.now());

      teardown = () => {
        visible = false;
        if (raf) cancelAnimationFrame(raf);
        visibilityObserver.disconnect();
        resizeObserver.disconnect();
        themeObserver.disconnect();
        container.removeEventListener("pointermove", onPointerMove);
        planes.forEach((p) => {
          p.geometry.dispose();
          p.edgeGeometry.dispose();
          p.fill.dispose();
          p.edgeMaterial.dispose();
        });
        packetGeometry.dispose();
        packetMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Load three.js only when the section is about to come into view.
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadObserver.disconnect();
          void start();
        }
      },
      { rootMargin: "300px 0px" }
    );
    loadObserver.observe(container);

    return () => {
      disposed = true;
      loadObserver.disconnect();
      teardown?.();
    };
  }, []);

  if (failed) {
    return (
      <ol className="space-y-2 font-mono text-sm text-muted-foreground" data-testid="layer-stack-fallback">
        {LAYERS.map((layer, i) => (
          <li key={layer.name} className={i === CENTER ? "text-primary" : undefined}>
            {layer.name} <span className="opacity-60">({layer.tag})</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] md:h-[460px] overflow-hidden"
      data-testid="layer-stack"
      role="img"
      aria-label="Diagram of five stacked layers: business goals, product and users, the work, services and data, and infrastructure. Two layers above the work explain why; two layers below explain how."
    >
      <div className="absolute inset-y-0 right-0 w-[44%] sm:w-[34%] pointer-events-none">
        {LAYERS.map((layer, i) => (
          <div
            key={layer.name}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className="absolute top-0 right-0 text-right will-change-transform"
            style={{ transform: `translateY(${(i + 0.5) * 20}%)` }}
          >
            <div
              className={
                i === CENTER
                  ? "font-display text-base md:text-lg font-semibold text-primary leading-tight"
                  : "font-display text-sm md:text-base text-foreground/80 leading-tight"
              }
            >
              {layer.name}
            </div>
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
              {layer.tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
