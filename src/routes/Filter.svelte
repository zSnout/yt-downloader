<script lang="ts">
  export let active: boolean
  export let label: string
</script>

<button
  class="rounded-lg px-3 py-1.5 font-base text-sm outline-none transition letter-spacing-0.2 {active
    ? 'bg-[rgb(241,241,241)] text-[rgb(15,15,15)]'
    : 'bg-[rgb(255,255,255,0.1)] text-[rgb(241,241,241)] focus:bg-[rgb(255,255,255,0.2)] active:bg-[rgb(255,255,255,0.2)]'}"
  on:click>{label}</button
>
