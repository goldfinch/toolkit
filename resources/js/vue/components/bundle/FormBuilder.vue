<script setup>
const props = defineProps(["supplies"]);
const supplies = JSON.parse(props.supplies);
</script>
<template>
  <component :is="supplies.form.component" :supplies="supplies" />
</template>
