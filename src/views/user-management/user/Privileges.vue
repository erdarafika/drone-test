<template lang="pug">
app-container
  template(v-slot:header-left)
    Back(:action="()=> { $router.push({name: 'User'}) }")
  template(v-slot:header)
    .action-button
      el-button.save(size='small' @click="updateData()")
        | {{ $t('table.save') }}

  el-row
    el-col(:span='8')
      PrivilegesBox(title='Master Setup' parent='master-setup' :handleChange='handlePrivileges' :privileges='userPrivileges["master-setup"]')
    el-col(:span='8')
      PrivilegesBox(title='DPLK Configuration' parent='dplk-configuration' :handleChange='handlePrivileges' :privileges='userPrivileges["dplk-configuration"]')
      PrivilegesBox(title='Fund Administration' parent='fund-administration' :handleChange='handlePrivileges' :privileges='userPrivileges["fund-administration"]')
    el-col(:span='8')
      PrivilegesBox(title='Client Administration' parent='client-administration' :handleChange='handlePrivileges' :privileges='userPrivileges["client-administration"]')

</template>

<script>
import PrivilegesBox from './components/PrivilegesBox'
import privileges from './privileges'
import { updateUserPrivileges } from '@/api/user-management'

export default {
  name: 'Privileges',
  components: { PrivilegesBox },
  data() {
    return {
      userPrivileges: privileges,
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
    handlePrivileges({ parent, menu, index, value }) {
      this.userPrivileges[parent][index].privilege = value
    },
    updateData() {
      const userPrivilegesValues = Object.values(this.userPrivileges)
      let allMenusPrivileges = userPrivilegesValues.flatMap(item => item)
      allMenusPrivileges = allMenusPrivileges.filter(item => item.menuChecked)
      allMenusPrivileges = allMenusPrivileges.map(item => ({ menu: item.menu, previleges: [item.privilege] }))
      const payload = { data: allMenusPrivileges, id: this.$route.query.id }

      updateUserPrivileges(payload).then((response) => {
        this.dialogFormVisible = false
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
          // this.getRecord()
        }
      })
    }
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
