import { useElementVisibility } from "@rootnode/@vueuse/core";
import MoveTo from "@rootnode/moveto";
import { nextTick, ref } from "@rootnode/vue";

import useFormHandler from "./useFormHandler";

// import { getValidationMessages } from '@formkit/validation'

const useFormBuilder = (props) => {
  const formSubmited = ref(false);
  const formMessage = ref(null);

  const supplies =
    props.supplies instanceof Object
      ? props.supplies
      : JSON.parse(props.supplies);

  const testMode = supplies.form.testmode;
  const fieldSegmentID = supplies.id;

  const form = ref(null);
  const formId = supplies.form.id;

  const { submitHandler } = useFormHandler({
    action: supplies.form.action,
    url: supplies.form.url,
    ref: form,
    id: formId,
    formSubmited,
    formMessage,
    supplies,
  });

  const moveTo = new MoveTo();

  const submitInvalidHandler = async (node) => {
    await nextTick();

    let message = document.querySelector("[data-message-type]");

    if (message) {
      if (message.parentElement) {
        message = message.parentElement;

        if (message.parentElement) {
          message = message.parentElement;
        }
      }

      await nextTick();

      setTimeout(() => moveTo.move(message, { tolerance: 100 }), 250);
    }

    // const validations = getValidationMessages(node)
    // messages.value = []
    // validations.forEach((inputMessages) => {
    //   messages.value = messages.value.concat(
    //     inputMessages.map((message) => message.value)
    //   )
    // })
  };

  // PageSpeed Insights
  const formVisible = useElementVisibility(form);

  return {
    formSubmited,
    formMessage,
    formVisible,
    testMode,
    fieldSegmentID,
    form,
    formId,
    submitHandler,
    submitInvalidHandler,
    supplies,
  };
};

export default useFormBuilder;
