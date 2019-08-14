import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  companyId: [requiredValidator],
  groupId: [requiredValidator],
  memberId: [requiredValidator],
  amount: [requiredValidator, numberValidator]
}
