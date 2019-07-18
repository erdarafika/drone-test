import { requiredValidator, alphanumericLineValidator, alphabeticValidator } from '@/global-function/formValidator'

export default {
  name: [requiredValidator, alphabeticValidator],
  code: [requiredValidator, alphanumericLineValidator],
  description: [requiredValidator, alphabeticValidator]
}
