<template lang="pug">
app-container
  template(v-slot:header-left)
    Back(:action="()=> { $router.push({name: 'MemberMaintenance'}) }")
  el-row(:gutter='40' v-if="!showPreview")
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='top', label-width='150px', style='width: 80%')
      el-col(:span='12')
        el-form-item(:label="$t('membership.groupId')", prop='groupId')
          el-select(v-model='temp.groupId', name='group' placeholder='Select', filterable, default-first-option)
            el-option(v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(v-if='showPreview === false')
          Cancel(:callback='resetTemp')
          Upload(style="margin-left: 5px;" :callback='previewData')
      el-col(:span='12')
        el-form-item(:label="$t('membership.importMember')", prop='file')
          upload-excel-component(:on-success='handleSuccess()', :before-upload='beforeUpload' style='width: 100%;' ref="file")
          span(class='el-alert el-alert--success' v-if='temp.file !== undefined') {{ temp.file.name }}
  el-row(:gutter="40")
    el-col(v-if='isConflict === true')
      h4(style='color:#646266') Invalid Data
      el-table(height="450" :data='errorsData' stripe)
        el-table-column(type="index" width="120" :label="$t('table.lineNumber')")
          template(slot-scope='scope')
            span {{ scope.row.line }}
        el-table-column(:label="$t('table.errors')")
          template(slot-scope='scope')
            span(v-for="item in scope.row.errors") <strong>{{ item.field }}</strong> {{ item.message }}<br/>
    el-col(v-else)
      RequestApproval.pull-right(v-if='showPreview === true' :callback='requestApproval')
      Cancel.pull-right(v-if='showPreview === true' :callback='resetTemp')
      el-table(v-if='showPreview === true' height="650" :key="tableKey" :data="members" stripe style="width: 100%")
        el-table-column(type="index", align='left' fixed)
        el-table-column(:label="$t('membership.name')", align='left' fixed width="150")
          template(slot-scope="scope")
            span {{ scope.row.name }}
        el-table-column(:label="$t('membership.employmentDate')" width="150")
          template(slot-scope="scope")
            span {{ scope.row.employmentDate | moment("Do MMMM, YYYY")  }}
        el-table-column(:label="$t('membership.employeeNumberId')" width="160")
          template(slot-scope="scope")
            span {{ scope.row.employeeNumberId }}
        el-table-column(:label="$t('membership.dobPlace')" width="100")
          template(slot-scope="scope")
            span {{ scope.row.dobPlace }}
        el-table-column(:label="$t('membership.dateOfBirth')" width="130")
          template(slot-scope="scope")
            span {{ scope.row.dateOfBirth | moment("Do MMMM, YYYY") }}
        el-table-column(:label="$t('membership.identityType')" width="110")
          template(slot-scope="scope")
            span {{ scope.row.identityType }}
        el-table-column(:label="$t('membership.identityNumber')" width="150")
          template(slot-scope="scope")
            span {{ scope.row.identityNumber }}
        el-table-column(:label="$t('membership.email')" width="150")
          template(slot-scope="scope")
            span {{ scope.row.email }}
        el-table-column(:label="$t('membership.job')" width="150")
          template(slot-scope="scope")
            span {{ scope.row.job }}
        el-table-column(:label="$t('membership.npwp')" width="150")
          template(slot-scope="scope")
            span {{ scope.row.npwp }}
        el-table-column(:label="$t('membership.purpose')" width="150")
          template(slot-scope="scope")
            span {{ scope.row.purpose }}
        el-table-column(:label="$t('membership.moneySource')" width="150")
          template(slot-scope="scope")
            span {{ scope.row.moneySource }}
        el-table-column(:label="$t('membership.avgIncomePerMonth')" width="160")
          template(slot-scope="scope")
            span {{ scope.row.avgIncomePerMonth }}
        el-table-column(:label="$t('membership.relationToPayor')" width="150")
          template(slot-scope="scope")
            span {{ scope.row.relationToPayor }}
        el-table-column(:label="$t('membership.salary')" width="150")
          template(slot-scope="scope")
            span {{ IDR(scope.row.salary) }}
        el-table-column(:label="$t('membership.phoneNumber')" width="150")
          template(slot-scope="scope")
            span {{ '(' + scope.row.phoneNumberPrefix + ') ' + scope.row.phoneNumber }}
        el-table-column(:label="$t('membership.cellPhoneNumber')" width="150")
          template(slot-scope="scope")
            span {{ '(' + scope.row.cellPhoneNumberPrefix + ') ' + scope.row.cellPhoneNumber }}
</template>

<script>
import { processImport, previewImport } from '@/api/membership'
import { fetchList as fetchGroup } from '@/api/group-maintenance'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { Notification } from 'element-ui'
import { requiredValidator } from '@/global-function/formValidator'

export default {
  components: { UploadExcelComponent },
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      tableKey: 0,
      tableData: [],
      tableHeader: [],
      listLoading: true,
      groupOptions: [],
      isConflict: false,
      errorsData: [],
      showPreview: false,
      members: [],
      temp: {
        groupId: undefined,
        file: undefined
      },
      rules: {
        groupId: [requiredValidator],
        file: [requiredValidator]
      }
    }
  },
  created() {
    this.resetTemp()
    fetchGroup().then(res => {
      res = res.filter(item => item.status === 'active')
      this.groupOptions = res.map(item => ({ value: item.id, label: item.name + ' - ' + item.company.name }))
    })
  },
  methods: {
    back() {
      this.$router.push({ name: 'MemberMaintenance' })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        this.temp.file = file
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess() {
      if (this.temp.file !== undefined) {
        const duration = 3500
        if (this.showPreview !== true) {
          Notification({
            title: 'File added',
            message: this.temp.file.name,
            type: 'success',
            duration
          })
        }
      }
    },
    previewData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('groupId', this.temp.groupId)
          formData.append('file', this.temp.file)
          previewImport(formData).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.isConflict = false
              this.showPreview = true
              this.members = response
              console.log(response)
            }
          }).catch((err) => {
            this.showPreview = false
            if (err.response.data.error === 'conflict') {
              const errors = err.response.data.errors
              let lineNumber = 1
              const listErrors = []
              errors.forEach(function(data) {
                if (data.length > 0) {
                  const listError = []
                  data.forEach(function(error) {
                    const errorMessage = {
                      field: error.field,
                      message: error.defaultMessage
                    }
                    listError.push(errorMessage)
                  })
                  const constructData = {
                    line: lineNumber,
                    errors: listError
                  }
                  listErrors.push(constructData)
                }
                lineNumber++
              })
              this.errorsData = listErrors
              this.temp.file = undefined
              this.isConflict = true
            }
          })
        }
      })
    },
    requestApproval() {
      const formData = new FormData()
      formData.append('groupId', this.temp.groupId)
      formData.append('file', this.temp.file)
      processImport(formData).then((response) => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
          this.back()
        }
      })
    },
    resetTemp() {
      this.temp = {
        groupId: undefined,
        file: undefined
      }
      this.isConflict = false
      this.showPreview = false
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>

