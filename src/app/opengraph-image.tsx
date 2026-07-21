import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} · Full Stack Software Engineer`;

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
            "linear-gradient(135deg, rgb(250, 249, 246) 0%, rgb(244, 242, 237) 50%, rgb(229, 229, 224) 100%)",
          color: "rgb(26, 26, 26)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={200}
          height={133}
          style={{ objectFit: "contain", marginBottom: 36 }}
          alt=""
        />
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 36, color: "rgb(17, 94, 89)", marginTop: 12 }}>
          Full Stack Software Engineer
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgb(82, 82, 82)",
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {profile.tagline.en}
        </div>
      </div>
    ),
    { ...size },
  );
}
