import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// Imagen que aparece al compartir el link (LinkedIn, WhatsApp, etc.)
export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px 80px",
          background: "#16352a",
          color: "#f5efe3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#1f5b45",
              border: "4px solid #f5efe3",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            AR
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#bfd2c5" }}>{profile.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            {profile.name}
            <span style={{ color: "#e8732f" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 44,
              fontWeight: 600,
              color: "#f59a5e",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#bfd2c5" }}>
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"].map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 999,
                border: "2px solid #2a5243",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
