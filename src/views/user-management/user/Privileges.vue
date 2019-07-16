<template lang="pug">
app-container
  template(v-slot:header-left)
    Back(:action="()=> { $router.push({name: 'User'}) }")
  template(v-slot:header)
    .action-button
      el-button.save(size='small' @click="updateData()")
        | {{ $t('table.save') }}

  el-row(v-loading="loading")
    el-col(:span='8')
      PrivilegesBox(title='Master Setup' parent='master-setup' :options='["checker","","maker"]' :handleChange='handlePrivileges' :privileges='userPrivileges["master-setup"]')
    el-col(:span='8')
      PrivilegesBox(title='DPLK Configuration' parent='dplk-configuration' :options='["checker","","maker"]' :handleChange='handlePrivileges' :privileges='userPrivileges["dplk-configuration"]')
      PrivilegesBox(title='Fund Administration' parent='fund-administration' :options='["checker","approver","maker"]' :handleChange='handlePrivileges' :privileges='userPrivileges["fund-administration"]')
    el-col(:span='8')
      PrivilegesBox(title='Client Administration' parent='client-administration' :options='["checker","approver","maker"]' :handleChange='handlePrivileges' :privileges='userPrivileges["client-administration"]')
      PrivilegesBox(title='User Management' parent='user-maintenance' :options='["checker","","maker"]' :handleChange='handlePrivileges' :privileges='userPrivileges["user-maintenance"]')
      PrivilegesBox.noClick(title='Task Management' parent='task-management' :options='[]' :handleChange='handlePrivileges' :privileges='userPrivileges["task-management"]')
        template(slot='content')
          el-alert(:title="$t('user.taskManagementMessage')" type="info" show-icon)
</template>

<style lang='scss'>
.noClick {
   pointer-events: none;
   .el-alert {
      margin-bottom: 29px;
      background: #9e9e9e !important;
      color: white;
   }
}
</style>

<script>
import PrivilegesBox from './components/PrivilegesBox'
import privileges from './privileges'
import { updateUserPrivileges, fetchRecord } from '@/api/user-management'
import { setTimeout } from 'timers'

export default {
  name: 'Privileges',
  components: { PrivilegesBox },
  data() {
    return {
      userPrivileges: {},
      listLoading: true,
      id: undefined,
      dialogStatus: 'create',
      loading: true
    }
  },
  created() {
    this.userPrivileges = JSON.parse(JSON.stringify(privileges))
    setTimeout(() => {
      this.loading = false
    }, 2000)
    if ('id' in this.$route.query) {
      this.id = this.$route.query.id
      this.getRecord()
    }
  },
  methods: {
    handlePrivileges({ parent, menu, index, value }) {
      this.userPrivileges[parent][index].privilege = value
      this.userPrivileges['task-management'][0].menuChecked = Object.keys(this.userPrivileges).some(menu => {
        return this.userPrivileges[menu].some(subMenu => subMenu.privilege.includes('approver'))
      })
    },
    updateData() {
      const userPrivilegesValues = Object.values(this.userPrivileges)
      let allMenusPrivileges = userPrivilegesValues.flatMap(item => item)
      allMenusPrivileges = allMenusPrivileges.filter(item => item.menuChecked)
      allMenusPrivileges = allMenusPrivileges.map(item => ({ menu: item.menu, previleges: item.privilege }))
      const payload = { data: allMenusPrivileges, id: this.id }
      // if (Object.values(payload.data).some(menu => menu.previleges.includes('approver'))) {
      //   payload.data.push({
      //     menu: 'task-management',
      //     previleges: ['maker']
      //   })
      // }
      updateUserPrivileges(payload).then((response) => {
        this.dialogFormVisible = false
        if (response.status_code >= 200 && response.status_code <= 300) {
          this.successNotifier()
        }
      })
    },
    getRecord() {
      fetchRecord(this.id).then(response => {
        const filterredPrevileges = response.authorities.map(item => ({ menu: item.menu, previleges: item.previleges.flatMap(item => item.previlege) }))
        let objectFilterredPrevileges = {}
        objectFilterredPrevileges = filterredPrevileges.reduce((obj, item) => {
          obj[item.menu] = item
          return obj
        }, {})

        const userPrivilegesKey = Object.keys(this.userPrivileges)

        userPrivilegesKey.forEach(parent => {
          this.userPrivileges[parent] = this.userPrivileges[parent].map(item => {
            if (objectFilterredPrevileges.hasOwnProperty(item.menu)) {
              if (objectFilterredPrevileges[item.menu].previleges.length) { item.menuChecked = true }
              item.privilege = objectFilterredPrevileges[item.menu].previleges
            }
            return item
          })
        })
      })
    }
  }
}
</script>
