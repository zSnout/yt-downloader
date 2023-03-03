import { PrismaClient } from "@prisma/client"
import ytdl from "ytdl-core"
import { sort } from "../sort-formats"
import type { PageServerLoad } from "./$types"

const prisma = new PrismaClient()
prisma.$connect()

async function getFromURL(url: string) {
  let info: ytdl.videoInfo

  const cached = await prisma.videoInfo.findFirst({ where: { url } })
  const now = new Date()

  if (
    cached &&
    now.getTime() - cached.creation.getTime() < 1000 * 60 * 60 * 2
  ) {
    info = cached.info as unknown as ytdl.videoInfo
  } else {
    const i = await ytdl.getInfo(url)

    await prisma.videoInfo.deleteMany({
      where: {
        creation: {
          lt: new Date(now.getTime() - 1000 * 60 * 60 * 2),
        },
      },
    })

    await prisma.videoInfo.create({
      data: { creation: now, info: i as any, url },
    })

    info = i
  }

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
