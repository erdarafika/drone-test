import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  groupId: [requiredValidator],
  billingDate: [requiredValidator],
  amount: [requiredValidator, numberValidator]
}
