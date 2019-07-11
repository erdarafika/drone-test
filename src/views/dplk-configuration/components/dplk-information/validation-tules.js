import { requiredValidator, emailValidator } from '@/global-function/formValidator'

export default {
  name: [
    requiredValidator
  ],
  website: [
    requiredValidator
  ],
  email: [
    requiredValidator, emailValidator
  ],
  telp: [
    requiredValidator
  ],
  fax: [
    requiredValidator
  ]
}
