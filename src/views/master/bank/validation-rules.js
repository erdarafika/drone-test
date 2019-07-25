import { requiredValidator, alphanumericValidator, alphabeticValidator, numberValidator } from '@/global-function/formValidator'

export default {
  bankName: [requiredValidator, alphabeticValidator],
  swiftCode: [requiredValidator, alphanumericValidator],
  transferCode: [requiredValidator, numberValidator],
  code: [requiredValidator, alphabeticValidator]
}
