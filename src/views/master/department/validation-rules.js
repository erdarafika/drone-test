import { alphanumericValidator, alphabeticValidator, requiredValidator } from '@/global-function/formValidator'

export default {
  code: [requiredValidator, alphanumericValidator],
  name: [requiredValidator, alphabeticValidator],
  description: [requiredValidator, alphabeticValidator]
}
