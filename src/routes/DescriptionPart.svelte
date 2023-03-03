<script lang="ts">
  export let part: string

  $: parts = part.match(/https?:\/\/\S+|@\w+|((?!https?:\/\/\S|@\w).)+/g) || []
</script>

<!-- prettier-ignore -->
{#each parts as part}
  {#if part.startsWith("http://") || part.startsWith("https://")}
    <a class="text-[#3ea6ff]" href={part}>{part}</a>
  {:else if (/@\w+/).test(part)}
    <a class="text-[#3ea6ff]" href="https://youtube.com/channel/{part}"
      >{part}</a
    >
  {:else}
    {part}
  {/if}
{/each}
