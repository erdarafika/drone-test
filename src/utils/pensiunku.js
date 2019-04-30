export function generateDate() {
  const current_datetime = new Date()
  const formatted_date = `${current_datetime.getFullYear()}-${(current_datetime.getMonth() + 1)}-${current_datetime.getDate()}`
  return formatted_date
}
