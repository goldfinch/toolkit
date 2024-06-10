<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    /**
     * button class
     */
    class?: string
  }>(),
  {
    class: undefined,
  },
)

</script>

<template>
  <button type="submit" :class="props.class">
    <slot/>
  </button>
</template>
