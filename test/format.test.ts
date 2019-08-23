import utils from '../src/index'

describe('format模块测试', () => {
  describe('格式化时间', () => {
    const date = new Date(2019, 7, 23)
    it('formatDate(日期对象)', () => {
      expect(utils.formatDate(date)).toEqual('2019-08-23 00:00:00')
    })

    it('formatDate(时间戳)', () => {
      expect(utils.formatDate(1566541117468)).toEqual('2019-08-23 14:18:37')
    })

    it('formatDate(时间标准时间字符串)', () => {
      expect(utils.formatDate('2019-08-23T23:59:59+08:00')).toEqual('2019-08-23 23:59:59')
    })

    it('formatDate(null、undefined或者空字符串)', () => {
      expect(utils.formatDate(null)).toEqual('')
      expect(utils.formatDate(undefined)).toEqual('')
      expect(utils.formatDate('')).toEqual('')
    })

    it('formatDate(日期对象, formatString)', () => {
      expect(utils.formatDate(date, 'yyyy-MM-dd')).toEqual('2019-08-23')
      expect(utils.formatDate(date, 'yyyy-M-d h:m:s')).toEqual('2019-8-23 0:0:0')
      expect(utils.formatDate(date, 'yy/MM/dd hh:mm:ss')).toEqual('19/08/23 00:00:00')
    })
  })

  describe('格式化金钱', () => {
    it('formatMoney(数字)', () => {
      expect(utils.formatMoney(1000)).toEqual('1,000.00')
    })
    it(`formatMoney('字符串')`, () => {
      expect(utils.formatMoney('1000')).toEqual('1,000.00')
    })
    it(`默认保留2位小数 formatMoney(1500.567)`, () => {
      expect(utils.formatMoney('1500.567')).toEqual('1,500.57')
    })
    it(`自定义保留1位小数 formatMoney(1500.567)`, () => {
      expect(utils.formatMoney('1500.567', 1)).toEqual('1,500.6')
    })
    it(`异常值返回 0.00 formatMoney('1500.567a')`, () => {
      expect(utils.formatMoney('1500.567a')).toEqual('0.00')
      expect(utils.formatMoney('')).toEqual('0.00')
      expect(utils.formatMoney('abc')).toEqual('0.00')
    })
  })
})
