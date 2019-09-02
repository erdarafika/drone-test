
<!--<template lang="pug">-->
<!--  div-->
<!--    .filter-container-->
<!--    el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')-->
<!--      el-table-column(:label="`Fund Type`", align='center', )-->

<!--      el-table-column(:label="`Direction`", align='center', )-->

<!--    pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')-->

<!--</template>-->

<!--<script>-->
<!--import { fetchList, saveMemberInvestmentDirection } from '@/api/member-investment-direction'-->
<!--import Pagination from '@/components/Pagination' // secondary package based on el-pagination-->

<!--export default {-->
<!--  name: 'InvestmentDirection',-->
<!--  components: { Pagination },-->
<!--  props: ['data'],-->
<!--  data() {-->
<!--    return {-->
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
<!--        direction: undefined-->
<!--      },-->
<!--      initialUpdate: false,-->
<!--      dialogFormVisible: false,-->
<!--      dialogStatus: '',-->
<!--      rules: {-->
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
<!--      this.temp.memberId = this.data.id-->
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
<!--        this.list = response-->
<!--        this.total = response.length-->
<!--        this.listLoading = false-->
<!--      })-->
<!--    },-->
<!--    resetTemp() {-->
<!--      this.temp = {-->
<!--        name: undefined,-->
<!--        memberId: this.data.id,-->
<!--        data: []-->
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
<!--          this.temp['memberId'] = this.data.id-->
<!--          saveMemberInvestmentDirection(this.temp).then((response) => {-->
<!--            if (response.status_code >= 200 && response.status_code <= 300) {-->
<!--              this.successNotifier()-->
<!--              this.getList()-->
<!--            }-->
<!--            this.dialogFormVisible = false-->
<!--          })-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
