import {
  isAlphanumeric,
  isAlphabetic
} from '@/utils/validate'

const alphanumericValidator = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input again'))
  } else if (!isAlphanumeric(value)) {
    callback(new Error('This field do not accept symbol'))
  } else {
    callback()
  }
}

const alphabeticValidator = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input again'))
  } else if (!isAlphabetic(value)) {
    callback(new Error('This field must be alphabetic, no number etc'))
  } else {
    callback()
  }
}

export {
  alphanumericValidator,
  alphabeticValidator
}
