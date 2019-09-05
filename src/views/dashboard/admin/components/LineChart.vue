<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { fetchUnitPriceData } from '@/api/dashboard'
import { generateSeries } from './lineChartType'

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
    'unitPriceDate': {
      type: Object
    },
    'dataType': {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      chartData: undefined,
      xAxis: undefined,
      requestDateFormat: 'DD-MM-YYYY',
      chartDateFormat: 'DD-MM-YYYY'
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
    getXAxis() {
      const itr = this.$moment.twix(this.unitPriceDate.start, this.unitPriceDate.end).iterate('days')
      const range = []
      while (itr.hasNext()) {
        range.push(this.$moment(itr.next().toDate()).format(this.chartDateFormat))
      }

      return range
    },
    getData() {
      this.xAxis = this.getXAxis()

      const start = this.unitPriceDate.start.format(this.requestDateFormat)
      const end = this.unitPriceDate.end.format(this.requestDateFormat)
      fetchUnitPriceData({ start, end }).then(res => {
        delete res.status_code
        const legend = Object.keys(res)
        const chartData = legend.reduce((acc, cur) => ({ ...acc, [cur]: [] }), {})
        const tempChartData = JSON.parse(JSON.stringify(chartData))

        for (const key in res) {
          chartData[key] = Object.values(res[key].map(unitPrice => {
            unitPrice.effectiveDate = this.$moment(unitPrice.effectiveDate).format(this.chartDateFormat)
            return { date: unitPrice.effectiveDate, price: unitPrice.price }
          }))
          chartData[key] = chartData[key].reduce((acc, cur) => ({ ...acc, [cur.date]: cur.price }), {})
          tempChartData[key] = this.xAxis.map(item => {
            let value = 0
            if (chartData[key].hasOwnProperty(item)) {
              value = chartData[key][item]
            }
            return [item, value]
          })
        }
        console.log(tempChartData)
        this.chartData = tempChartData
      })
    },
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions(data) {
      const series = []
      for (const key in data) {
        const value = data[key].map(item => item[1])

        series.push(generateSeries(key, value))
      }

      const xAxisData = this.xAxis

      this.chart.setOption({
        xAxis: {
          data: xAxisData
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{}, {
          type: 'inside'
        }],
        yAxis: {
          splitLine: {
            show: false
          }
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          top: 'middle'
        },
        series
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      // this.setOptions(this.chartData)
    }
  }
}
</script>
