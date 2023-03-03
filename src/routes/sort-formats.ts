import type { videoFormat } from "ytdl-core"

export function sort(formats: videoFormat[]) {
  return formats
    .filter(
      (x, i, a) =>
        a.findIndex(
          (y) =>
            y.hasAudio == x.hasAudio &&
            y.hasVideo == x.hasVideo &&
            y.qualityLabel == x.qualityLabel &&
            y.audioQuality == x.audioQuality
        ) == i
    )
    .sort(
      (a, b) =>
        parseInt(b.qualityLabel || "0") - parseInt(a.qualityLabel || "0")
    )
    .sort((a, b) => {
      const aIndex = 2 * +a.hasVideo + +a.hasAudio
      const bIndex = 2 * +b.hasVideo + +b.hasAudio
      return aIndex - bIndex
    })
}
