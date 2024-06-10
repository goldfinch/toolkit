import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm as veeUseForm } from 'vee-validate'
import { z } from 'zod'

const useForm = (
  supplies?: object,
) => {

  type FormInput = z.infer<typeof supplies.form.validator>

  const validationSchema = toTypedSchema(supplies.form.validator)

  const initialValues = supplies.form.data satisfies FormInput

  const {
    handleSubmit,
    isSubmitting,
    setFieldError,
    meta,
    values,
    errors,
    resetForm,
    setFieldValue,
    setErrors,
  } = veeUseForm({
    validationSchema,
    initialValues,
  })

  return {
    Field,
    handleSubmit,
    isSubmitting,
  }
}

export { z, useForm }
