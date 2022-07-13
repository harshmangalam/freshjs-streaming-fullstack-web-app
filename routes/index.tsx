/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { checkFileStatus } from "../utils/videos.ts";

const VIDEOS_DIR = `static/videos`;

interface Data {
  videos: string[];
}
export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    await checkFileStatus();
    const videos: string[] = [];
    for await (const file of Deno.readDir(VIDEOS_DIR)) {
      videos.push(file.name);
    }
    return ctx.render({ videos });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { videos } = data;

  if (!videos.length) {
    return (
      <div className={tw`h-screen grid place-items-center`}>
        <div className={tw`flex flex-col space-y-4 items-center`}>
          <p className={tw`text-xl font-bold`}>No Videos</p>
          <a
            href="/create"
            className={tw`bg-blue-500 px-4 py-2 rounded-md text-white`}
          >
            Upload Videos
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className={tw`min-h-screen bg-gray-100`}>
      <div className={tw`py-4 container mx-auto py-8 px-2`}>
        <a
          href="/create"
          className={tw`bg-blue-500 px-4 py-2 rounded-md text-white`}
        >
          Upload Videos
        </a>

        <div className={tw`grid grid-cols-4 gap-4 py-4`}>
          {videos.map((video: string) => (
            <div
              key={video}
              className={tw`flex flex-col space-y-4 shadow rounded-md`}
            >
              <img
                src={`/videos/${video}`}
                className={tw`w-full h-60 aspect-video rounded-t-md`}
                alt={video}
              />
              <h6 className={tw`text-lg font-medium text-blue-400`}>{video}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
