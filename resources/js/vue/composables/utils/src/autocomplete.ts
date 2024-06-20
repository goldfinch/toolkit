import { usePlacesAutocomplete } from "@rootnode/vue-use-places-autocomplete";
import { useElementVisibility, useScriptTag } from "@rootnode/@vueuse/core";
import { ref, watch } from "vue";

// const acSet_jobAddress = ref(false)
// const acSet_jobAddress_setValue = ref(false)

// const acSet_jobAddress_fn = (address, inputName) => {
//   data.value[inputName] = address
//   acSet_jobAddress.value = true
//   acSet_jobAddress_setValue.value = address
// }

// watch(acSet_jobAddress_input, (n, o) => {
//   if (acSet_jobAddress_setValue.value != n) {
//     acSet_jobAddress.value = false
//   }
// })

const googleMapsAPILoaded = ref(false);
const suggestionsRef = ref(null);
// const _input = ref(null)
// const _options = ref(null)

async function googleMapsInit() {
  const apiKey = document.head.querySelector('meta[name="g-googleapis-key"]');

  if (apiKey) {
    console.log("s1");
    await useScriptTag(
      "https://maps.googleapis.com/maps/api/js?key=" +
        apiKey.content +
        "&libraries=places",
      // on script tag loaded.
      (el: HTMLScriptElement) => {
        // do something
        console.log("js loaded");
        googleMapsAPILoaded.value = true;
      }
    );
    console.log("s2");
  }

  return true;
}

const checkIfLoaded = async (current) => {
  if (!googleMapsAPILoaded.value && current) {
    await googleMapsInit();
  }

  return true;
};

const useAutocomplete = async (formData, inputName: string, options) => {
  const input = ref("");
  const inputRef = ref("");

  const isVisible = useElementVisibility(inputRef);

  await checkIfLoaded(isVisible);

  watch(isVisible, (current) => {
    checkIfLoaded(current);
  });

  console.log("last");

  if (!options) {
    const options = {
      debounce: 500,
      minLengthAutocomplete: 3,
    };
  }

  // _input.value = input
  // _options.value = options

  watch(googleMapsAPILoaded, (current) => {
    console.log("ggog1", current);

    if (current && !suggestionsRef.value) {
      // const { suggestions } = usePlacesAutocomplete(input, options);
      // console.log("ggog2", suggestions.value);
      // suggestionsRef.value = suggestions;
    }
    // checkIfLoaded(current);
  });

  const iname = inputName + "_input";
  const sname = inputName + "_suggestions";
  const rname = inputName + "_ref";
  const lname = inputName + "_scriptloaded";

  const r = {};
  r[iname] = input;
  r[rname] = inputRef;
  r[sname] = suggestionsRef;
  r[lname] = googleMapsAPILoaded;
  r["usePlacesAutocomplete"] = usePlacesAutocomplete;
  return r;
};

export { googleMapsAPILoaded, useAutocomplete };
