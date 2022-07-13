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

        <div className={tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-4`}>
          {videos.map((video: string) => (
            <div
              key={video}
              className={tw`flex flex-col space-y-4 shadow rounded-md`}
            >
              <img
                src={`https://png.pngtree.com/png-vector/20190810/ourlarge/pngtree-youtube-paly-video-player-abstract-circle-background-flat-col-png-image_1655120.jpg`}
                className={tw`w-full aspect-square rounded-t-md`}
                alt={video}
              />
              <div className={tw`flex justify-between p-4 gap-2`}>
                <h6 className={tw`text-lg font-medium text-blue-400 flex-grow`}>
                  {video}
                </h6>
                <div>
                  <a
                    href={`/${video}`}
                    className={tw`px-2 py-1 bg-purple-500 text-white rounded-md`}
                  >
                    Watch
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
