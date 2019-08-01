import { requiredValidator } from '@/global-function/formValidator'

export default {
  companyId: [requiredValidator],
  groupId: [requiredValidator],
  effectiveDate: [requiredValidator],
  billing: [requiredValidator]
}
