import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GIRA — Cabinet d'exécution des projets structurants en Afrique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 50%, #0D0D0D 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative gold line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #C9A84C, #D4AF37, #C9A84C)",
          }}
        />

        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: "1px solid rgba(201, 168, 76, 0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "-60px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            border: "1px solid rgba(201, 168, 76, 0.1)",
          }}
        />

        {/* GIRA logo */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "32px" }}>
          <span
            style={{
              fontSize: "80px",
              fontWeight: "900",
              color: "#C9A84C",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            GIRA
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#E8D5A3",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            Cabinet d&apos;exécution
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "60px",
            height: "2px",
            background: "#C9A84C",
            marginBottom: "32px",
          }}
        />

        {/* Main title */}
        <div
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#FFFFFF",
            lineHeight: 1.2,
            maxWidth: "800px",
            marginBottom: "24px",
          }}
        >
          Des projets structurants
          <br />
          qui transforment l&apos;Afrique
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: "400",
            color: "#E8D5A3",
            lineHeight: 1.5,
            maxWidth: "700px",
          }}
        >
          Structuration · Financement · Exécution
        </div>

        {/* Presences */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "80px",
            display: "flex",
            gap: "24px",
          }}
        >
          {["Paris", "Casablanca", "Bratislava"].map((city) => (
            <div
              key={city}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                color: "rgba(232, 213, 163, 0.7)",
                letterSpacing: "1px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#C9A84C",
                }}
              />
              {city}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "14px",
            color: "rgba(232, 213, 163, 0.5)",
            letterSpacing: "1px",
          }}
        >
          gira-cf.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
