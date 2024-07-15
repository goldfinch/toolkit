import type { MaybeRefOrGetter } from '@rootnode/vue'
// eslint-disable-next-line vue/prefer-import-from-vue
import { escapeHtml } from '@rootnode/@vue/shared'
import { computed, toRef, unref } from "@rootnode/vue";

export function useNinjaMark(
  _text?: MaybeRefOrGetter<string | undefined>,
  _search?: MaybeRefOrGetter<string | undefined>,
  _classes?: MaybeRefOrGetter<string | undefined>,
) {
  const text = toRef(_text)
  const classes = toRef(_classes)
  const search = toRef(_search)

  return computed(() => {
    const txt = unref(text)
    const srch = unref(search)
    if (!txt) {
      return ''
    }

    if (!srch) {
      return escapeHtml(txt)
    }

    const regex = new RegExp(srch, 'gi')

    return txt.replace(regex, (part) => {
      return `<mark class="${classes.value}">${escapeHtml(part)}</mark>`
    })
  })
}
