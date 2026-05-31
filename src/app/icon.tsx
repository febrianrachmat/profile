import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a192f",
          color: "#64ffda",
          fontSize: 30,
          fontWeight: 700,
          borderRadius: 14,
          border: "3px solid #64ffda",
        }}
      >
        {profile.initials}
      </div>
    ),
    { ...size }
  );
}
