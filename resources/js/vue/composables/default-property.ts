import type { AppConfig } from "nuxt/schema";
import { computed } from "@rootnode/vue";

import { useAppConfig } from "../app.config";

export function useNuiDefaultProperty<
  T extends Record<string, unknown>,
  C extends keyof AppConfig["nui"],
  K extends keyof T
>(properties: T, component: C, property: K): Ref<NonNullable<T[K]>> {
  const config = useAppConfig().nui;
  return computed(() => {
    return (properties?.[property] ??
      config?.[component]?.[property]) as NonNullable<T[K]>;
  });
}
