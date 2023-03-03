<script lang="ts">
  import { page } from "$app/stores"

  export let status = $page.status
  export let message = $page.error?.message
</script>

<div class="flex flex-1 items-center justify-center">
  <div class="flex max-w-full flex-col items-center">
    <div class="flex items-center">
      <p
        class="mr-8 border-r border-neutral-600 py-4 pr-8 text-5xl font-extralight"
      >
        {status}
      </p>

      <span class="sr-only">|</span>

      <p class="max-w-sm whitespace-pre-wrap py-4">{message}</p>
    </div>

    <div class="prefer-w-96 mt-6 flex flex-wrap gap-6">
      <a
        class="block min-w-[10rem] flex-1 whitespace-pre rounded-lg border border-neutral-600 bg-black px-3 py-2 text-center text-white shadow-md outline-none ring-blue-800 transition hover:border-neutral-600 hover:bg-neutral-800 focus:border-blue-500 focus:ring"
        href={$page.url.pathname}>Try Again</a
      >

      <a
        class="block min-w-[10rem] flex-1 whitespace-pre rounded-lg border border-neutral-600 bg-black px-3 py-2 text-center text-white shadow-md outline-none ring-blue-800 transition hover:border-neutral-600 hover:bg-neutral-800 focus:border-blue-500 focus:ring"
        href="/">Go Home</a
      >
    </div>
  </div>
</div>
