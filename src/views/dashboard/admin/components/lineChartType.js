export function generateSeries(key, value) {
  return {
    name: key,
    itemStyle: {
      normal: {
        areaStyle: {
          opacity: 0.2
        }
      }
    },
    type: 'line',
    data: value
  }
}
