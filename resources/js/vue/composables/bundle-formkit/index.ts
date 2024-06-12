import { defaultConfig, plugin } from "@formkit/vue";
import { createApp } from "vue";

import FormBuilder from "../../components/bundle/FormBuilder.vue";

export default function formformBuilder(components, customConfig) {
  const forms = document.querySelectorAll("[app-form]");

  if (forms && forms.length) {
    forms.forEach((form) => {
      const app = createApp(FormBuilder, { ...form.dataset });
      app.use(plugin, defaultConfig(customConfig));

      for (const [key, value] of Object.entries(components)) {
        app.component(key, value);
      }

      app.mount(form);
    });
  }
}
