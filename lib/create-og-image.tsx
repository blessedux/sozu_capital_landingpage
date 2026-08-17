import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OG_SIZE, ogCopy, type OgCopy, type OgLocale } from "@/content/og";

const HERO_STILL = join(
  process.cwd(),
  "public/hero/digital-antiquity-agora.png"
);
const FONT_DIR = join(
  process.cwd(),
  "node_modules/@dannymichel/proxima-nova/files"
);

function toArrayBuffer(file: Buffer): ArrayBuffer {
  return file.buffer.slice(
    file.byteOffset,
    file.byteOffset + file.byteLength
  ) as ArrayBuffer;
}

export async function createOgImage(locale: OgLocale) {
  const copy: OgCopy = ogCopy[locale];
  const [heroStill, fontRegular, fontBold] = await Promise.all([
    readFile(HERO_STILL),
    readFile(join(FONT_DIR, "proxima-nova-latin-400-normal.woff")),
    readFile(join(FONT_DIR, "proxima-nova-latin-700-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0b1218",
          overflow: "hidden",
        }}
      >
        {/* Hero poster — same still as the landing video fallback */}
        <img
          src={`data:image/jpeg;base64,${heroStill.toString("base64")}`}
          alt=""
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: OG_SIZE.width,
            height: OG_SIZE.height,
            objectFit: "cover",
            objectPosition: "40% 50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(to top, rgba(11,18,24,0.92) 0%, rgba(11,18,24,0.42) 46%, rgba(11,18,24,0.1) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            right: 72,
            bottom: 56,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Proxima Nova",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "rgba(245,251,252,0.7)",
              marginBottom: 22,
            }}
          >
            SOZU
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Proxima Nova",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#f5fbfc",
            }}
          >
            <div style={{ display: "flex" }}>{copy.titleLines[0]}</div>
            <div style={{ display: "flex" }}>{copy.titleLines[1]}</div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Proxima Nova",
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.3,
              color: "#d5e2e6",
              marginTop: 22,
            }}
          >
            {copy.oneLiner}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Proxima Nova",
          data: toArrayBuffer(fontRegular),
          weight: 400,
          style: "normal",
        },
        {
          name: "Proxima Nova",
          data: toArrayBuffer(fontBold),
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
