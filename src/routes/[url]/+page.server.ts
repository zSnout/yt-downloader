import ytdl from "ytdl-core"
import { sort } from "../sort-formats"
import type { PageServerLoad } from "./$types"

async function getFromURL(url: string) {
  const info = await ytdl.getInfo(url)

  return {
    allFormats: info.formats,
    author: info.videoDetails.author,
    description: info.videoDetails.description,
    dislikes: info.videoDetails.dislikes,
    formats: {
      dual:
        sort(info.formats.filter((x) => x.hasVideo && x.hasAudio))[0] ?? null,
      video:
        sort(info.formats.filter((x) => x.hasVideo && !x.hasAudio))[0] ?? null,
      audio:
        sort(info.formats.filter((x) => !x.hasVideo && x.hasAudio))[0] ?? null,
    },
    likes: info.videoDetails.likes,
    title: info.videoDetails.title,
    uploadDate: info.videoDetails.uploadDate,
    url: info.videoDetails.video_url,
    views: info.videoDetails.viewCount,
  }
}

export const load = (async ({ params: { url } }) => {
  return {
    data: [
      getFromURL(url)
        .then((x) => ({ ok: true as const, info: x }))
        .catch((x) => ({
          ok: false as const,
          reason: x instanceof Error ? x.message : String(x),
        })),
    ],
    url,
  } as const
}) satisfies PageServerLoad
