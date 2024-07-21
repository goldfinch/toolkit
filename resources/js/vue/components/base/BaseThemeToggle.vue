<script setup lang="ts">
import { useColorMode } from "@rootnode/@vueuse/core";
import { useNinjaId } from "../../composables/input-id";
import { useNuiDefaultProperty } from "../../composables/default-property";
import { computed } from "@rootnode/vue";
import IconSun from "../icon/IconSun.vue";
import IconMoon from "../icon/IconMoon.vue";
const props = withDefaults(
  defineProps<{
    /**
     * The form input identifier.
     */
    id?: string;
    /**
     * Sets the toggle element to inverted colors mode.
     */
    inverted?: boolean;
    /**
     * Disables transitions when toggling between light and dark mode.
     *
     * @default false
     */
    disableTransitions?: boolean;
  }>(),
  {
    id: undefined,
    inverted: false,
    disableTransitions: undefined,
  }
);

const id = useNinjaId(() => props.id);
const disableTransitions = useNuiDefaultProperty(
  props,
  "BaseThemeToggle",
  "disableTransitions"
);

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    // disable transitions
    if (disableTransitions.value) {
      // import.meta.browser &&
      document.documentElement.classList.add("nui-no-transition");
    }

    colorMode.value = value ? "dark" : "light";
    // colorMode.preference = value ? "dark" : "light";

    // re-enable transitions
    if (disableTransitions.value) {
      // import.meta.browser &&
      setTimeout(() => {
        document.documentElement.classList.remove("nui-no-transition");
      }, 0);
    }
  },
});
</script>

<template>
  <label
    class="nui-theme-toggle"
    :class="props.inverted && 'nui-theme-toggle-inverted'"
    :for="id"
  >
    <input
      v-model="isDark"
      :id="id"
      type="checkbox"
      class="nui-theme-toggle-input"
    />
    <span class="nui-theme-toggle-inner">
      <IconSun class="nui-sun" />
      <IconMoon class="nui-moon" />
    </span>
  </label>
</template>

<style>
.nui-no-transition * {
  transition-property: none !important;
  transition-duration: 0 !important;
}
</style>
