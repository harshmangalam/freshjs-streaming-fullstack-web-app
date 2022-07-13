export const VIDEOS_DIR = `static/videos`;

export async function checkFileStatus() {
  try {
    await Deno.stat(VIDEOS_DIR);
  } catch (error) {
    console.log(error.message);
    Deno.mkdir(VIDEOS_DIR);
  }
}
