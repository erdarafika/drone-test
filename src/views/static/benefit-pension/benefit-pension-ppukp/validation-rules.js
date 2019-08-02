import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  company: [requiredValidator],
  group: [requiredValidator],
  member: [requiredValidator],
  claimBenefit: [requiredValidator],
  memberBank: [requiredValidator],
  amount: [requiredValidator, numberValidator],
  companyDestination: [requiredValidator],
  groupDestination: [requiredValidator],
  benefitType: [requiredValidator]
}
