import { alphabeticValidator, requiredValidator } from '@/global-function/formValidator'

export default {
  date: [requiredValidator],
  description: [requiredValidator, alphabeticValidator]
}
