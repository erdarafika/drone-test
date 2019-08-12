import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  averageLifeExpectancy: [requiredValidator, numberValidator],
  averageReturnOfInvestment: [requiredValidator, numberValidator],
  currentAge: [requiredValidator, numberValidator],
  currentSalary: [requiredValidator, numberValidator],
  idealReplacemenRatio: [requiredValidator, numberValidator],
  currentPensionAsset: [requiredValidator, numberValidator],
  retireAge: [requiredValidator, numberValidator]
}
