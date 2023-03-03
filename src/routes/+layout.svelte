<script>
  import "../app.postcss"
</script>

<div class="flex h-full w-full flex-col">
  <div
    class="sticky top-0 flex items-center justify-center bg-[rgb(15,15,15)] font-yt text-xl font-semibold exact-h-14"
  >
    <p>
      <a
        class="underline decoration-transparent underline-offset-4 transition hover:decoration-current"
        href="/">YouTube Downloader</a
      >

      <span class="font-base text-sm font-normal text-neutral-400"
        >by <a
          class="text-blue-500 underline decoration-transparent underline-offset-2 transition hover:decoration-current"
          href="https://zsnout.com/">zSnout</a
        ></span
      >
    </p>
  </div>

  <slot />
</div>
