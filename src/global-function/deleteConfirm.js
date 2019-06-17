const message = {
  question: 'This will permanently delete the file. Continue ?',
  delete: 'Ok',
  cancel: 'Cancel'
}

export default function confirmDelele(deleteCallback, cancelCallback) {
  this.$confirm(message.question, {
    confirmButtonText: message.delete,
    cancelButtonText: message.cancel,
    type: 'warning'
  }).then(() => {
    deleteCallback()
  }).catch((err) => {
    console.log(err)
    cancelCallback()
  })
}
