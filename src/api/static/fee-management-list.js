
export function fetchList() {
  const data = [
    { transactionDate: new Date(), description: 'Biaya Pengelolaan Dana Investasi', moneySource: 'Employee Contribution' },
    { transactionDate: new Date(), description: 'Biaya Administrasi Iuran', moneySource: 'Employer Contribution' },
    { transactionDate: new Date(), description: 'Biaya Penarikan Dana', moneySource: 'Employer Contribution' },
    { transactionDate: new Date(), description: 'Biaya Pengalihan Dana', moneySource: 'Employer Contribution' },
    { transactionDate: new Date(), description: 'Biaya Administrasi Kepesertaan by Fixed Amount', moneySource: 'Employee Contribution' }
  ]
  return Promise.resolve(data || [])
}
