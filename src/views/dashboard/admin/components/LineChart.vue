<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { fetchUnitPriceData } from '@/api/dashboard'
import { getXAxis, generateSeries } from './lineChartType'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    unitPriceDate: {
      type: Object
    },
    dataType: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      chartData: undefined,
      xAxis: undefined
    }
  },
  computed: {
    lang() {
      return 'id'
      // return this.$store.getters.language
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    dataType() {
      this.getData()
    }

  },
  created() {
    this.getData()
  },
  mounted() {
    // this.$nextTick(function(){
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getData() {
      this.xAxis = getXAxis(this.dataType, this.lang)
      fetchUnitPriceData(this.unitPriceDate).then(res => {
        delete res.status_code
        const legend = Object.keys(res)
        const chartData = legend.reduce((acc, cur) => ({ ...acc, [cur]: [] }), {})
        const chartDataToFill = legend.reduce((acc, cur) => ({ ...acc, [cur]: [] }), {})

        for (const key in res) {
          chartData[key] = Object.values(res[key].map(unitPrice => {
            unitPrice.effectiveDate = this.reformatDate(unitPrice.effectiveDate)
            return unitPrice
          }))

          chartDataToFill[key] = this.xAxis.reduce((acc, cur) => ({ ...acc, [cur]: [] }), {})
          for (const xAxis in chartDataToFill[key]) {
            chartDataToFill[key][xAxis] = chartData[key].filter(item => item.effectiveDate === xAxis).length
          }
          chartDataToFill[key] = Object.values(chartDataToFill[key])
        }

        console.log(chartData, chartDataToFill)
        this.chartData = chartDataToFill
      })
    },
    reformatDate(date) {
      const dataType = this.dataType
      if (dataType === 'week') {
        return this.$moment(date).format('dddd')
      }
      if (dataType === 'month') {
        const momentDate = this.$moment(date)
        var nthOfMoth = Math.ceil(momentDate.date() / 7) // 1
        return `Minggu ${nthOfMoth}`
      }
    },
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions(data) {
      const series = []
      for (const key in data) {
        series.push(generateSeries(key, data[key]))
      }

      this.chart.setOption({
        xAxis: {
          data: this.xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 20,
          right: 120,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          top: 'middle',
          padding: 10
        },
        series
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
