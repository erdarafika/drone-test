import { requiredValidator, alphabeticValidator, numberValidator } from '@/global-function/formValidator'

export default {
  name: [requiredValidator, alphabeticValidator],
  code: [requiredValidator, numberValidator]
}
