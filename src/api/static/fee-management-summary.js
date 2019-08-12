
export function fetchList() {
  const data = [
    { type: 'Biaya_Pengelolaan_dana_Investasi', totalTransaction: 13, totalFee: 130000, create_at: new Date() },
    { type: 'Biaya_Administrasi_Iuran', totalTransaction: 31, totalFee: 310000, create_at: new Date() },
    { type: 'Biaya_Penarikan_Dana', totalTransaction: 9, totalFee: 90000, create_at: new Date() },
    { type: 'Biaya_Pengalihan_Dana', totalTransaction: 19, totalFee: 190000, create_at: new Date() },
    { type: 'Biaya_Administrasi_Kepesertaan_by_Fixed_Amount', totalTransaction: 47, totalFee: 470000, create_at: new Date() }]
  return Promise.resolve(data || [])
}
