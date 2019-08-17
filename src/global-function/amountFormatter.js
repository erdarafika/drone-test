/**
 * @return {string}
 */
export function IDR(value) {
  if (value !== undefined) {
    return value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1\.') + ',00'
  } else {
    return '0,00'
  }
}
