import { alphanumericValidator, requiredValidator } from '@/global-function/formValidator'

export default {
  type: [requiredValidator, alphanumericValidator],
  isMemberAddress: [requiredValidator],
  isCompanyAddress: [requiredValidator]
}
