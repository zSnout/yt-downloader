<script lang="ts">
  import Error from "../+error.svelte"
  import DescriptionPart from "../DescriptionPart.svelte"
  import Downloadable from "../Downloadable.svelte"
  import Filter from "../Filter.svelte"
  import { toRelativeTime } from "../relative-time"
  import { sort } from "../sort-formats"
  import type { PageData } from "./$types"

  export let data: PageData

  let type: "overview" | "dual" | "video" | "audio" = "overview"
  let video: HTMLVideoElement | undefined
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.ctrlKey || event.altKey || event.metaKey || !video) {
      return
    }

    let prevent = true

    if (event.key == "ArrowRight") {
      video.currentTime += 5
    } else if (event.key == "ArrowLeft") {
      video.currentTime -= 5
    } else if (event.key == "ArrowUp") {
      video.volume += 0.05
    } else if (event.key == "ArrowDown") {
      video.volume -= 0.5
    } else if (event.key == ",") {
      video.currentTime -= 1 / 60
    } else if (event.key == ".") {
      video.currentTime += 1 / 60
    } else if (event.key == "<") {
      video.playbackRate -= 0.25
    } else if (event.key == ">") {
      video.playbackRate += 0.25
    } else if (event.key == " ") {
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    } else if (
      "0 1 2 3 4 5 6 7 8 9".includes(event.key) &&
      !event.key.includes(" ")
    ) {
      video.currentTime = video.duration * (+event.key / 10)
    } else {
      prevent = false
    }

    if (prevent) {
      event.preventDefault()
    }
  }}
/>

{#await data.data[0]}
  <div
    class="mx-6 flex flex-1 items-center justify-center [word-break:break-all]"
  >
    Loading {data.url}...
  </div>
{:then form}
  {#if form.ok}
    {@const data = form.info}

    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      bind:this={video}
      class="mb-3 aspect-video max-h-[calc(100vh_-_10.5625rem)] w-full flex-1 bg-black outline-none"
      controls
      playsinline
      src={data.formats.dual?.url}
    />

    <div class="ml-6 mr-[1.625rem] flex flex-col gap-6 pb-4 md:flex-row">
      <div class="flex-1">
        <p class="font-yt text-yt-header font-semibold exact-h-7">
          {data?.title}
        </p>

        <div class="mt-2 flex flex-row flex-wrap items-center">
          <div class="mr-auto flex flex-row">
            <a href={data.author.channel_url} class="pr-3">
              <img
                class="h-10 rounded-full"
                src={data.author.thumbnails?.[0]?.url}
                alt="Channel avatar"
              />
            </a>

            <div class="relative flex flex-col">
              <a class="font-base font-medium" href={data.author.channel_url}>
                {data.author.name}
              </a>

              <p class="font-base text-yt-small text-[rgb(170,170,170)]">
                {data.author.subscriber_count?.toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                  notation: "compact",
                }) || "0"} subscriber{data.author.subscriber_count == 1
                  ? ""
                  : "s"}
              </p>
            </div>
          </div>

          <div>
            <a
              class="flex h-9 items-center rounded-full bg-[rgb(255,255,255,0.1)]  px-4 font-base text-sm font-medium"
              href={data.url}>Open in YouTube</a
            >
          </div>
        </div>

        <div
          class="mt-[14px] flex flex-col rounded-xl bg-[rgb(255,255,255,0.1)] p-3 font-base"
        >
          <div class="flex gap-[7px] text-sm font-medium">
            <p>
              {(+data.views).toLocaleString(undefined, {
                notation: "compact",
              })} view{data.views === "1" ? "" : "s"}
            </p>

            <p>
              {toRelativeTime(new Date(data.uploadDate))}
            </p>
          </div>

          <p class="text-sm">
            {#if data.description}
              {#each data.description.split("\n") as part, index}
                {#if index != 0}<br />{/if}
                <DescriptionPart {part} />
              {/each}
            {:else}
              No description provided.
            {/if}
          </p>
        </div>
      </div>

      <div class="flex w-full flex-col gap-3 md:w-[25rem]">
        <div class="mt-5 mb-1 flex gap-2">
          <Filter
            active={type == "overview"}
            label="Overview"
            on:click={() => (type = "overview")}
          />

          <Filter
            active={type == "dual"}
            label="All Formats"
            on:click={() => (type = "dual")}
          />

          <Filter
            active={type == "video"}
            label="Video Only"
            on:click={() => (type = "video")}
          />

          <Filter
            active={type == "audio"}
            label="Audio Only"
            on:click={() => (type = "audio")}
          />
        </div>

        {#if type == "overview"}
          <Downloadable format={data.formats.dual} />
          <Downloadable format={data.formats.video} />
          <Downloadable format={data.formats.audio} />
        {:else}
          {@const hasVideo = type != "audio"}
          {@const hasAudio = type != "video"}

          {#each sort(data.allFormats.filter((x) => {
              return x.hasVideo == hasVideo && x.hasAudio == hasAudio
            })) as format}
            <Downloadable {format} />
          {:else}
            <Downloadable
              format={{
                audioQuality: undefined,
                hasVideo: true,
                // @ts-ignore
                qualityLabel: "No items",
                url: "javascript:void(0)",
              }}
            />
          {/each}
        {/if}
      </div>
    </div>
  {:else}
    <Error message={form.reason} status={503} />
  {/if}
{:catch reason}
  <Error
    message={typeof reason == "object" &&
    "message" in reason &&
    typeof reason.message == "string"
      ? reason.message
      : String(reason)}
    status={503}
  />
{/await}
