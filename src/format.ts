/**
 * 格式化日期
 * @param date 日期对象、时间戳、标准日期字符串
 * @param formatStr 指定日期格式的字符串，例如 'yyyy-MM-dd', 不传默认值为：'yyyy-MM-dd hh:mm:ss'
 * @example formatDate(new Date(), 'yyyy-MM-dd hh:mm:dd')
 */
export function formatDate(date: any, formatStr = 'yyyy-MM-dd hh:mm:ss') {
  if (date == null || date === '') {
    return ''
  }
  date = new Date(date)
  if (date.toString() === 'Invalid Date') {
    return ''
  }

  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  } as any

  if (/(y+)/.test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(formatStr)) {
      const v = o[k]
      formatStr = formatStr.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? v : ('00' + v).substr(('' + v).length)
      )
    }
  }
  return formatStr
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 * @param num 数值(Number或者String)
 * @param digit 保留小数点几位
 * @return 金额格式的字符串,如'1,234,567.45'
 */
export function formatMoney(num: number | string, digit = 2) {
  num = +num.toString().replace(/\$|,/g, '')
  if (isNaN(num)) {
    num = '0'
  }
  if (typeof digit !== 'number' || digit < 0) {
    digit = 0
  }
  // 最大支持11位小数
  if (digit > 11) {
    return ''
  }
  // 绝对值
  const sign = +num === (num = Math.abs(+num))
  let cents: any = null
  num = Math.floor(num * Math.pow(10, digit) + 0.50000000001)
  if (digit > 0) {
    // 小数位
    cents = num % Math.pow(10, digit)
    cents = ('00000000000' + num).substr(-digit)
  }
  num = Math.floor(num / Math.pow(10, digit)).toString()
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
  }
  if (cents) {
    return (sign ? '' : '-') + num + '.' + cents
  } else {
    return (sign ? '' : '-') + num
  }
}

export default {
  formatDate,
  formatMoney
}
