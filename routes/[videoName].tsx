/** @jsx h */
import { PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { tw } from "../utils/twind.ts";

export default function Watch({ params }: PageProps) {
  return (
    <div className={tw`h-screen grid place-items-center`}>
      <div className={tw`container px-2 py-8 grid grid-cols-2 gap-6`}>
        <div>
          <video
            width="100%"
            controls
            autoPlay
            className={tw`rounded-xl shadow-md aspect-square`}
          >
            <source src={`/api/stream/?videoName=${params.videoName}`} type="video/mp4" />
          </video>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
          repellat eum iusto placeat omnis temporibus. Eveniet quis non magni.
          Voluptates, ad delectus? A beatae accusamus molestias vitae.
          Reprehenderit, laboriosam atque.
        </div>
      </div>
    </div>
  );
}
