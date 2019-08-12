import { requiredValidator } from '@/global-function/formValidator'

export default {
  ppipType: [requiredValidator],
  orgCompanyId: [requiredValidator],
  orgGroupId: [requiredValidator],
  orgEffectiveDate: [requiredValidator],
  orgbilling: [requiredValidator],
  idvCompanyId: [requiredValidator],
  idvGroupId: [requiredValidator],
  idvMemberId: [requiredValidator],
  idvEffectiveDate: [requiredValidator],
  idvAmount: [requiredValidator]
}
