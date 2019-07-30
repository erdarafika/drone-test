import {
  isAlphanumeric,
  isAlphabetic,
  isAlphanumericLine,
  isAlphanumericLineDotSlash
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

const alphanumericLineValidatorFunc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input again'))
  } else if (!isAlphanumericLine(value)) {
    callback(new Error('This field only accept text, number & `-` '))
  } else {
    callback()
  }
}

const alphanumericLineDotSlashValidatorFunc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input again'))
  } else if (!isAlphanumericLineDotSlash(value)) {
    callback(new Error('This field only accept text, number, `.`, `/` , `-` '))
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

const numberValidatorFunc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input again'))
  } else if (isNaN(value)) {
    callback(new Error('This field only accept number'))
  } else {
    callback()
  }
}

const requiredValidator = { required: true, message: `This field is required` }

const emailValidator = { type: 'email', message: 'Please write valid email', trigger: 'blur' }

const alphabeticValidator = { validator: alphabeticValidatorFunc, trigger: 'change' }

const alphanumericValidator = { validator: alphanumericValidatorFunc, trigger: 'change' }

const alphanumericLineValidator = { validator: alphanumericLineValidatorFunc, trigger: 'change' }

const alphanumericLineDotSlashValidator = { validator: alphanumericLineDotSlashValidatorFunc, trigger: 'change' }

const numberValidator = { validator: numberValidatorFunc, trigger: 'change' }

export {
  numberValidator,
  emailValidator,
  requiredValidator,
  alphanumericValidator,
  alphabeticValidator,
  alphanumericLineValidator,
  alphanumericLineDotSlashValidator
}
