<template lang="pug">
app-container
  //- template(v-slot:header)
  //-   //- .action-button(v-if='!dialogIsDetail')
  //-   //-   //- el-button.save(size='small' @click="dialogNotCreate ? updateData() : createData()")
  //-   //-   //-   | {{ $t('table.save') }}

  div.back-button
    el-button(size='small', @click="$router.push({name: 'User'})")
      | {{$t('table.back')}}

  el-alert(title='Informasi', description='Tampilan Dibawah Belum Terhubung ke API', type='info', show-icon='', style='font-size:16px')
  el-row
    el-col(:span='8')
      PrivilegesBox(:numOfItem='4')
      PrivilegesBox(:numOfItem='3')
      PrivilegesBox(:numOfItem='2')
    el-col(:span='8')
      PrivilegesBox(:numOfItem='2')
      PrivilegesBox(:numOfItem='5')
      PrivilegesBox(:numOfItem='4')
    el-col(:span='8')
      PrivilegesBox(:numOfItem='7')
      PrivilegesBox(:numOfItem='2')
      PrivilegesBox(:numOfItem='2')

</template>

<script>
// import { fetchGroupMaintanance as fetchRecord, createGroupMaintanance, updateGroupMaintanance } from '@/api/group-maintenance'
// import { requiredValidator } from '@/global-function/formValidator'
import PrivilegesBox from './components/PrivilegesBox'

export default {
  name: 'Privileges',
  components: { PrivilegesBox },
  data() {
    return {
      listLoading: true,
      temp: {
      },
      dialogStatus: 'create',
      rules: {
      }
    }
  },
  computed: {
    // dialogNotCreate() {
    //   return this.dialogStatus !== 'create'
    // },
    // dialogIsDetail() {
    //   return this.dialogStatus === 'detail'
    // }
  },
  created() {
    // this.resetTemp()
    // this.dialogStatus = this.$route.params.action
    // if ('id' in this.$route.query) {
    //   this.temp.id = this.$route.query.id
    //   this.getRecord()
    // }
  },
  methods: {
    // getRecord() {
    //   // fetchRecord(this.temp.id).then(response => {
    //   //   this.temp = response
    //   //   this.listLoading = false
    //   // })
    // },
    // resetTemp() {
    //   this.temp = {
    //   }
    // }
    // updateData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       updateGroupMaintanance(this.temp).then((response) => {
    //         this.dialogFormVisible = false
    //         if (response.status_code >= 200 && response.status_code <= 300) {
    //           this.successNotifier()
    //           this.getRecord()
    //         }
    //       })
    //     }
    //   })
    // }
  }
}
</script>
