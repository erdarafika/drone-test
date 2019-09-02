
<!--<template lang="pug">-->
<!--  div-->
<!--    .filter-container-->
<!--    el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')-->
<!--      el-table-column(:label="`Employer Contribution`", align='center', )-->
<!--        el-table-column(:label="$t('investmentDirection.fundName')", align='center', v-crud-permission="['maker']")-->
<!--        el-table-column(:label="$t('investmentDirection.percentage')", align='center', v-crud-permission="['maker']")-->
<!--      el-table-column(:label="`Employee Contribution`", align='center', )-->
<!--        el-table-column(:label="$t('investmentDirection.fundName')", align='center', v-crud-permission="['maker']")-->
<!--        el-table-column(:label="$t('investmentDirection.minPercentage')", align='center', v-crud-permission="['maker']")-->
<!--        el-table-column(:label="$t('investmentDirection.maxPercentage')", align='center', v-crud-permission="['maker']")-->
<!--    pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')-->

<!--</template>-->

<!--<script>-->
<!--import { fetchList } from '@/api/group-fee'-->
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
<!--      isDetail: true,-->
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
<!--      if (event === '') {-->
<!--        this.isDetail = false-->
<!--      } else {-->
<!--        this.isDetail = true-->
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
<!--          createGroupInvestmentDirection(this.temp).then((response) => {-->
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
<!--          updateGroupInvestmentDirection(tempData).then((response) => {-->
<!--            this.dialogFormVisible = false-->
<!--            if (response.status_code >= 200 && response.status_code <= 300) {-->
<!--              this.successNotifier()-->
<!--              this.getList()-->
<!--            }-->
<!--          })-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    handleDelete(row) {-->
<!--      row['groupId'] = this.data.id-->
<!--      const cancelCallback = () => this.cancelNotifier()-->

<!--      const deleteCallback = () => {-->
<!--        deleteGroupInvestmentDirection(row).then((response) => {-->
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
