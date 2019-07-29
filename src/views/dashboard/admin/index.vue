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
          <el-select v-model="selectedDataType" placeholder="Select">
            <el-option
              v-for="item in dataTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      dataTypeOptions: [{ label: 'Last Month', value: 'month' }, { label: 'Last Week', value: 'week' }],
      selectedDataType: 'month',
      unitPriceDate: undefined,
      dateFormat: 'DD-MM-YYYY'
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
      if (dataType === 'month') {
        const date = new Date()
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

        return {
          start: this.$moment(firstDay).format(this.dateFormat),
          end: this.$moment(lastDay).format(this.dateFormat)
        }
      }
      if (dataType === 'week') {
        const end = this.$moment().format(this.dateFormat)
        let start = this.$moment()
        start = start.subtract(7, 'days')
        start = start.format(this.dateFormat)

        return {
          end,
          start
        }
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
