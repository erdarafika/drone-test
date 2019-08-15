import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  companyId: [requiredValidator],
  groupId: [requiredValidator],
  amount: [requiredValidator, numberValidator]
}
