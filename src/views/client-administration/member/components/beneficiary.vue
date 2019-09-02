
<template lang="pug">
  div
    .filter-container
      el-input.filter-item(v-model='listQuery.q', prefix-icon='el-icon-search', :placeholder="$t('table.searchPlaceholder')", style='width: 200px;')
      el-button.filter-item.add-button(style='margin-left: 10px;float:right', type='primary', @click='handleCreate' v-crud-permission="['maker']")
        | {{ $t('table.add') }}
    el-table(:key='tableKey', v-loading='listLoading', :data='filterredList', fit='', highlight-current-row='', style='width: 100%;')
      el-table-column(:label="$t('beneficiary.name')", align='left', )
        template(slot-scope='scope')
          span {{ scope.row.name }}
      el-table-column(:label="$t('beneficiary.relation')", align='center',)
        template(slot-scope='scope')
          span {{ scope.row.relation }}
      el-table-column(:label="$t('beneficiary.address')", align='center',)
        template(slot-scope='scope')
          span {{ scope.row.address }}
      el-table-column(label='', align='right', width='150' )
        template(slot-scope='{row}')
          Edit(:data='row' :action='handleUpdate' v-crud-permission="['maker']")
          //Delete(:data='row' :action='handleDelete' v-crud-permission="['maker']")
    pagination(v-show='total>0', :total='total', :page.sync='listQuery.page', :limit.sync='listQuery.limit', @pagination='getList')

    el-dialog(:title='getDialogHeader(dialogStatus)', :visible.sync='dialogFormVisible' append-to-body)
      el-form(ref='dataForm', :rules='rules', :model='temp', label-position='left', label-width='200px', style='width: 80%; margin-left:50px;')
        el-form-item(:label="$t('beneficiary.name')" prop='name')
          el-input(v-model='temp.name', name='name' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
        el-form-item(:label="$t('beneficiary.address')" prop='address')
          el-input(v-model='temp.address', name='address' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
        el-form-item(:label="$t('beneficiary.relation')" prop='relation')
          el-input(v-model='temp.relation', name='relation' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
        el-form-item(:label="$t('beneficiary.birthDate')" prop='dateOfBirth')
          el-date-picker(:value-format='dateFormat' v-model='temp.dateOfBirth', name='dateOfBirth' type='date', placeholder='Pick a date' :disabled='dialogIsDetail' )
        el-form-item(:label="$t('beneficiary.gender')" prop='gender')
          el-radio-group(v-model='temp.gender' name='gender')
            el-radio(label='male') Male
            el-radio(label='female') Female
        el-form-item(:label="$t('beneficiary.birthPlace')" prop='dobPlace')
          el-input(v-model='temp.dobPlace', name='dobPlace' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
        el-form-item(:label="$t('beneficiary.nationality')" prop='nationality')
          el-radio-group(v-model='temp.nationality' name='nationality')
            el-radio(label='WNI') WNI
            el-radio(label='WNA') WNA
        el-form-item(:label="$t('beneficiary.identityType')" prop='identityType')
          el-select(v-model='temp.identityType', name='identityType' placeholder='Select', filterable, default-first-option :disabled='dialogIsDetail')
            el-option(v-for='item in identityTypeOptions', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(:label="$t('beneficiary.identityNumber')" prop='identityNumber')
          el-input(v-model='temp.identityNumber', name='identityNumber' type='textarea', :autosize='{ minRows: 1, maxRows: 2}' :disabled='dialogIsDetail' )
      .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false')
          | {{ $t('table.cancel') }}
        el-button(type='primary', @click="dialogStatus==='create'?createData():updateData()")
          | {{ $t('table.confirm') }}

</template>

<script>
import { fetchList, saveMemberBeneficiary, updateMemberBeneficiary } from '@/api/member-beneficiary'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { requiredValidator, numberValidator, alphabeticValidator } from '@/global-function/formValidator'

export default {
  name: 'Beneficiary',
  components: { Pagination },
  // eslint-disable-next-line
    props: ['data'],
  data() {
    return {
      dateFormat: 'dd-MM-yyyy',
      momentDateFormat: 'DD-MM-YYYY',
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      identityTypeOptions: [
        { label: 'SIM', value: 'SIM' },
        { label: 'KITAS', value: 'KITAS' },
        { label: 'PASSPORT', value: 'PASSPORT' },
        { label: 'KTP', value: 'KTP' }
      ],
      listQuery: {
        page: 1,
        limit: 20
      },
      temp: {
        dateOfBirth: undefined,
        dobPlace: undefined,
        gender: undefined,
        identityNumber: undefined,
        identityType: undefined,
        memberId: undefined,
        name: undefined,
        nationality: undefined,
        relation: undefined,
        address: undefined
      },
      initialUpdate: false,
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [requiredValidator, alphabeticValidator],
        relation: [requiredValidator, alphabeticValidator],
        dobPlace: [requiredValidator, alphabeticValidator],
        dateOfBirth: [requiredValidator],
        identityNumber: [requiredValidator, numberValidator],
        address: [requiredValidator],
        nationality: [requiredValidator],
        gender: [requiredValidator],
        identityType: [requiredValidator]
      }
    }
  },
  computed: {
    filterredList() {
      const { q, limit, page } = this.listQuery
      const listAfterSearch = this.list.filter(data => !q || data.name.toLowerCase().includes(q.toLowerCase()))
      const listAfterPagination = listAfterSearch.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return listAfterPagination
    },
    dialogNotCreate() {
      return this.dialogStatus !== 'create'
    },
    dialogIsDetail() {
      return this.dialogStatus === 'detail'
    }
  },
  created() {
    if (this.data.id) {
      this.getList()
      this.temp.groupId = this.data.id
    }
  },
  methods: {
    reFormatDate(date) {
      if (!date) { return null }
      return this.$moment(date).format(this.momentDateFormat)
    },
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
        response.dateOfBirth = this.reFormatDate(response.dateOfBirth)
        this.list = response
        this.total = response.length
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        name: undefined
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
          this.temp['memberId'] = this.data.id
          saveMemberBeneficiary(this.temp).then((response) => {
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
        memberId: this.data.id,
        dateOfBirth: row.dateOfBirth,
        dobPlace: row.dobPlace,
        gender: row.gender,
        identityNumber: row.identityNumber,
        identityType: row.identityType,
        nationality: row.nationality,
        relation: row.relation,
        address: row.address
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
          updateMemberBeneficiary(tempData).then((response) => {
            this.dialogFormVisible = false
            if (response.status_code >= 200 && response.status_code <= 300) {
              this.successNotifier()
              this.getList()
            }
          })
        }
      })
    }
  }
}
</script>
