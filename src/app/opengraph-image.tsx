import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GIRA — Structurer. Financer. Exécuter des projets en Afrique.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 60%, #0D0D0D 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #C9A84C 0%, #D4AF37 50%, #C9A84C 100%)",
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            right: "-100px",
            bottom: "-100px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-40px",
            bottom: "-40px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.08)",
          }}
        />

        {/* Top: Logo */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span
              style={{
                fontSize: "52px",
                fontWeight: "900",
                color: "#C9A84C",
                letterSpacing: "-1px",
                lineHeight: 1,
              }}
            >
              GIRA
            </span>
            <span
              style={{
                fontSize: "15px",
                fontWeight: "400",
                color: "rgba(232,213,163,0.6)",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Cabinet d&apos;exécution
            </span>
          </div>
        </div>

        {/* Center: Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: "800",
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            Structurer.
            <br />
            Financer.
            <span style={{ color: "#C9A84C" }}> Exécuter.</span>
          </div>
          <div
            style={{
              width: "56px",
              height: "3px",
              background: "#C9A84C",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              fontWeight: "400",
              color: "#E8D5A3",
              lineHeight: 1.5,
              maxWidth: "680px",
            }}
          >
            Des projets structurants qui transforment durablement l&apos;Afrique.
          </div>
        </div>

        {/* Bottom: CTA + presences */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* CTA button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#C9A84C",
              color: "#0D0D0D",
              fontSize: "18px",
              fontWeight: "700",
              padding: "14px 28px",
              borderRadius: "8px",
              letterSpacing: "0.5px",
            }}
          >
            Parlons de votre projet →
          </div>

          {/* Presences */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {["Paris", "Casablanca", "Bratislava"].map((city) => (
              <div
                key={city}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  color: "rgba(232,213,163,0.65)",
                  letterSpacing: "1px",
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#C9A84C",
                  }}
                />
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
