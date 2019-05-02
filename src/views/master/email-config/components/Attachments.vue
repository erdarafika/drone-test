<template lang="pug">
  .document-detail
    el-form(:model='temp', :inline='true' :rules='rules', ref='dataForm', label-width='100px')
      el-form-item(label='Name', prop='name')
        el-input(v-model='temp.name', autocomplete='off')
      el-form-item
        el-upload.upload-demo(ref='upload', action='https://jsonplaceholder.typicode.com/posts/', :auto-upload='false')
          el-button(slot='trigger', type='primary') {{$t('emailConfig.selectFile')}}
          el-button(style='margin-left: 10px;', type='success',   @click="createData()") {{$t('table.add')}}
          //- .el-upload__tip(slot='tip') jpg/png files with a size less than 500kb

    el-table(:data='attachments' v-loading='listLoading')
      el-table-column(property='name', label='Name' width="100px")
      el-table-column(property='file', label='File')
      el-table-column(label='', width="90")
        template(slot-scope="scope")
          el-button(type='danger', size='mini' @click="handleDelete(scope.row)")
            | {{ $t('table.delete') }}

</template>

<script>
import { setTimeout } from 'timers'

export default {
  name: 'Attachments',
  props: {
    data: Object
  },
  data() {
    return {
      temp: {
        name: undefined
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
    handleDelete(row) {
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
      const index = this.attachments.indexOf(row)
      this.attachments.splice(index, 1)
    },
    getAttachments() {
      this.listLoading = true
      setTimeout(() => {
        this.attachments = this.data.attachments
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }, 1000)
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$notify({
            title: this.$t('table.successTitle'),
            message: this.$t('table.successCaption'),
            type: 'success',
            duration: 2000
          })
          this.attachments.push({ name: this.temp.name, file: 'http://crcc2018.com/Sites/377/Editor/Images/start%20up.jpg' })
          this.temp.name = ''

          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
            this.$refs.upload.clearFiles()
          })
        }
      })
    }
  }
}
</script>
