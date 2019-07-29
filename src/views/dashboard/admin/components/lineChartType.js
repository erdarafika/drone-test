
const week = {
  id: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

const month = {
  id: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5'],
  en: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
}

export function getXAxis(key, lang) {
  if (key === 'week') {
    return week[lang]
  }
  if (key === 'month') {
    return month[lang]
  }
}

export function generateSeries(key, value) {
  return {
    name: key,
    itemStyle: {
      normal: {
        areaStyle: {
          opacity: 0.2
        },
        lineStyle: {}
      }
    },
    smooth: true,
    type: 'line',
    data: value,
    animationDuration: 2800,
    animationEasing: 'cubicInOut'
  }
}
