<template>
  <div class="dashboard-editor-container">
    <el-alert title="Informasi" description="Grafik dibawah adalah Mock Up UI" type="info" show-icon style="font-size:16px" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#e4e4e4;margin-bottom:32px;" :gutter="32">
      <el-col :span="8">
        <todo-list />
      </el-col>
      <el-col :span="16">
        <div style="background-color: white">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TodoList from './components/TodoList'

const lineChartData = {
  fundData: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    TodoList
  },
  data() {
    return {
      lineChartData: lineChartData.fundData
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
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
