import { validURL, validLowerCase, validUpperCase, validAlphabets, isAlphabetic, isAlphanumeric } from '@/utils/validate.js'
describe('Utils:validate', () => {
  it('isAlphabetic', () => {
    expect(isAlphabetic('ABCD')).toBe(true)
    expect(isAlphabetic('abcd')).toBe(true)
    expect(isAlphabetic('ABCD321')).toBe(false)
  })
  it('isAlphanumeric', () => {
    expect(isAlphanumeric('ABCD123')).toBe(true)
    expect(isAlphanumeric('abcd123')).toBe(true)
    expect(isAlphanumeric('abcd')).toBe(true)
    expect(isAlphanumeric('ABCD')).toBe(true)
    expect(isAlphanumeric('ABCD312321@-')).toBe(false)
  })
  it('validURL', () => {
    expect(validURL('https://www.google.com/')).toBe(true)
    expect(validURL('https://www.facebook.com/')).toBe(true)
    expect(validURL('google.com')).toBe(false)
  })
  it('validLowerCase', () => {
    expect(validLowerCase('abc')).toBe(true)
    expect(validLowerCase('Abc')).toBe(false)
    expect(validLowerCase('123abc')).toBe(false)
  })
  it('validUpperCase', () => {
    expect(validUpperCase('ABC')).toBe(true)
    expect(validUpperCase('Abc')).toBe(false)
    expect(validUpperCase('123ABC')).toBe(false)
  })
  it('validAlphabets', () => {
    expect(validAlphabets('ABC')).toBe(true)
    expect(validAlphabets('Abc')).toBe(true)
    expect(validAlphabets('123aBC')).toBe(false)
  })
})
