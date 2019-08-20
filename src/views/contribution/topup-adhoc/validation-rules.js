import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  groupId: [requiredValidator],
  billingDate: [requiredValidator],
  memberId: [requiredValidator],
  inputType: [requiredValidator],
  amount: [requiredValidator, numberValidator],
  billingType: [requiredValidator]
}
