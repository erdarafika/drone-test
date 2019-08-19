<template lang="pug">
  app-container
    template(v-slot:header-left)
      Back(:action="()=> { $router.push({name: 'ContributionBilling'}) }")
    el-tabs(type='border-card')
      el-row(:gutter='40')
        el-col
          el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='150px', style='width: 80%')
            el-col(:span='12')
              el-form-item(:label="$t('table.inputType')", prop='inputType')
                el-select(v-model='temp.inputType', name='inputType' placeholder='Select', filterable, default-first-option, @change='handleType($event)')
                  el-option(v-for='item in inputTypeOptions', :key='item.value', :label='item.label', :value='item.value')
              el-form-item(:label="$t('billing.groupId')", prop='groupId')
                el-select(v-model='temp.groupId', name='group' placeholder='Select', filterable, default-first-option)
                  el-option(v-if="isImport === true" v-for='item in groupOrganizationOptions', :key='item.value', :label='item.label', :value='item.value')
                  el-option(v-if="isImport === false" v-for='item in groupOptions', :key='item.value', :label='item.label', :value='item.value')
              el-form-item(v-if="isImport === true" :label="$t('billing.billingDate')", prop='billingDate')
                el-date-picker(:value-format='dateFormat' v-model='temp.billingDate', type='date', placeholder='Pick a day' name='date')
              el-form-item(v-if="isImport === false" :label="$t('billing.memberId')", prop='memberId')
                el-select(v-if="memberOptions !== undefined" v-model='temp.memberId', name='member' placeholder='Select', filterable, default-first-option :disabled='temp.groupId === undefined')
                  el-option(v-for='item in memberOptions', :key='item.value', :label='item.label', :value='item.value')
              el-form-item(v-if="isImport === false" :label="$t('billing.billingType')", prop='inputType')
                el-select(v-model='temp.billingType', name='billingType' placeholder='Select', filterable, default-first-option)
                  el-option(v-for='item in billingTypeOptions', :key='item.value', :label='item.label', :value='item.value')
              el-form-item(v-if="isImport === false" :label="$t('billing.amount')", prop='amount')
                .el-input.el-input-group.el-input-group--prepend
                  .el-input-group__prepend Rp
                  money.el-input__inner(v-model.number='temp.amount', name='amount' v-bind='configSeparator')
              el-form-item(v-if="isImport === false")
                table.pull-right
                  td
                    Cancel(:callback='resetTemp')
                  td
                    RequestApproval(:callback='requestApproval')
            el-col(:span='12' v-if="isImport === true")
              el-form-item(:label="$t('billing.importBilling')", prop='file')
                upload-excel-component(:on-success='handleSuccess()', :before-upload='beforeUpload' style='width: 100%;' ref="file")
                span(class='el-alert el-alert--success' v-if='temp.file !== undefined') {{ temp.file.name }}
              el-form-item(v-if='showPreview === false')
                Upload.pull-right(style="margin-left: 5px;" :callback='previewData')
                Cancel.pull-right(:callback='resetTemp')
      el-row(:gutter="40")
        el-col(v-if='isConflict === true & isImport === true')
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
          el-table(v-if='showPreview === true' height="500" :key="tableKey" :data="billingDetail" :span-method="arraySpanMethod" stripe)
            el-table-column(type="index", align='left')
            el-table-column(:label="$t('billingDetail.memberId')", align='left')
              template(slot-scope="scope")
                span(v-if="scope.row.member.name !== 'Total'") {{ scope.row.member.name }}
                span(v-else style="font-weight: bold;") {{ scope.row.member.name }}
            el-table-column(:label="$t('billingDetail.employee')")
              template(slot-scope="scope")
                span {{ IDR(scope.row.employee) }}
            el-table-column(:label="$t('billingDetail.employer')")
              template(slot-scope="scope")
                span {{ IDR(scope.row.employer) }}
            el-table-column(:label="$t('billingDetail.topUpEe')")
              template(slot-scope="scope")
                span {{ IDR(scope.row.topUpEe) }}
            el-table-column(:label="$t('billingDetail.topUpEr')")
              template(slot-scope="scope")
                span {{ IDR(scope.row.topUpEr) }}
            el-table-column(:label="$t('billingDetail.totalAmount')")
              template(slot-scope="scope")
                span(v-if="scope.row.member.name !== 'Total'") {{ IDR(scope.row.totalAmount) }}
                span(v-else style="font-weight: bold;") {{ IDR(scope.row.totalAmount) }}
</template>

<script>
import { processImport, preview, createRecord } from '@/api/contribution-billing'
import { fetchList as fetchGroup } from '@/api/group-maintenance'
import { fetchList as fetchMember } from '@/api/membership'
import { fetchMathConfig } from '@/api/config'
import rules from './validation-rules'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { Notification } from 'element-ui'

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
      groupOrganizationOptions: [],
      memberOptions: [],
      isConflict: false,
      errorsData: [],
      showPreview: false,
      isImport: undefined,
      inputTypeOptions: [
        { label: 'Input Manual', value: 'manual' },
        { label: 'Import Billing Topup', value: 'import' }
      ],
      billingTypeOptions: [
        { label: 'Topup Adhoc Employer', value: 'adhoc-topup-er' },
        { label: 'Topup Adhoc Employee', value: 'adhoc-topup-ee' }
      ],
      configSeparator: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      billingDetail: [],
      sumTotalAmount: [],
      temp: {
        groupId: undefined,
        memberId: undefined,
        amount: undefined,
        billingDate: undefined,
        billingType: undefined,
        file: undefined
      },
      rules
    }
  },
  watch: { 'temp.groupId': function(groupId) {
    if (!this.initialUpdate) {
      this.temp.memberId = undefined
    }
    if (groupId) {
      fetchMember({ groupId: groupId }).then(res => {
        res = res.filter(item => item.certificateStatus === 'active')
        this.memberOptions = res.map(item => ({ value: item.id, label: item.name + ' - ' + item.certificateNumber }))
      })
    }
  }
  },
  created() {
    this.resetTemp()
    fetchGroup().then(res => {
      const data = res.filter(item => item.status === 'active' && item.productType.code === 'dplk')
      const data2 = res.filter(item => item.status === 'active' && item.productType.code === 'dplk' && item.type === 'organization')
      this.groupOptions = data.map(item => ({ value: item.id, label: item.name + ' - ' + item.company.name }))
      this.groupOrganizationOptions = data2.map(item => ({ value: item.id, label: item.name + ' - ' + item.company.name }))
    })
    fetchMathConfig({ code: 'amount', type: 'separator' }).then(res => {
      if (res.length) {
        this.configSeparator.precision = res[0].value
      }
    })
  },
  methods: {
    back() {
      this.$router.push({ name: 'ContributionBilling' })
    },
    handleType(event) {
      this.temp.billingType = undefined
      switch (event) {
        case 'manual':
          this.isImport = false
          break
        case 'import':
          this.isImport = true
          break
      }
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
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.member.name === 'Total') {
        if (columnIndex === 1) {
          return {
            rowspan: 1,
            colspan: 6
          }
        } else if (columnIndex in [1, 2, 3, 4, 5, 6]) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    previewData() {
      this.temp.billingType = 'adhoc-topup'
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('groupId', this.temp.groupId)
          formData.append('billingDate', this.temp.billingDate)
          formData.append('file', this.temp.file)
          formData.append('billingType', this.temp.billingType)
          preview(formData).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              let totalAmount = 0
              this.isConflict = false
              this.showPreview = true
              this.billingDetail = response
              response.forEach(function(data) {
                totalAmount = totalAmount + data.totalAmount
              })
              this.billingDetail.push({ member: { name: 'Total' }, totalAmount: totalAmount })
              this.sumTotalAmount = [
                {
                  label: this.$t('table.total'),
                  value: 'IDR ' + this.IDR(totalAmount)
                }
              ]
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
      if (this.isImport === true) {
        this.temp.billingType = 'adhoc-topup'
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const formData = new FormData()
            formData.append('groupId', this.temp.groupId)
            formData.append('billingDate', this.temp.billingDate)
            formData.append('file', this.temp.file)
            formData.append('billingType', this.temp.billingType)
            processImport(formData).then((response) => {
              if (response.status_code >= 200 && response.status_code <= 300) {
                this.successNotifier()
                this.back()
              }
            })
          }
        })
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createRecord(this.temp).then((response) => {
              if (response.status_code >= 200 && response.status_code <= 300) {
                this.successNotifier()
                this.back()
              }
            })
          }
        })
      }
    },
    resetTemp() {
      this.temp = {
        groupId: undefined,
        billingDate: undefined,
        memberId: undefined,
        amount: undefined,
        file: undefined,
        billingType: undefined
      }
      this.isConflict = false
      this.showPreview = false
      this.isImport = undefined
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>

