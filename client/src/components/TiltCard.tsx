import { useRef, ReactNode, CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionStyle } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  max?: number;
  testId?: string;
}

export default function TiltCard({
  children,
  className = "",
  style,
  max = 6,
  testId,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      } as MotionStyle}
      className={className}
      data-testid={testId}
    >
      {children}
    </motion.div>
  );
}
