
<template lang="pug">
div
  .filter-container
    el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
    el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
      | {{ $t('table.add') }}
  el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
    el-table-column(:label="$t('companyContactPerson.name')", align='left', )
      template(slot-scope='scope')
        span {{ scope.row.name }}
    el-table-column(:label="$t('companyContactPerson.type')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.type }}
    el-table-column(:label="$t('companyContactPerson.title')", align='left')
      template(slot-scope='scope')
        span {{ scope.row.title }}
    el-table-column(:label="$t('companyContactPerson.status')", align='left',)
      template(slot-scope='scope')
        span(:class="scope.row.defaultContact ?'label-enable':''")
          | {{ scope.row.defaultContact ? 'Default':'' }}
    el-table-column(label='', align='right', width='150' )
      template(slot-scope='{row}')
        Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
        Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")

  pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

  el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible' append-to-body)
    el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
      el-form-item(:label="$t('companyContactPerson.type')", prop='type')
        el-select(v-model='temp.type', name='type' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in typeOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('companyContactPerson.name')", prop='name')
        el-input(v-model.number='temp.name', name='name' type='input')
      el-form-item(:label="$t('companyContactPerson.title')", prop='title')
        el-input(v-model.number='temp.title', name='title' type='input')
      el-form-item(:label="$t('companyContactPerson.identityType')", prop='identityType')
        el-select(v-model='temp.identityType', name='identityType' placeholder='Select', filterable, default-first-option)
          el-option(v-for='item in identityTypeOptions', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(:label="$t('companyContactPerson.identityNumber')", prop='identityNumber')
        el-input(v-model.number='temp.identityNumber', name='identityNumber' type='input')
      el-form-item(:label="$t('companyContactPerson.gender')" prop='gender')
        el-radio-group(v-model='temp.gender'  name='gender')
          el-radio(label='male') Male
          el-radio(label='female') Female
      el-form-item(:label="$t('companyContactPerson.email')", prop='email')
        el-input(v-model.number='temp.email', name='email' type='input')
      el-form-item(:label="$t('companyContactPerson.phone')", prop='phone')
        el-input(v-model.number='temp.phone', name='phone' type='input')

      el-form-item(:label="$t('companyContactPerson.status')" prop='defaultContact')
        el-switch(v-model='temp.defaultContact' name='defaultContact')
        span.switch-status {{ temp.defaultContact?'Default':'Not Default' }}
    .dialog-footer(slot='footer')
      el-button(@click='dialogFormVisible = false')
        | {{ $t('table.cancel') }}
      el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
        | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, createCompanyContactPerson, updateCompanyContactPerson, deleteCompanyContactPerson } from '@/api/company-contact-person'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { requiredValidator, alphabeticValidator, numberValidator } from '@/global-function/formValidator'

export default {
  name: 'Document',
  components: { Pagination },
  // eslint-disable-next-line
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
        type: undefined,
        title: undefined,
        identityType: undefined,
        identityNumber: undefined,
        gender: undefined,
        email: undefined,
        phone: undefined,
        defaultContact: false
      },
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [requiredValidator, alphabeticValidator],
        type: [requiredValidator],
        title: [requiredValidator, alphabeticValidator],
        identityType: [requiredValidator],
        identityNumber: [requiredValidator, numberValidator],
        gender: [requiredValidator],
        email: [requiredValidator],
        phone: [requiredValidator, numberValidator],
        defaultContact: [requiredValidator]
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
    if (this.data.id) { this.getList() }
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
        type: undefined,
        title: undefined,
        identityType: undefined,
        identityNumber: undefined,
        gender: undefined,
        email: undefined,
        phone: undefined,
        defaultContact: false
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
              this.successNotifier()
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      row['companyId'] = this.data.id
      const cancelCallback = () => this.cancelNotifier()

      const deleteCallback = () => {
        deleteCompanyContactPerson(row).then((response) => {
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
