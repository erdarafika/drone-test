import { requiredValidator } from '@/global-function/formValidator'

export default {
  company: [requiredValidator],
  group: [requiredValidator],
  member: [requiredValidator],
  productType: [requiredValidator],
  documentType: [requiredValidator],
  importFile: [requiredValidator]
}
