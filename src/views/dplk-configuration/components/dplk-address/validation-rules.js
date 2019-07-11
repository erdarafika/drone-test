import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  name: [requiredValidator],
  addressTypeId: [requiredValidator],
  countryId: [requiredValidator],
  cityId: [requiredValidator],
  provinceId: [requiredValidator],
  postalCode: [requiredValidator, numberValidator],
  isDefault: [requiredValidator]
}
