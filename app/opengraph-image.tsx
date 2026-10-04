import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.siteName} — ${siteConfig.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: siteConfig.theme.primary,
          color: siteConfig.theme.background,
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#E4C98A" }}>
          {`${siteConfig.city.toUpperCase()} · ${siteConfig.country.toUpperCase()}`}
        </div>
        <div style={{ display: "flex", fontSize: 76, marginTop: 18, lineHeight: 1 }}>
          {siteConfig.siteName}
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 18 }}>{siteConfig.slogan}</div>
      </div>
    ),
    { ...size },
  );
}
