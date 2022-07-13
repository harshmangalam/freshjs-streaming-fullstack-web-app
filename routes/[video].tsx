/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { tw } from "../utils/twind.ts";

export const handler:Handlers = {
    async GET(req,ctx){
        console.log(ctx.params.video)
        return new Response("5",{
            status:200,
            
        })
    }
}

export default function Watch({ data }: PageProps) {
  return <div className={tw`h-screen grid place-items-center`}>{data}</div>;
}
