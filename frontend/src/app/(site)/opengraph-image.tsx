import { ImageResponse } from "next/og";
import { HOTEL } from "@/lib/data";

export const runtime = "edge";
export const alt = HOTEL.name;
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #2A2A2A 0%, #050505 100%)",
          fontFamily: "serif"
        }}
      >
        <div
          style={{
            display: "flex",
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "6px solid #D4AF37",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32
          }}
        >
          <span style={{ color: "#D4AF37", fontSize: 44, fontWeight: 700 }}>6/14</span>
        </div>
        <div style={{ display: "flex", color: "#ffffff", fontSize: 64, fontWeight: 700, letterSpacing: 2 }}>6/14 Co-Living</div>
        <div style={{ display: "flex", color: "#D4AF37", fontSize: 26, letterSpacing: 8, marginTop: 16 }}>VIVE · COMPARTE · PERTENECE</div>
      </div>
    ),
    { ...size }
  );
}
