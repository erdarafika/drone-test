import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  dplkBank: [requiredValidator],
  amount: [requiredValidator, numberValidator],
  transactionDate: [requiredValidator],
  description: []
}
