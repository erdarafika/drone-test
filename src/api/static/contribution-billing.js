
import store from '@/store'

export function fetchList() {
  const data = store.getters.contribution.billing
  return Promise.resolve(data || [])
}
