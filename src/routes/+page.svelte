<script lang="ts">
  let url = ""
</script>

<div class="m-auto w-96 max-w-full p-8">
  <form
    class="w-full"
    on:submit={(event) => {
      event.preventDefault()

      if (!url) {
        return
      }

      location.href = "/" + encodeURIComponent(url)
    }}
  >
    <input
      class="block w-full rounded-lg border border-neutral-600 bg-black px-3 py-2 text-white shadow-md outline-none ring-blue-800 transition focus:border-blue-500 focus:ring"
      name="url"
      placeholder="Paste your video's URL..."
      type="text"
      bind:value={url}
    />

    <button
      class="mt-3 block w-full rounded-lg border border-neutral-600 bg-black px-3 py-2 text-white shadow-md outline-none ring-blue-800 transition hover:border-neutral-600 hover:bg-neutral-800 focus:border-blue-500 focus:ring"
      type="submit">Download Video</button
    >
  </form>
</div>
