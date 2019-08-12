import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  dplkBankId: [requiredValidator],
  amount: [requiredValidator, numberValidator],
  paymentDate: [requiredValidator],
  description: [requiredValidator]
}
