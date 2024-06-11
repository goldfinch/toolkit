<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * output from useFormBuilder
     */
    builder?: object;
    handleSubmit?: fn;
    isSubmitting?: boolean;
  }>(),
  {
    builder: undefined,
    handleSubmit: undefined,
    isSubmitting: undefined,
  }
);

// const emit = defineEmits<{
//   action: [];
// }>();

const onSubmit = props.handleSubmit(async (values) => {
  props.builder.submitHandler(values);
});
</script>

<template>
  <form
    :ref="builder.form"
    :id="builder.formId"
    method="POST"
    action=""
    novalidate
    @submit.prevent="onSubmit"
  >
    <!-- <input
      id="field-segment-id"
      type="hidden"
      name="segment_id"
      :value="builder.fieldSegmentID"
    /> -->
    <slot />
  </form>
</template>
