<script lang="ts">
  import type { videoFormat } from "ytdl-core"

  export let format: Pick<
    videoFormat,
    "audioQuality" | "hasVideo" | "qualityLabel" | "url"
  > | null
</script>

{#if format}
  <a class="flex" download href={format.url}>
    <div
      class="mr-2 flex aspect-video h-[5.875rem] w-[10.5rem] items-center justify-center rounded-lg bg-[rgb(255,255,255,0.1)]"
    >
      <p class="font-yt text-[2rem] font-bold">
        {format.hasVideo ? format.qualityLabel : "Audio only"}
      </p>
    </div>

    <div>
      <p class="mb-1 line-clamp-2 font-base text-sm font-medium">
        {format.hasVideo ? format.qualityLabel : "No video"}
      </p>

      <p class="text-yt-x-small text-[rgb(170,170,170)]">
        {format.audioQuality == "AUDIO_QUALITY_MEDIUM"
          ? "High audio quality"
          : format.audioQuality == "AUDIO_QUALITY_LOW"
          ? "Low audio quality"
          : "No audio"}
      </p>
    </div>
  </a>
{/if}
