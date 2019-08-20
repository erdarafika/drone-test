import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  groupId: [requiredValidator],
  memberId: [requiredValidator],
  billingDate: [requiredValidator],
  amount: [requiredValidator, numberValidator]
}
