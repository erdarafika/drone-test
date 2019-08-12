import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  averageLifeExpectations: [requiredValidator, numberValidator],
  averageReturnOfInvestment: [requiredValidator, numberValidator],
  currentAge: [requiredValidator, numberValidator],
  currentSalary: [requiredValidator, numberValidator],
  idealReplacementRatio: [requiredValidator, numberValidator],
  currentPensionAssets: [requiredValidator, numberValidator],
  retireAge: [requiredValidator, numberValidator]
}
