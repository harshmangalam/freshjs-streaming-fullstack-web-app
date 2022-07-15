import { Handlers } from "$fresh/server.ts";
import {
  getStream,
  getVideoSize,
  videoBlockSize,
  VIDEOS_DIR,
} from "../../utils/videos.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const videoName = url.searchParams.get("videoName");

    if (!videoName) {
      return new Response(
        JSON.stringify({ error: "Provide videoName query string" }),
        {
          status: 400,
        }
      );
    }
    let videoSize = 0;

    try {
      videoSize = await getVideoSize(videoName);
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    // console.log("videoSize", videoSize);

    // check for range headers
    if (!req.headers.has("range")) {
      return new Response(
        JSON.stringify({ error: "Range header is required" }),
        {
          status: 400,
        }
      );
    }

    const startIndex = req.headers.has("range")
      ? Number(req.headers.get("range")?.replace(/\D/g, "")?.trim())
      : 0;

    // console.log("startIndex", startIndex);
    const endIndex = Math.min(startIndex + videoBlockSize, videoSize);

    console.log("endIndex", endIndex);

    const video = await Deno.open(`${VIDEOS_DIR}/${videoName}`);
    if (startIndex > 0) {
      await Deno.seek(video.rid, startIndex, Deno.SeekMode.Start);
    }
    return new Response(getStream(video), {
      status: 206,
      headers: {
        "Content-Range": `bytes ${startIndex}-${endIndex}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": `${endIndex - startIndex}`,
        "Content-Type": "video/mp4",
      },
    });
  },
};
