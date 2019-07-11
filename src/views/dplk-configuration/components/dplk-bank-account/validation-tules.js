import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  accountName: [requiredValidator],
  accountNumber: [requiredValidator, numberValidator],
  bankId: [requiredValidator],
  branchId: [requiredValidator]
}
