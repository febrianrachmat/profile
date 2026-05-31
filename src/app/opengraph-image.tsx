import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} · ${profile.role.en}`;

export default function OpengraphImage() {
  const logo = readFileSync(join(process.cwd(), "public", "logo-rf.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(900px circle at 20% 0%, #112240, #0a192f 60%)",
          color: "#ccd6f6",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={240}
          height={160}
          style={{ objectFit: "contain", marginBottom: 36 }}
          alt=""
        />
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 36, color: "#64ffda", marginTop: 12 }}>
          {profile.role.en}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#8892b0",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {profile.tagline.en}
        </div>
      </div>
    ),
    { ...size }
  );
}
