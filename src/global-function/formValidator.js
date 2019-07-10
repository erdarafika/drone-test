import {
  isAlphanumeric,
  isAlphabetic
} from '@/utils/validate'

const alphanumericValidatorFunc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input again'))
  } else if (!isAlphanumeric(value)) {
    callback(new Error('This field do not accept symbol'))
  } else {
    callback()
  }
}

const alphabeticValidatorFunc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input again'))
  } else if (!isAlphabetic(value)) {
    callback(new Error('This field must be alphabetic, no number etc'))
  } else {
    callback()
  }
}

const requiredValidator = { required: true, message: `this field is required` }

const emailValidator = { type: 'email', message: 'please write valid email', trigger: 'blur' }

const alphabeticValidator = { validator: alphabeticValidatorFunc, trigger: 'blur' }

const alphanumericValidator = { validator: alphanumericValidatorFunc, trigger: 'blur' }

const numberValidator = { type: 'number', message: 'this field only accept number', trigger: 'blur' }

export {
  numberValidator,
  emailValidator,
  requiredValidator,
  alphanumericValidator,
  alphabeticValidator
}
