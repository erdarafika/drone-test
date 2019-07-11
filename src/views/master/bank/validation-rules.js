import { requiredValidator, alphanumericValidator, numberValidator } from '@/global-function/formValidator'

export default {
  bankName: [requiredValidator],
  swiftCode: [requiredValidator, alphanumericValidator],
  transferCode: [requiredValidator, numberValidator]
}
