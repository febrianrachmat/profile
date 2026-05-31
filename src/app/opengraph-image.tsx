import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} · ${profile.role.en}`;

export default function OpengraphImage() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 20,
            border: "4px solid #64ffda",
            color: "#64ffda",
            fontSize: 44,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          {profile.initials}
        </div>
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
