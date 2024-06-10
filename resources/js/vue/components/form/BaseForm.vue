<script setup lang="ts">

// const props = withDefaults(
//   defineProps<{
//     /**
//      * on submit
//      */
//     action?: fn
//   }>(),
//   {
//     action: undefined,
//   },
// )

const emit = defineEmits<{
  action: []
}>()

</script>

<template>
  <form method="POST" action="" novalidate @submit.prevent="emit('action')">
    <slot/>
  </form>
</template>
