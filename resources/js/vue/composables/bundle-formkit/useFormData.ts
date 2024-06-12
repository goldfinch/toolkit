export default function useFormData(object) {
  return Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key])
    return formData
  }, new FormData())
}
