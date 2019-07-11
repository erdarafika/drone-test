import { requiredValidator, alphanumericLineValidator } from '@/global-function/formValidator'

export default {
  name: [requiredValidator],
  code: [requiredValidator, alphanumericLineValidator],
  description: []
}
