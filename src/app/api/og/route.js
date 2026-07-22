import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "BizTech Editorial Insight";
    const category = searchParams.get("category") || "BizTech Blogging";
    const author = searchParams.get("author") || "BizTech Contributor";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#05070b",
            backgroundImage: "radial-gradient(circle at 25% 25%, #181035 0%, #05070b 60%)",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #00d8bd 100%)",
                padding: "8px 18px",
                borderRadius: "20px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              {category}
            </div>
            <span style={{ color: "#728096", fontSize: "20px" }}>• BizTech Blogging</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1000px" }}>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "800",
                lineHeight: "1.25",
                color: "#ffffff",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "24px" }}>
            <span style={{ fontSize: "22px", color: "#a9b4c6", fontWeight: "600" }}>By {author}</span>
            <span style={{ fontSize: "20px", color: "#00d8bd", fontWeight: "bold" }}>biztechra.site</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    return new Response(`Failed to generate the OG image`, { status: 500 });
  }
}
