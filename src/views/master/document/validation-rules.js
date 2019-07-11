import { alphabeticValidator, alphanumericValidator, requiredValidator } from '@/global-function/formValidator'

export default {
  name: [requiredValidator, alphabeticValidator],
  code: [requiredValidator, alphanumericValidator]
}
