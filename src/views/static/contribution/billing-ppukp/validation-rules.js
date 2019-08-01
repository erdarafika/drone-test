import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  companyId: [requiredValidator],
  groupId: [requiredValidator],
  effectiveDate: [requiredValidator],
  amount: [requiredValidator, numberValidator]
}
