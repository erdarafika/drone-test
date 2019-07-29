<template>
  <div class="dashboard-editor-container">
    <el-alert title="Informasi" description="Grafik dibawah adalah Mock Up UI" type="info" show-icon style="font-size:16px" />

    <panel-group />

    <el-row style="background:#e4e4e4;margin-bottom:32px;" :gutter="32">
      <el-col :span="8">
        <todo-list />
      </el-col>
      <el-col :span="16">
        <div style="background-color: white; padding: 10px;">
          <el-row>
            <el-col :span="18">
              <h2 style="margin-left:20px;color: #636569">Statistik</h2>
            </el-col>
            <el-col :span="6">
              <el-select v-model="selectedDataType" placeholder="Select">
                <el-option
                  v-for="item in dataTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>

          <line-chart :unit-price-date="unitPriceDate" :data-type="selectedDataType" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TodoList from './components/TodoList'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    TodoList
  },
  data() {
    return {
      dataTypeOptions: [{ label: 'Last 6 Month', value: '6month' }, { label: 'Last 3 Month', value: '3month' }, { label: 'Last Month', value: 'month' }, { label: 'Last Week', value: 'week' }],
      selectedDataType: 'month',
      unitPriceDate: undefined
    }
  },
  watch: {
    selectedDataType(val) {
      this.unitPriceDate = this.generateDate(val)
      console.log(this.unitPriceDate)
    }
  },
  created() {
    this.unitPriceDate = this.generateDate(this.selectedDataType)
  },
  methods: {
    generateDate(dataType) {
      const end = this.$moment()
      let start = this.$moment()
      if (dataType === 'month') {
        start = start.subtract(1, 'months')
      }
      if (dataType === 'week') {
        start = start.subtract(7, 'days')
      }
      if (dataType === '3month') {
        start = start.subtract(3, 'months')
      }
      if (dataType === '6month') {
        start = start.subtract(6, 'months')
      }

      return {
        end,
        start
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: #e4e4e4;

  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
