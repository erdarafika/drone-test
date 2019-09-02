
<!--<template lang="pug">-->
<!--div-->
<!--  .filter-container-->
<!--    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')-->
<!--  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')-->
<!--    el-table-column(:label="$t('groupCharge.name')", align='center', )-->
<!--      template(slot-scope='scope')-->
<!--        span {{ scope.row.feeType.name }}-->
<!--    el-table-column(:label="$t('groupCharge.frequency')", align='center',)-->
<!--      template(v-if="isFreq" slot-scope='scope')-->
<!--        span {{ scope.row.frequency }}-->
<!--    el-table-column(:label="$t('groupCharge.nextDeducted')", align='center')-->
<!--      template(slot-scope='scope')-->
<!--        span {{ scope.row.billingDate | moment("Do MMMM, YYYY") }}-->
<!--    el-table-column(:label="$t('groupCharge.feeCharge')", align='center')-->
<!--      el-table-column(:label="$t('groupCharge.feeFund')", align='center')-->
<!--        template(slot-scope='scope')-->
<!--          span {{ scope.row.name }}-->
<!--      el-table-column(:label="$t('groupCharge.fee')", align='center')-->
<!--        template(slot-scope='scope')-->
<!--          span {{ scope.row.fee }} %-->
<!--    el-table-column( align='center', width='150' )-->
<!--      template(slot-scope='{row}')-->
<!--        Edit(:data='row' v-crud-permission="['maker']" @change="changeView")-->
<!--  el-table(v-if="isDetail === true" key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;' span-method="objectSpanMethod")-->
<!--    el-table-column(:label="`Investment Fund Management`", align='center', )-->
<!--      el-table-column(:label="$t('groupCharge.frequency')", align='center', )-->
<!--        el-select(placeholder='Select' v-model='temp.frequency' name='frequency')-->
<!--          el-option(v-for='item in frequencyOptions', :key='item.value', :label='item.label', :value='item.value')-->
<!--        el-checkbox(v-model='temp.isPerFund') Fee Per Fund-->
<!--        el-checkbox(v-model='temp.isMultiTier') Multi Tier-->
<!--      el-table-column(:label="$t('groupCharge.nextDeducted')", align='center', )-->
<!--        el-date-picker(:value-format='dateFormat' v-model='temp.billingDate', name='billingDate'  type='date', placeholder='Pick a date')-->
<!--      el-table-column(:label="$t('groupCharge.name')", align='center', )-->
<!--      el-table-column(:label="$t('groupCharge.name')", align='center', )-->
<!--  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')-->

<!--  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible' append-to-body)-->
<!--    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')-->
<!--      el-form-item(:label="$t('groupCharge.frequency')", prop='frequency')-->
<!--        el-select(placeholder='Select' v-model='temp.frequency' name='frequency')-->
<!--          el-option(v-for='item in frequencyOptions', :key='item.value', :label='item.label', :value='item.value')-->
<!--      el-form-item(:label="$t('groupCharge.nextDeducted')" prop='billingDate')-->
<!--        el-date-picker(:value-format='dateFormat' v-model='temp.billingDate', name='billingDate'  type='date', placeholder='Pick a date')-->
<!--      el-form-item(:label="``", prop='employer')-->
<!--        el-checkbox(v-model='temp.isPerFund') Fee Per Fund-->
<!--        el-checkbox(v-model='temp.isMultiTier') Multi Tier-->
<!--      el-form-item(:label="$t('classPlan.isPercentage')" prop='isPercentage')-->
<!--        el-switch(v-model='temp.isPercentage' name='isPercentage')-->
<!--        span.switch-status {{ temp.isPercentage?'Yes':'No' }}-->
<!--    .dialog-footer(slot='footer')-->
<!--      el-button(@click='dialogFormVisible = false')-->
<!--        | {{ $t('table.cancel') }}-->
<!--      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")-->
<!--        | {{ $t('table.confirm') }}-->

<!--</template>-->

<!--<script>-->
<!--import { fetchList, createGroupClassPlan, updateGroupClassPlan, deleteGroupClassPlan } from '@/api/group-fee'-->
<!--import Pagination from '@/components/Pagination' // secondary package based on el-pagination-->
<!--import { requiredValidator } from '@/global-function/formValidator'-->

<!--export default {-->
<!--  name: 'GroupCharge',-->
<!--  components: { Pagination },-->
<!--  props: ['data'],-->
<!--  data() {-->
<!--    return {-->
<!--      dateFormat: 'dd-MM-yyyy',-->
<!--      momentDateFormat: 'DD-MM-YYYY',-->
<!--      isDetail: false,-->
<!--      tableKey: 0,-->
<!--      list: [],-->
<!--      total: 0,-->
<!--      isFreq: true,-->
<!--      listLoading: true,-->
<!--      listQuery: {-->
<!--        page: 1,-->
<!--        limit: 20-->
<!--      },-->
<!--      temp: {-->
<!--        name: undefined,-->
<!--        groupId: undefined,-->
<!--        frequency: undefined,-->
<!--        billingDate: undefined,-->
<!--        isMultiTier: undefined,-->
<!--        isFeePerFund: undefined-->
<!--      },-->
<!--      frequencyOptions: [{ label: 'Monthly', value: 1 }, { label: 'Quarterly', value: 4 }, { label: 'Semi Anually', value: 6 }, { label: 'Anually', value: 12 }],-->
<!--      initialUpdate: false,-->
<!--      dialogFormVisible: false,-->
<!--      dialogStatus: '',-->
<!--      rules: {-->
<!--        name: [requiredValidator],-->
<!--        groupId: [requiredValidator],-->
<!--        frequency: [requiredValidator],-->
<!--        billingDate: [requiredValidator]-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    filterredList() {-->
<!--      const { q, limit, page } = this.listQuery-->
<!--      const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))-->
<!--      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))-->
<!--      return listAfterPagination-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    if (this.data.id) {-->
<!--      this.getList()-->
<!--      this.temp.groupId = this.data.id-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    changeView(event) {-->
<!--      switch (event) {-->
<!--        case 1:-->
<!--          this.isDetail = false-->
<!--          break-->
<!--        case 2:-->
<!--          this.isDetail = true-->
<!--          break-->
<!--      }-->
<!--      console.log(this.isDetail)-->
<!--    },-->
<!--    reFormatDate(date) {-->
<!--      if (!date) { return null }-->
<!--      return this.$moment(date).format(this.momentDateFormat)-->
<!--    },-->
<!--    getDialogHeader(dialogStatus) {-->
<!--      if (dialogStatus === 'update') {-->
<!--        return this.$t('modal.editModalHeader')-->
<!--      } else {-->
<!--        return this.$t('modal.addModalHeader')-->
<!--      }-->
<!--    },-->
<!--    getList() {-->
<!--      this.listLoading = true-->
<!--      fetchList(this.data.id).then(response => {-->
<!--        console.log(response)-->
<!--        response.billingDate = this.reFormatDate(response.billingDate)-->
<!--        this.list = response-->
<!--        this.total = response.length-->
<!--        this.listLoading = false-->
<!--      })-->
<!--    },-->
<!--    resetTemp() {-->
<!--      this.temp = {-->
<!--        name: undefined,-->
<!--        groupId: this.data.id,-->
<!--        frequency: undefined,-->
<!--        billingDate: undefined-->
<!--      }-->
<!--    },-->
<!--    handleCreate() {-->
<!--      this.resetTemp()-->
<!--      this.dialogStatus = 'create'-->
<!--      this.dialogFormVisible = true-->
<!--      this.$nextTick(() => {-->
<!--        this.$refs['dataForm'].clearValidate()-->
<!--      })-->
<!--    },-->
<!--    createData() {-->
<!--      this.$refs['dataForm'].validate((valid) => {-->
<!--        if (valid) {-->
<!--          this.temp['companyId'] = this.data.id-->
<!--          createGroupClassPlan(this.temp).then((response) => {-->
<!--            if (response.status_code >= 200 && response.status_code <= 300) {-->
<!--              this.successNotifier()-->
<!--              this.getList()-->
<!--            }-->
<!--            this.dialogFormVisible = false-->
<!--          })-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    handleUpdate(row) {-->
<!--      this.temp = {-->
<!--        id: row.id,-->
<!--        name: row.name,-->
<!--        groupId: this.data.id,-->
<!--        frequency: row.percentage,-->
<!--        billingDate: row.billingDate-->
<!--      }-->
<!--      this.initialUpdate = true-->
<!--      this.dialogStatus = 'update'-->
<!--      this.dialogFormVisible = true-->
<!--      this.$nextTick(() => {-->
<!--        this.$refs['dataForm'].clearValidate()-->
<!--      })-->
<!--    },-->
<!--    updateData() {-->
<!--      this.$refs['dataForm'].validate((valid) => {-->
<!--        if (valid) {-->
<!--          const tempData = Object.assign({}, this.temp)-->
<!--          updateGroupClassPlan(tempData).then((response) => {-->
<!--            this.dialogFormVisible = false-->
<!--            if (response.status_code >= 200 && response.status_code <= 300) {-->
<!--              this.successNotifier()-->
<!--              this.getList()-->
<!--            }-->
<!--          })-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    arraySpanMethod({ row, column, rowIndex, columnIndex }) {-->
<!--      if (rowIndex % 2 === 0) {-->
<!--        if (columnIndex === 0) {-->
<!--          return [1, 2]-->
<!--        } else if (columnIndex === 1) {-->
<!--          return [0, 0]-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    objectSpanMethod({ row, column, rowIndex, columnIndex }) {-->
<!--      if (columnIndex === 0) {-->
<!--        if (rowIndex % 2 === 0) {-->
<!--          return {-->
<!--            rowspan: 2,-->
<!--            colspan: 1-->
<!--          }-->
<!--        } else {-->
<!--          return {-->
<!--            rowspan: 0,-->
<!--            colspan: 0-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    handleDelete(row) {-->
<!--      row['groupId'] = this.data.id-->
<!--      const cancelCallback = () => this.cancelNotifier()-->

<!--      const deleteCallback = () => {-->
<!--        deleteGroupClassPlan(row).then((response) => {-->
<!--          this.dialogFormVisible = false-->
<!--          this.successNotifier()-->
<!--          this.getList()-->
<!--        })-->
<!--      }-->

<!--      this.confirmDelete(deleteCallback, cancelCallback)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
