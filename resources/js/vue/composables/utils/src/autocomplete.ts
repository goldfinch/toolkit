import { usePlacesAutocomplete } from "@rootnode/vue-use-places-autocomplete";
import { useScriptTag } from "@rootnode/@vueuse/core";
import { ref } from "vue";

const isGoogleMapsLoaded = ref(false);

const googleMapsInit = async () => {
  const apiKey = document.head.querySelector('meta[name="g-cloud-key"]');

  if (apiKey) {
    await useScriptTag(
      "https://maps.googleapis.com/maps/api/js?key=" +
        apiKey.content +
        "&libraries=places",
      (el: HTMLScriptElement) => {
        isGoogleMapsLoaded.value = true;
      }
    );
  }

  return true;
};

const useAutocomplete = (emit, inputName: string, options) => {
  const input = ref("");
  const sugessionsPopup = ref(false);

  const setAddress = (v) => {
    emit("updateValue", v);
    sugessionsPopup.value = false;
  };

  if (!options) {
    options = {
      debounce: 500,
      minLengthAutocomplete: 3,
      apiOptions: {
        language: "en",
      },
      autocompletionRequest: {
        componentRestrictions: { country: "nz" },
      },
    };
  }

  const { suggestions } = usePlacesAutocomplete(input, options);

  const iname = inputName + "_input";
  const sname = inputName + "_suggestions";
  const vname = inputName + "_visibility";
  const setname = inputName + "_set";

  const r = {};
  r[iname] = input;
  r[sname] = suggestions;
  r[vname] = sugessionsPopup;
  r[setname] = setAddress;
  return r;
};

export { isGoogleMapsLoaded, useAutocomplete, googleMapsInit };
