import { requiredValidator, numberValidator } from '@/global-function/formValidator'

export default {
  amount: [
    requiredValidator, numberValidator
  ]
}
