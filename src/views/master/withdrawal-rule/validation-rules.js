import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  maxDifferentEarlyRetire: [requiredValidator, numberValidator],
  maxWIthdrawalFrequencyPerYear: [requiredValidator, numberValidator],
  minEffectiveYear: [requiredValidator, numberValidator],
  minWithdrawalAmount: [requiredValidator, numberValidator]
}
