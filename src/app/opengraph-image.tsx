import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/constants";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Accent the surname so the lockup matches the hero.
const [given, ...rest] = siteConfig.name.split(" ");
const family = rest.join(" ");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBF9F4",
          color: "#1A1815",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent rule + label row */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ width: "72px", height: "3px", background: "#C4371C" }} />
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#6B655C",
            }}
          >
            00 — Portfolio
          </div>
        </div>

        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "132px",
              lineHeight: 0.92,
              letterSpacing: "-4px",
              display: "flex",
            }}
          >
            {given}
            <span style={{ color: "#C4371C" }}>&nbsp;{family}</span>
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "36px",
              color: "#3A362F",
              letterSpacing: "-0.5px",
            }}
          >
            {siteConfig.title}
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid #D9D3C7",
            paddingTop: "28px",
            fontSize: "22px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#6B655C",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span>React</span>
            <span>Next.js</span>
            <span>TypeScript</span>
          </div>
          <div style={{ color: "#C4371C" }}>Open to work</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
