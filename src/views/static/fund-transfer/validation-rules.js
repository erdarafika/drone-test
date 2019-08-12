import { requiredValidator } from '@/global-function/formValidator'

export default {
  company: [requiredValidator],
  newCompany: [requiredValidator],
  newGroup: [requiredValidator],
  group: [requiredValidator],
  member: [requiredValidator],
  by: [requiredValidator]
}
