
export function fetchList() {
  const data = [
    { type: 'Detail Daily Unit Report', email: 'parman@gmail.com', status: 'Delivered' },
    { type: 'Production Report', email: 'soekarno@gmail.com', status: 'Delivered' },
    { type: 'Detail Payment Receipt Report', email: 'sudirman@gmail.com', status: 'Processed' },
    { type: 'Investment Movement Letter', email: 'thamrin@gmail.com', status: 'Pending' },
    { type: 'DPLK Account Report Member Letter', email: 'hatta@gmail.com', status: 'Blocked' }]
  return Promise.resolve(data || [])
}
