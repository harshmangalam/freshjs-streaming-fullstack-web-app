/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { checkFileStatus, VIDEOS_DIR } from "../utils/videos.ts";
import { tw } from "../utils/twind.ts";
export const handler: Handlers = {
  async POST(req, ctx) {
    await checkFileStatus();
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return ctx.render({ error: "Please select video to upload" });
    }
    const arrBuffer = await file.arrayBuffer();
    const uintArrBuffer = new Uint8Array(arrBuffer);
    const fileName = `${Date.now()}-${file.name}`;
    Deno.writeFile(`${VIDEOS_DIR}/${fileName}`, uintArrBuffer, {
      create: true,
    });
    return new Response(undefined, {
      status: 302,
      headers: {
        location: "/",
      },
    });
  },
};
export default function Create({ data }: PageProps) {
  return (
    <div className={tw`h-screen grid place-items-center`}>
      <form
        method="POST"
        encType="multipart/form-data"
        className={tw`flex flex-col space-y-4`}
      >
        <div className={tw`flex flex-col space-y-2`}>
          <input
            accept="video/*"
            type="file"
            name="file"
            id="file"
            className={tw`${
              data?.error ? "ring-2 ring-red-500 py-2 px-4" : ""
            }`}
          />
          {data?.error && <p className={tw`text-red-500`}>{data.error}</p>}
        </div>
        <button
          className={tw`bg-blue-500 px-4 py-2 rounded-md text-white`}
          type="submit"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
}
