import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// No border-radius here on purpose: iOS applies its own rounded-square mask
// to home screen icons, so a pre-rounded background would get double-masked.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#6B7C3C",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            fontFamily: "serif",
            color: "#FFFFFF",
          }}
        >
          M
        </div>
      </div>
    ),
    size,
  );
}
