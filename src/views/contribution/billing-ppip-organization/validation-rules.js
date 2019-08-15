import { requiredValidator } from '@/global-function/formValidator'

export default {
  companyId: [requiredValidator],
  groupId: [requiredValidator],
  billingDate: [requiredValidator],
  file: [requiredValidator]
}
