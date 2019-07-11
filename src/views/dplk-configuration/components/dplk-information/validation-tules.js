import { requiredValidator, emailValidator, alphabeticValidator, numberValidator } from '@/global-function/formValidator'

export default {
  name: [
    requiredValidator, alphabeticValidator
  ],
  website: [
    requiredValidator
  ],
  email: [
    requiredValidator, emailValidator
  ],
  telp: [
    requiredValidator, numberValidator
  ],
  fax: [
    requiredValidator, numberValidator
  ]
}
