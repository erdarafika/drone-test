<template lang="pug">
app-container
  template(v-slot:header-left)
    Back(:action="back")

  .task-form(v-if='temp.status !== "approved" ')
    el-form(ref='dataForm' :model='temp', label-position='left', label-width='200px' )
      el-form-item
        Reject.pull-right(:data='temp' :callback='handleReject' :disabled='!reason' style='margin-left:10px;')
        Approve.pull-right(:data='temp' :callback='handleApprove')
      el-form-item
        el-alert(title='Rejecting must provide reason', type='info', show-icon='')

      el-form-item(:label="$t('taskManagement.reason')")
        el-input(v-model='reason', type='textarea', :autosize='{ minRows: 2, maxRows: 4}' name='reason')

  el-alert(v-else title='Information', :description='`Status ${temp.status}`' type='success', show-icon='')
  .task-object
    component(:is='object' :objectId='temp.objectId')

</template>

<style lang="scss">
.task-form {
  padding-bottom: 5px;
  border-bottom: 1px solid #489bff59;
  .el-alert {
    padding: 0px 8px;
  }
  .el-form {
    width: 80%;
    margin:auto
  }
}

.task-object {
  .actionButton {
    display: none;
  }
  .add-button {
    display: none;
  }
}
</style>

<script>
import { fetchTask, approveTask, rejectTask } from '@/api/task-management'
import approverCompany from '@/views/client-administration/company/detail'
import approveInvestmentType from '@/views/fund-administration/investment-type/Detail'
import approveUnitPrice from '@/views/fund-administration/unit-price/Detail'
import { camelCase } from 'lodash/string'

export default {
  components: { approverCompany, approveInvestmentType, approveUnitPrice },
  data() {
    return {
      temp: {
        id: undefined,
        objectId: undefined
      },
      reason: undefined,
      object: undefined
    }
  },
  created() {
    if (this.$route.query.hasOwnProperty('id') && this.$route.query.hasOwnProperty('objectId')) {
      this.temp.id = this.$route.query.id
      this.temp.objectId = this.$route.query.objectId
      this.getRecord()
    }
  },
  methods: {
    back() {
      this.$router.push({ name: 'Task' })
    },
    getRecord() {
      fetchTask(this.temp.id).then(res => {
        this.temp = res
        this.object = camelCase(this.temp.taskType)
      })
    },
    handleApprove(row) {
      approveTask(row.id).then((response) => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
          this.back()
        }
      })
    },
    handleReject(row) {
      rejectTask({ id: row.id, reason: this.reason }).then((response) => {
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
          this.back()
        }
      })
    }

  }
}
</script>
