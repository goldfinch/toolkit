import { useElementVisibility } from "@rootnode/@vueuse/core";
import axios from "@rootnode/axios";
import MoveTo from "@rootnode/moveto";
import { load } from "@rootnode/recaptcha-v3";
import { nextTick, ref, watch } from "@rootnode/vue";

import useFormData from "./useFormData";

export default function useFormHandler(cfg) {
  const isVisible = useElementVisibility(cfg.ref);

  const recaptchaLoaded = ref(false);
  const recaptcha = ref(null);

  async function submitHandler(data) {
    // if recaptcha hasn't been loaded yet
    if (recaptcha.value) {
      showBadge();

      const token = await recaptcha.value.execute(cfg.action);

      data.token = token;
      data.segment_id = cfg.supplies.id;

      const csrfToken = document.head.querySelector('meta[name="csrf-token"]');

      const moveTo = new MoveTo();

      return await axios({
        method: "post",
        url: cfg.url,
        headers: { "X-CSRF-TOKEN": csrfToken.content },
        data: useFormData(data),
      })
        .then(async (response) => {
          if (response.status == 200 && response.data.status == true) {
            hideBadge();

            // reset(cfg.id)

            cfg.formSubmited.value = true;

            if (cfg.supplies.thankyou_page) {
              window.location = `/thank-you/${cfg.supplies.form.action}`;
            } else {
              cfg.formMessage.value = response.data.message;
            }

            await nextTick();

            setTimeout(() => {
              let messageEl = document.querySelector("[data-form-message]");

              if (messageEl) {
                if (messageEl.closest("section")) {
                  moveTo.move(messageEl.closest("section"));
                } else {
                  moveTo.move(messageEl, { tolerance: 100 });
                }
              }
            }, 250);
          } else {
            //
          }
        })
        .catch(async (error) => {
          if (error.response) {
            if (error.response.data instanceof Object) {
              for (const [key, value] of Object.entries(error.response.data)) {
                node.setErrors(
                  // ['There was an error in this form'],
                  {
                    [key]: value,
                  }
                );

                await nextTick();

                let moveTarget = document.querySelector(
                  '[data-message-type="error"]'
                );

                if (moveTarget) {
                  if (moveTarget.parentElement) {
                    moveTarget = moveTarget.parentElement;

                    if (moveTarget.parentElement) {
                      moveTarget = moveTarget.parentElement;
                    }
                  }

                  setTimeout(() => moveTo.move(moveTarget), 250);
                }
              }
            } else {
              node.setErrors([error.response.data]);

              // todo moveTo
            }
          }
        });
    } else {
      alert(
        "Sorry, this request hasn't been sent. It could be due to a weak internet connection. Please, refresh the page a try again."
      );
    }
  }

  async function recaptchaInit() {
    const siteKey = document.head.querySelector('meta[name="g-site-key"]');

    if (siteKey) {
      recaptcha.value = await load(siteKey.content);
    }
  }

  watch(isVisible, (current, prev) => {
    if (!recaptchaLoaded.value && current) {
      recaptchaLoaded.value = true;
      recaptchaInit();
    }
  });

  const showBadge = () => {
    const badge = document.getElementsByClassName("grecaptcha-badge");
    if (badge.length) {
      badge[0].classList.add("grecaptcha-badge--show");
    }
  };

  const hideBadge = () => {
    const badge = document.getElementsByClassName("grecaptcha-badge");
    if (badge.length) {
      badge[0].classList.remove("grecaptcha-badge--show");
    }
  };

  return { submitHandler };
}
