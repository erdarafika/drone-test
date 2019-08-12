import { requiredValidator } from '@/global-function/formValidator'

export default {
  suspend: [requiredValidator],
  group: [requiredValidator],
  companyBankAccount: [requiredValidator]
}
