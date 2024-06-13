<script setup lang="ts">
import BaseForm from '@toolkit/vue/components/bundle/BaseForm.vue'
import BaseAction from '@toolkit/vue/components/form/BaseAction.vue'
import BaseCheckbox from '@toolkit/vue/components/form/BaseCheckbox.vue'
import BaseInput from '@toolkit/vue/components/form/BaseInput.vue'
import { useFormBuilder } from '@toolkit/vue/composables/bundle/useFormBuilder'
import { useForm, z } from '@toolkit/vue/composables/form'

// import BaseCheckbox from './Components/Form/BaseCheckbox.vue'
import BaseRadio from './Components/Form/BaseRadio.vue'
import ImageUpload from './Components/Media/ImageUpload.vue'

const props = withDefaults(
  defineProps<{
    /**
     * supplied data for the form
     */
    supplies?: object
  }>(),
  {
    supplies: undefined,
  },
)

const builder = useFormBuilder(props)

const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'A valid email is required',
}

const { Field, handleSubmit, isSubmitting } = useForm({
  form: {
    data: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
    },
    validator: z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
      phone: z.string(),
    }),
  },
})
</script>

<template>
  <BaseForm :handle-submit="handleSubmit" :is-submitting="isSubmitting" :builder="builder">
    <div class="lg:max-w-[1120px] lg:px-[77px]">
      <div>
        <h2 class="font-serifa text-[40px] font-medium tracking-[1px]">Get in touch with us</h2>
      </div>
      <h3 class="form-heading">1) Your details:</h3>
      <div class="mb-[10px] mb-[37.2px] grid gap-x-[57px] md:mb-[62px] md:grid-cols-2">
        <div class="form-field">
          <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="first_name">
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="text"
              label="First name *"
              placeholder="First name"
              :classes="{
                input: 'form-control',
                label: 'form-label',
              }"
              @blur="handleBlur"
              @update:model-value="handleChange"
            />
          </Field>
        </div>
        <div class="form-field">
          <!-- <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="email">
            <label class="form-label" for="field-email">Email Address*</label>
            <div>
              <input
                class="form-control"
                id="field-email"
                :model-value="field.value"
                :error="errorMessage"
                :disabled="isSubmitting"
                type="email"
                @update:model-value="handleChange"
                @blur="handleBlur"
              />
            </div>
            <Transition>
              <div class="mt-3 text-[16px] text-brand-red-400" v-if="errorMessage">
                {{ errorMessage }}
              </div>
            </Transition>
          </Field> -->
        </div>
        <div class="form-field">
          <!-- <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="last_name">
            <label class="form-label" for="field-last-name">Last Name*</label>
            <div>
              <input
                id="field-last-name"
                class="form-control"
                type="text"
                :model-value="field.value"
                :disabled="isSubmitting"
                @update:model-value="handleChange"
                @blur="handleBlur"
              >
            </div>
            <Transition>
              <div v-if="errorMessage" class="mt-3 text-[16px] text-brand-red-400">
                {{ errorMessage }}
              </div>
            </Transition>
          </Field> -->
        </div>
        <div class="form-field">
          <!-- <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="phone">
            <label class="form-label" for="field-phone">Phone Number*</label>
            <div>
              <input
                class="form-control"
                id="field-phone"
                type="text"
                :model-value="field.value"
                :disabled="isSubmitting"
                @update:model-value="handleChange"
                @blur="handleBlur"
              />
            </div>
          </Field> -->
        </div>
        <div class="form-field">
          <!-- <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="company">
            <label class="form-label" for="field-company">Company Name (if applicable)</label>
            <div>
              <input
                id="field-company"
                class="form-control"
                type="text"
                :model-value="field.value"
                :disabled="isSubmitting"
                @update:model-value="handleChange"
                @blur="handleBlur"
              >
            </div>
            <Transition>
              <div v-if="errorMessage" class="mt-3 text-[16px] text-brand-red-400">
                {{ errorMessage }}
              </div>
            </Transition>
          </Field> -->
        </div>
        <div class="form-field">
          <!-- <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="job_address">
            <label class="form-label" for="field-job">Job Address*</label>
            <div>
              <input
                id="field-job"
                class="form-control"
                type="text"
                :model-value="field.value"
                :disabled="isSubmitting"

                @update:model-value="handleChange"
                @blur="handleBlur"
              >
            </div>
          </Field> -->
        </div>
      </div>

      <h3 class="form-heading">2) Services you require:</h3>

      <!-- <div class="mb-[10px] mb-[16px] grid lg:grid-cols-2 lg:gap-x-[57px] lg:pl-[86px]"> -->
      <div class="relative m-[30px_0] gap-x-[15px] md:flex lg:m-[30px_-44px]">
        <div class="max-md:[&_label]:absolute max-md:[&_label]:top-[22px] max-md:[&_label]:px-0">
          <!-- <BaseCheckbox /> -->
          <Field v-slot="{ field, handleChange, handleBlur }" name="service">
            <BaseCheckbox
              :model-value="field.value"
              :disabled="isSubmitting"
              rounded="sm"
              label="a) Trimming/Topping"
              color="primary"
              :classes="{
                label: 'form-subheading',
              }"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
        </div>
        <div>
          <h4 class="form-subheading">a) Trimming/Topping</h4>
          <div>
            <label class="ml-[-11px] mt-[14px] flex items-center tracking-[1px]" for="field-checkbox">
              <!-- <BaseCheckbox /> -->
              <span class="ml-[5px] text-[18px] font-bold">Near powerlines?</span>
            </label>
          </div>
          <div>
            <label class="ml-[-11px] mt-[14px] flex items-center tracking-[1px]" for="field-checkbox">
              <!-- <BaseCheckbox /> -->
              <span class="ml-[5px] text-[18px] font-bold">Trimming roadside?</span>
            </label>
          </div>

          <div class="m-[6px_65px_28px] block">
            <span class="text-[18px] leading-[1.38]">
              Can the work be completed without our machine sitting on the road (5 metres wide required)?
            </span>
            <div class="flex gap-x-[35px]">
              <label class="ml-[-11px] mt-[14px] flex items-center tracking-[1px]" for="field-radio">
                <BaseRadio />
                <span class="ml-[5px] text-[18px] font-bold">Yes</span>
              </label>
              <label class="ml-[-11px] mt-[14px] flex items-center tracking-[1px]" for="field-radio">
                <BaseRadio />
                <span class="ml-[5px] text-[18px] font-bold">No</span>
              </label>
            </div>
          </div>

          <button class="ml-[12px] flex items-end text-[18px] font-bold tracking-[1px] [&>svg]:ml-[22px]">
            Upload job images <ImageUpload />
          </button>

          <div class="mt-[25px]">
            <label class="m-[25px_11px] mb-[10px] block text-[18px] font-bold tracking-[1px]" for="field-job"
              >Job Comments</label
            >
            <textarea class="form-control lg-w-[90%] min-h-[179px]" id="field-job" />
          </div>
        </div>
        <div>
          <div class="relative m-[30px_0] gap-x-[15px] md:flex lg:m-[30px_-44px]">
            <div class="max-md:[&_label]:absolute max-md:[&_label]:top-[22px] max-md:[&_label]:px-0">
              <!-- <BaseCheckbox /> -->
            </div>
            <div>
              <h4 class="form-subheading mt-[4px] max-md:ml-[60px]">b) Stump Grinding</h4>

              <div class="form-field">
                <label class="m-[35px_0] mb-[10px] block text-[18px] font-bold tracking-[1px]" for="field-number"
                  >Number of stumps</label
                >
                <input class="form-control lg:w-[65%]" id="field-number" type="text" />
              </div>

              <div>
                <label class="mt-[24px] block text-[18px] font-bold tracking-[1px]" for="field-size"
                  >Size range of stumps (in cm)</label
                >
                <div class="mt-[11px] [&>p]:tracking-[1px]">
                  <p>Measure the diameter of <strong>widest</strong> point where the root flare touches the ground.</p>
                  <input class="form-control mb-[26px] mt-[15px] lg:w-[65%]" id="field-size" type="text" />
                </div>
              </div>

              <button class="ml-[3px] flex items-end text-[18px] font-bold tracking-[1px] [&>svg]:ml-[22px]">
                Upload job images <ImageUpload />
              </button>

              <div class="ml-[3px] mt-[25px]">
                <label
                  class="m-[25px_11px_9px_-2px] block text-[18px] font-bold tracking-[1px]"
                  for="field-job-comments"
                  >Job Comments</label
                >
                <textarea class="form-control min-h-[179px] lg:w-[89%]" id="field-job-comments" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <BaseAction class="btn-red"> Submit </BaseAction>
        <!-- <BaseButton
                :disabled="isSubmitting"
                :loading="isSubmitting"
                type="submit"
                color="primary"
                class="!h-11 w-full"
              >
                Sign in
              </BaseButton> -->
      </div>
    </div>
  </BaseForm>
</template>
