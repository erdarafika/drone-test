import { requiredValidator } from '@/global-function/formValidator'

export default {
  accountName: [requiredValidator],
  accountNumber: [requiredValidator],
  bankId: [requiredValidator],
  branchId: [requiredValidator]
}
