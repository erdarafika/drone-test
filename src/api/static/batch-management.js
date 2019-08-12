
export function fetchList() {
  const data = [
    { id: 1, type: 'Biaya_Pengelolaan_dana_Investasi', description: 'Biaya Pengelolaan dana Investasi', time: '10 Agustus, 2019 10:00:00', create_at: new Date(), status: '✓' },
    { id: 2, type: 'Biaya_Administrasi_Iuran', description: 'Biaya Administrasi Iuran', time: '9 Agustus, 2019 10:00:00', create_at: new Date(), status: '✓' },
    { id: 3, type: 'Biaya_Penarikan_Dana', description: 'Biaya Penarikan Dana', time: '8 Agustus, 2019 10:00:00', create_at: new Date(), status: '✓' },
    { id: 4, type: 'Biaya_Pengalihan_Dana', description: 'Biaya Pengalihan Dana', time: '7 Agustus, 2019 10:00:00', create_at: new Date(), status: '✓' },
    { id: 5, type: 'Biaya_Administrasi_Kepesertaan_by_Fixed_Amount', description: 'Biaya Administrasi Kepesertaan by Fixed Amount', time: '6 Agustus, 2019 10:00:00', create_at: new Date(), status: '✓' },
    { id: 4, type: 'Unitizing', description: 'Unitizing', time: '6 Agustus, 2019 10:00:00', create_at: new Date(), status: '✓' }]
  return Promise.resolve(data || [])
}

export function createRecord(data) {
  console.log('create', data)
  return Promise.resolve({ status_code: 200 })
}

export function approveRecord(data) {
  console.log('approve', data)
  return Promise.resolve({ status_code: 200 })
}
