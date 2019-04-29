<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.type" prefix-icon="el-icon-search" :placeholder="$t('table.searchPlaceholder')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.isMemberAddress" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in isMemberAddressOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.isCompanyAddress" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in isCompanyAddressOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button> -->

      <el-button class="filter-item add-button" style="margin-left: 10px;float:right" type="primary" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!-- <el-table-column :label="`ID`" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('addressType.type')" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('addressType.displayOnMember')" prop="id" align="left" width="180">
        <template slot-scope="scope">
          <el-button :type="getStatusStyle(scope.row.isMemberAddress)" size="mini">
            {{ scope.row.isMemberAddress? 'Enable': 'Disable' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('addressType.displayOnCompany')" prop="id" align="left" width="190">
        <template slot-scope="scope">
          <el-button :type="getStatusStyle(scope.row.isCompanyAddress)" size="mini">
            {{ scope.row.isCompanyAddress? 'Enable': 'Disable' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.createdDate')" prop="id" sortable="custom" align="left" width="200">
        <!-- {{ randomDate() | moment("Do MMMM, YYYY") }} -->
        <template slot-scope="scope">
          {{ scope.row.createdDate | moment("Do MMMM, YYYY") }}
        </template>
      </el-table-column>
      <el-table-column :label="``" align="right" class-name="small-padding fixed-width" width="100">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <!-- <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">

        <el-form-item :label="$t('addressType.type')" prop="title">
          <el-input v-model="temp.type" />
        </el-form-item>

        <el-form-item :label="$t('addressType.displayOnMember')">
          <el-select v-model="temp.isMemberAddress" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('addressType.displayOnCompany')">
          <el-select v-model="temp.isCompanyAddress" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel  " />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createAddressType, updateAddressType } from '@/api/address-type'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AddressType',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        type: undefined,
        isMemberAddress: undefined,
        isCompanyAddress: undefined,
        sort: '+id'
      },
      statusOptions: [{ value: true, label: ' Enable' }, { value: false, label: ' Disable' }],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      isMemberAddressOptions: [{ label: 'Enable Display on Member', key: true }, { label: 'Disable Display on Member', key: false }],
      isCompanyAddressOptions: [{ label: 'Enable Display on Company', key: true }, { label: 'Disable Display on Company', key: false }],
      temp: {
        id: undefined,
        type: '',
        isMemberAddress: true,
        isCompanyAddress: true,
        isActive: undefined
      },
      showActive: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
    console.log('mm', this.randomDate())
  },
  methods: {
    randomDate() {
      const start = new Date(2012, 0, 1); const end = new Date()
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    },
    getStatusStyle(status) {
      return status ? 'success' : 'danger'
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        console.log(this.list)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
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
        console.log('valid', valid)
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.isActive = true
          createAddressType(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
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
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateAddressType(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('table.successTitle'),
              message: this.$t('table.successCaption'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: this.$t('table.successTitle'),
        message: this.$t('table.successCaption'),
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    }
  }
}
</script>
