export const VIDEOS_DIR = `static/videos`;

const numBlocksPerRequest = 30;
const blockSize = 16_384;
export const videoBlockSize = blockSize * numBlocksPerRequest;

export async function checkFileStatus() {
  try {
    await Deno.stat(VIDEOS_DIR);
  } catch (error) {
    console.log(error.message);
    Deno.mkdir(VIDEOS_DIR);
  }
}

export async function getVideoSize(videoName: string) {
  return (await Deno.stat(`${VIDEOS_DIR}/${videoName}`)).size;
}
export function getStream(video: Deno.FsFile) {
  let readBlocks = numBlocksPerRequest;
  return new ReadableStream({
    async pull(controller) {
      const chunk = new Uint8Array(blockSize);
      try {
        const read = await video.read(chunk);

        if (read) {
          controller.enqueue(chunk.subarray(0, read));
        }
        console.log(read)
        readBlocks--;
        if (readBlocks === 0) {
          video.close();
          controller.close();
        }
      } catch (e) {
        console.log(e)
        controller.error(e);
        video.close();
      }
    },
  });
}
