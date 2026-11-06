import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { join } from "path";

const avatarData = readFileSync(
  join(process.cwd(), "attached_assets/omerskywalker_1762452408837.jpeg")
);
const avatarBase64 = `data:image/jpeg;base64,${avatarData.toString("base64")}`;

const jakartaRegular = fetch(
  "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NSg.ttf"
).then((r) => r.arrayBuffer());

const jakartaBold = fetch(
  "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_TknNSg.ttf"
).then((r) => r.arrayBuffer());

const frauncesDisplay = fetch(
  "https://fonts.gstatic.com/s/fraunces/v38/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcUByjDg.ttf"
).then((r) => r.arrayBuffer());

const jetbrainsMono = fetch(
  "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPQ.ttf"
).then((r) => r.arrayBuffer());

let fontsCache: Array<{ name: string; data: ArrayBuffer; weight: number; style: string }> | null = null;

async function getFonts() {
  if (fontsCache) return fontsCache;
  const [regular, bold, display, mono] = await Promise.all([jakartaRegular, jakartaBold, frauncesDisplay, jetbrainsMono]);
  fontsCache = [
    { name: "Plus Jakarta Sans", data: regular, weight: 400, style: "normal" },
    { name: "Plus Jakarta Sans", data: bold, weight: 700, style: "normal" },
    { name: "Fraunces", data: display, weight: 700, style: "normal" },
    { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
  ];
  return fontsCache;
}

const industryCards = [
  { label: "FINTECH", color: "#117ACA" },
  { label: "E-COMMERCE", color: "#FF4040" },
  { label: "ENTERPRISE", color: "#0099CC" },
  { label: "FOSS", color: "#F59E0B" },
];

let ogImageCache: { buffer: Buffer; timestamp: number } | null = null;
const CACHE_TTL = 1000 * 60 * 15;

export async function generateOGImage(): Promise<Buffer> {
  if (ogImageCache && Date.now() - ogImageCache.timestamp < CACHE_TTL) {
    return ogImageCache.buffer;
  }

  const fonts = await getFonts();

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#161620",
          position: "relative",
          overflow: "hidden",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #F7931A, rgba(247,147,26,0.3), transparent)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "280px",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                padding: "44px 28px 40px 28px",
                justifyContent: "flex-start",
                gap: "20px",
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: avatarBase64,
                    width: 150,
                    height: 150,
                    style: {
                      borderRadius: "50%",
                      border: "4px solid rgba(247,147,26,0.2)",
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                      alignItems: "center",
                    },
                    children: [
                      { type: "div", props: { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }, children: [
                        { type: "div", props: { style: { fontSize: "36px", fontWeight: 700, color: "#ffffff", fontFamily: "Plus Jakarta Sans" }, children: "7+" } },
                        { type: "div", props: { style: { fontSize: "11px", color: "#F7931A", fontFamily: "JetBrains Mono", letterSpacing: "0.15em" }, children: "YEARS" } },
                      ] } },
                      { type: "div", props: { style: { width: "1px", height: "40px", backgroundColor: "rgba(255,255,255,0.1)" } } },
                      { type: "div", props: { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }, children: [
                        { type: "div", props: { style: { fontSize: "36px", fontWeight: 700, color: "#ffffff", fontFamily: "Plus Jakarta Sans" }, children: "6M" } },
                        { type: "div", props: { style: { fontSize: "11px", color: "#F7931A", fontFamily: "JetBrains Mono", letterSpacing: "0.15em" }, children: "DAILY USERS" } },
                      ] } },
                      { type: "div", props: { style: { width: "1px", height: "40px", backgroundColor: "rgba(255,255,255,0.1)" } } },
                      { type: "div", props: { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }, children: [
                        { type: "div", props: { style: { fontSize: "36px", fontWeight: 700, color: "#ffffff", fontFamily: "Plus Jakarta Sans" }, children: "4" } },
                        { type: "div", props: { style: { fontSize: "11px", color: "#F7931A", fontFamily: "JetBrains Mono", letterSpacing: "0.15em" }, children: "DOMAINS" } },
                      ] } },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                flex: "1",
                padding: "44px 48px 32px 56px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "80px",
                      fontWeight: 700,
                      color: "#ffffff",
                      fontFamily: "Fraunces",
                      lineHeight: 1.0,
                      marginBottom: "6px",
                    },
                    children: "Omer Siddiqui",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "32px",
                      fontWeight: 400,
                      color: "#F7931A",
                      fontFamily: "JetBrains Mono",
                      letterSpacing: "0.03em",
                      marginBottom: "24px",
                    },
                    children: "Software Engineer",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { display: "flex", flexDirection: "column", gap: "4px", marginBottom: "24px" },
                    children: [
                      { type: "div", props: { style: { fontSize: "22px", color: "rgba(255,255,255,0.85)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.5 }, children: "Building production systems at JPMorgan Chase" } },
                      { type: "div", props: { style: { fontSize: "22px", color: "rgba(255,255,255,0.5)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.5 }, children: "prev: Macy's Technology, Lumen Technologies" } },
                      { type: "div", props: { style: { fontSize: "22px", color: "rgba(255,255,255,0.5)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.5 }, children: "7+ years of experience across 4 different domains" } },
                    ],
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" },
                    children: industryCards.map((card) => ({
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 18px",
                          borderRadius: "6px",
                          border: `2px solid ${card.color}`,
                          backgroundColor: "transparent",
                        },
                        children: {
                          type: "div",
                          props: {
                            style: { fontSize: "14px", fontWeight: 400, color: card.color, fontFamily: "JetBrains Mono", letterSpacing: "0.1em" },
                            children: card.label,
                          },
                        },
                      },
                    })),
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flex: "1",
                      gap: "36px",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      paddingTop: "24px",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: { display: "flex", flexDirection: "column", flex: "1", gap: "10px" },
                          children: [
                            { type: "div", props: { style: { fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono", letterSpacing: "0.15em" }, children: "HOW I WORK" } },
                            { type: "div", props: { style: { fontSize: "22px", color: "#ffffff", fontFamily: "Plus Jakarta Sans", lineHeight: 1.4 }, children: "Boring code wins." } },
                            { type: "div", props: { style: { fontSize: "22px", color: "#ffffff", fontFamily: "Plus Jakarta Sans", lineHeight: 1.4 }, children: "Plan for failure." } },
                            { type: "div", props: { style: { fontSize: "22px", color: "#ffffff", fontFamily: "Plus Jakarta Sans", lineHeight: 1.4 }, children: "What's the scope?" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: fonts as any,
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const pngData = resvg.render();
  const buffer = Buffer.from(pngData.asPng());
  ogImageCache = { buffer, timestamp: Date.now() };
  return buffer;
}
