
<template lang="pug">
.app-container
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate')
      | {{ $t('table.add') }}
    //- classPlan: {
    //-   name: 'Name',
    //-   groupId: 'Group',
    //-   isPercentage: 'Using Percentage',
    //-   employee: 'Employee',
    //-   employer: 'Employer'
    //- }
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('classPlan.name')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('classPlan.groupId')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.group.id }}
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
        el-button(type='primary', size='mini', @click='handleUpdate(row)' )
          | {{ $t('table.edit') }}
        el-button(type='danger', size='mini', @click='handleDelete(row)' )
          | {{ $t('table.delete') }}

  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible' append-to-body)
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      //- el-form-item(:label="$t('classPlan.name')", prop='name')
      //-   el-input(v-model.number='temp.name', type='input')
      //- el-form-item(:label="$t('classPlan.title')", prop='title')
      //-   el-input(v-model.number='temp.title', type='input')
      //- el-form-item(:label="$t('classPlan.email')", prop='email')
      //-   el-input(v-model.number='temp.email', type='input')
      //- el-form-item(:label="$t('classPlan.phone')", prop='phone')
      //-   el-input(v-model.number='temp.phone', type='input')
      //- el-form-item(:label="$t('classPlan.type')", prop='type')
      //-   el-select(v-model='temp.type', placeholder='Select', filterable, default-first-option)
      //-     el-option(v-for='item in typeOptions', :key='item.value', :label='item.label', :value='item.value')
      //- el-form-item(:label="$t('classPlan.identityType')", prop='identityType')
      //-   el-select(v-model='temp.identityType', placeholder='Select', filterable, default-first-option)
      //-     el-option(v-for='item in identityTypeOptions', :key='item.value', :label='item.label', :value='item.value')
      //- el-form-item(:label="$t('classPlan.identityNumber')", prop='identityNumber')
      //-   el-input(v-model.number='temp.identityNumber', type='input')

      //- el-form-item(:label="$t('classPlan.gender')" prop='gender')
      //-   el-radio-group(v-model='temp.gender')
      //-     el-radio(label='male') Male
      //-     el-radio(label='female') Female

      //- el-form-item(:label="$t('classPlan.status')" prop='defaultContact')
      //-   el-switch(v-model='temp.defaultContact')
      //-   span.switch-status {{ temp.defaultContact?'Default':'Not Default' }}
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createCompanyContactPerson, updateCompanyContactPerson, deleteCompanyContactPerson } from '@/api/company-contact-person'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
      typeOptions: [{ label: 'PERSON IN CHARGE', value: 'pic' }, { label: 'CORRESPONDENCE', value: 'correspondence' }, { label: 'PAYOR', value: 'payor' }, { label: 'DIRECTOR', value: 'director' }],
      identityTypeOptions: [{ label: 'Identity Card', value: 'ktp' }, { label: 'Driving License', value: 'sim' }, { label: 'Passport', value: 'passport' }, { label: 'Kitas', value: 'kitas' }],
      temp: {
        name: undefined,
        groupId: undefined,
        isPercentage: undefined,
        employee: undefined,
        employer: undefined
      },
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: 'This field is required' }],
        groupId: [{ required: true, message: 'This field is required' }],
        isPercentage: [{ required: true, message: 'This field is required' }],
        employee: [{ required: true, message: 'This field is required' }],
        employer: undefined
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
    if (this.data.id !== undefined) {
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

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        name: undefined,
        groupId: this.data.id,
        isPercentage: undefined,
        employee: undefined,
        employer: undefined
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
          createCompanyContactPerson(this.temp).then((response) => {
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = {
        companyId: this.data.id,
        id: row.id,
        name: row.name,
        type: row.type,
        title: row.title,
        identityType: row.identityType,
        identityNumber: row.identityNumber,
        gender: row.gender,
        email: row.email,
        phone: row.phone,
        defaultContact: row.defaultContact
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
          updateCompanyContactPerson(tempData).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.$notify({
                title: this.$t('table.successTitle'),
                message: this.$t('table.successCaption'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      row['companyId'] = this.data.id
      const cancelCallback = () => this.$notify({
        title: this.$t('table.cancelTitle'),
        message: this.$t('table.cancelCaption'),
        type: 'warning',
        duration: 2000
      })

      const deleteCallback = () => {
        deleteCompanyContactPerson(row).then((response) => {
          this.dialogFormVisible = false
          this.$notify({
            title: this.$t('table.successTitle'),
            message: this.$t('table.successCaption'),
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }

      this.confirmDelete(deleteCallback, cancelCallback)
    }
  }
}
</script>
