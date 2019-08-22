import { Notification } from 'element-ui'
import store from '@/store'

const message = {
  id: {
    successCaption: 'Operasi Berhasil',
    successTitle: 'Berhasil',
    cancelCaption: 'Operasi di Batalkan',
    cancelTitle: 'Batal'
  },
  en: {
    successCaption: 'Success',
    successTitle: 'Operation Success',
    cancelCaption: 'Operation Cancelled',
    cancelTitle: 'Cancelled'
  }
}

const duration = 2000

export function successNotifier(language = 'id') {
  if (store.getters && store.getters.language) {
    language = store.getters && store.getters.language
  }
  Notification({
    title: message[language].successTitle,
    message: message[language].successCaption,
    type: 'success',
    duration
  })
}

export function cancelNotifier(language = 'id') {
  if (store.getters && store.getters.language) {
    language = store.getters && store.getters.language
  }
  Notification({
    title: message[language].cancelTitle,
    message: message[language].cancelCaption,
    type: 'warning',
    duration
  })
}
