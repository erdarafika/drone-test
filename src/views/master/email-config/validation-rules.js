import { requiredValidator, alphabeticValidator } from '@/global-function/formValidator'

export default {
  subject: [requiredValidator, alphabeticValidator],
  htmlBody: [requiredValidator],
  type: [requiredValidator]
}
