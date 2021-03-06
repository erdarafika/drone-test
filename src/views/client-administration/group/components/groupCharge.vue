
<template lang="pug">
div
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('classPlan.name')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('classPlan.isPercentage')", align='left',)
      template(slot-scope='scope')
        span(:class="scope.row.isPercentage ?'label-enable':''")
          | {{ scope.row.isPercentage ? 'Yes':'No' }}
    el-table-column(:label="$t('classPlan.employee')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.employee }}
    el-table-column(:label="$t('classPlan.employer')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.employer }}
    el-table-column(label='', align='right', width='150' )
      template(slot-scope='{row}')
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")
  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible' append-to-body)
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('classPlan.name')", prop='name')
        el-input(v-model.number='temp.name', name='name' type='input')
      el-form-item(:label="$t('classPlan.employee')", prop='employee')
        el-input-number(v-model.number='temp.employee', name='employee' type='input')
      el-form-item(:label="$t('classPlan.employer')", prop='employer')
        el-input-number(v-model.number='temp.employer', name='employer' type='input')
      el-form-item(:label="$t('classPlan.isPercentage')" prop='isPercentage')
        el-switch(v-model='temp.isPercentage' name='isPercentage')
        span.switch-status {{ temp.isPercentage?'Yes':'No' }}
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createGroupClassPlan, updateGroupClassPlan, deleteGroupClassPlan } from '@/api/group-class-plan'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { requiredValidator } from '@/global-function/formValidator'

export default {
  name: 'Document',
  components: { Pagination },
  props: ['data'],
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      temp: {
        name: undefined,
        groupId: undefined,
        isPercentage: undefined,
        employee: 0,
        employer: 0
      },
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [requiredValidator],
        groupId: [requiredValidator],
        isPercentage: [requiredValidator],
        employee: [requiredValidator],
        employer: [requiredValidator]
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
      this.temp.groupId = this.data.id
    }
  },
  methods: {
    getDialogHeader(dialogStatus) {
      if (dialogStatus === 'update') {
        return this.$t('modal.editModalHeader')
      } else {
        return this.$t('modal.addModalHeader')
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.data.id).then(response => {
        console.log(response)

        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        groupId: this.data.id,
        isPercentage: undefined,
        employee: 0,
        employer: 0
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp['companyId'] = this.data.id
          createGroupClassPlan(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = {
        id: row.id,
        name: row.name,
        groupId: this.data.id,
        isPercentage: row.isPercentage,
        employee: row.employee,
        employer: row.employer
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
          const tempData = Object.assign({}, this.temp)
          updateGroupClassPlan(tempData).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      row['groupId'] = this.data.id
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteGroupClassPlan(row).then((response) => {
          this.dialogFormVisible = false
          this.successNotifier()
          this.getList()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>
