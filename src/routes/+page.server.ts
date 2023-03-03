import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (({ request: { url } }) => {
  const videoUrl = new URL(url).searchParams.get("url")

  if (videoUrl) {
    throw redirect(303, "/" + encodeURIComponent(videoUrl))
  }
}) satisfies PageServerLoad
