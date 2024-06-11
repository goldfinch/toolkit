// import { createFetch } from '@vueuse/core'

const useFetch = createFetch({
  options: {
    beforeFetch({ options }) {
      if (!options.headers) {
        options.headers = {};
      }

      // (options.headers as any)['Content-Type'] = 'application/json';
      (options.headers as any)["X-CSRF-Token"] = (
        document.querySelector('meta[name="csrf-token"]') as Element
      ).getAttribute("content") as string;

      return { options };
    },
  },
  fetchOptions: {
    mode: "cors",
  },
});

useFetch(props.supplies.form.url).post(values).json();
