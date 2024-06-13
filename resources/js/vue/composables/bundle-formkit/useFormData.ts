export default function useFormData(object) {
  return Object.keys(object).reduce((formData, key) => {
    let fileItem = false;

    // prepare files (if file type exists in the current form)
    if (Array.isArray(object[key])) {
      Object.keys(object[key]).forEach((fkey) => {
        if (object[key][fkey].file) {
          // this is file, so lets prepare it differently
          formData.append(key, object[key][fkey].file);
          fileItem = true;
        }
      });
    }

    if (!fileItem) {
      formData.append(key, object[key]);
    }

    return formData;
  }, new FormData());
}
