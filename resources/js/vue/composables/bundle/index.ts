import { createApp } from "@rootnode/vue";

import FormBuilder from "../../components/bundle/FormBuilder.vue";

export default function formformBuilder(components) {
  const forms = document.querySelectorAll("[app-form]");

  if (forms && forms.length) {
    forms.forEach((form) => {
      const app = createApp(FormBuilder, { ...form.dataset });

      for (const [key, value] of Object.entries(components)) {
        app.component(key, value);
      }

      app.mount(form);
    });
  }
}
