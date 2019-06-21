<template lang="pug">
  .document-detail
    el-form(:model='temp', :inline='true' :rules='rules', ref='dataForm', label-width='100px')
      el-form-item(label='Name', prop='name')
        el-input(v-model='temp.name', autocomplete='off')
      el-form-item
        el-upload.upload-demo(ref='upload', :limit="3" :on-exceed="handleExceed" :before-upload="beforeUpload" action='https://jsonplaceholder.typicode.com/posts/', :auto-upload='false')
          el-button(slot='trigger', type='primary') {{$t('emailConfig.selectFile')}}
          el-button(style='margin-left: 10px;', type='success',   @click="createData()") {{$t('table.add')}}
          .el-upload__tip(slot='tip') files with a size less than 10 MB

    el-table(:data='attachments' v-loading='listLoading')
      el-table-column(property='name', label='Name' width="100px")
      el-table-column(property='file', label='File')
      el-table-column(label='', width="90")
        template(slot-scope="scope")
          el-button(type='danger', size='mini' @click="handleDelete(scope.row)")
            | {{ $t('table.delete') }}

</template>

<script>

import { fetchAttachment, createAttachment } from '@/api/email-config'

export default {
  name: 'Attachments',
  props: {
    data: Object
  },
  data() {
    return {
      temp: {
        name: undefined,
        file: undefined
      },
      attachments: null,
      listLoading: false,
      rules: {
        name: [
          { required: true, message: 'Name is required' }
        ]
      }
    }
  },
  created() {
    this.getAttachments()
  },
  methods: {

    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isLt2M) {
        this.$message.error('File size can not exceed 10MB!')
      }

      if (isLt2M) {
        this.temp.file = file
      }

      return false
    },
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 1, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`)
    },
    handleDelete(row) {

    },
    getAttachments() {
      this.listLoading = true
      const emailConfigId = this.data.id
      fetchAttachment(emailConfigId).then(response => {
        this.attachments = response
        console.log(response)

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
          const dataToUpload = new FormData()
          dataToUpload.append('file', this.temp.file)
          dataToUpload.append('name', this.temp.name)

          createAttachment(dataToUpload, this.data.id).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.$refs.upload.clearFiles()
            }
            this.dialogFormVisible = false
          })
        }
      })
    }
  }
}
</script>
