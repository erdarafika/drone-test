
import { requiredValidator, emailValidator, numberValidator } from '@/global-function/formValidator'

export default {
  name: [requiredValidator],
  email: [requiredValidator, emailValidator],
  departmentId: [requiredValidator],
  identityNumber: [requiredValidator, numberValidator]
}
