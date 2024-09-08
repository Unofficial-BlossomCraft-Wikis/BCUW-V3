import { Resvg } from "@resvg/resvg-js";
import { getSvg } from "./[username].svg";
import { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const svg = await getSvg(params.username);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "zoom", value: 1200 / 260 },
    font: {
      loadSystemFonts: false,
      fontDirs: ["./src/fonts"],
      defaultFontFamily: "Inter Tight",
      monospaceFamily: "IBM Plex Mono",
    },
  });
  return new Response(resvg.render().asPng(), {
    headers: { "Content-Type": "image/png" },
  });
};
