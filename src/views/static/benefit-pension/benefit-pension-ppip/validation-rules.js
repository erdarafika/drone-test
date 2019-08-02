import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  company: [requiredValidator],
  benefitType: [requiredValidator],
  submitDate: [requiredValidator],
  bankAccount: [requiredValidator],
  grossAmount: [requiredValidator, numberValidator],
  tax: [requiredValidator, numberValidator],
  fee: [requiredValidator, numberValidator],
  netAmount: [requiredValidator, numberValidator],
  percentage: [requiredValidator, numberValidator]
}
