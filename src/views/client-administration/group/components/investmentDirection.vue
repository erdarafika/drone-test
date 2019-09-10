
<template lang="pug">
  el-row
    el-col(:span="12")
      el-table(:key="tableKey" v-loading="listLoading" :data="filterredList" fit="" style="width: 100%;")
        el-table-column(:label="`Employer Contribution`", align='center', )
          el-table-column(:label="$t('investmentDirection.fundName')", v-crud-permission="['maker']")
            template(slot-scope="scope")
              span {{ scope.row.name }}
          el-table-column(:label="$t('investmentDirection.percentage')", align='center', v-crud-permission="['maker']")
            el-input(v-model="temp.percentage" name='percentage[]' type='number')
      el-button.pull-right(type='primary', @click="createData('employer')" style="margin-top: 5px;")
        | {{ $t('table.save') }}
    el-col(:span="12")
      span OK

</template>

<script>
import { fetchList as fetchInvestmentType } from '@/api/investment-type'
import { fetchList } from '@/api/group-fund-policy'
import { requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'GroupInvestmentDirection',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      momentDateFormat: 'DD-MM-YYYY',
      isDetail: true,
      tableKey: 0,
      list: [],
      total: 0,
      isFreq: true,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      employee: [],
      employer: [],
      tempEmployer: [],
      tempEmployee: [],
      temp: {
        percentage: 0
      },
      frequencyOptions: [{ label: 'Monthly', value: 1 }, { label: 'Quarterly', value: 4 }, { label: 'Semi Anually', value: 6 }, { label: 'Anually', value: 12 }],
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [requiredValidator],
        groupId: [requiredValidator],
        frequency: [requiredValidator],
        billingDate: [requiredValidator]
      }
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    }
  },
  created() {
    if (this.data.id) {
      this.getList()
    }
  },
  methods: {
    changeView(event) {
      if (event === '') {
        this.isDetail = false
      } else {
        this.isDetail = true
      }
      console.log(this.isDetail)
    },
    reFormatDate(date) {
      if (!date) { return null }
      return this.$moment(date).format(this.momentDateFormat)
    },
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getList() {
      this.listLoading = true
      fetchInvestmentType().then(response => {
        response = response.filter(item => item.status === 'active')
        console.log(response)
        this.list = response
        this.listLoading = false
      })
      fetchList(this.data.id).then(response => {
        this.employer = response.filter(item => item.type === 'employer')
        this.employee = response.filter(item => item.type === 'employee')
        console.log(this.employer)
        console.log(this.employee)
      })
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        groupId: this.data.id,
        frequency: undefined,
        billingDate: undefined
      }
    },
    createData(type) {
      switch (type) {
        case 'employer':
          console.log(this.employer)
          break
        case 'employee':
          break
      }
    },
    handleUpdate(row) {
      this.temp = {
        id: row.id,
        name: row.name,
        groupId: this.data.id,
        frequency: row.percentage,
        billingDate: row.billingDate
      }
      this.initialUpdate = true
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
          // updateGroupInvestmentDirection(tempData).then((response) => {
          //   this.dialogFormVisible = false
          //   if (response.status_code >= 200 && response.status_code <= 300) {
          //     this.successNotifier()
          //     this.getList()
          //   }
          // })
        }
      })
    },
    handleDelete(row) {
      row['groupId'] = this.data.id
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        // deleteGroupInvestmentDirection(row).then((response) => {
        //   this.dialogFormVisible = false
        //   this.successNotifier()
        //   this.getList()
        // })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>
