import {
  validatePhoneNumber,
  validateEmail,
  validateIDCard,
  validateBankCard
} from '../src/validate'

describe('validate模块测试', () => {
  describe('验证手机号', () => {
    it('validatePhoneNumber(手机号)', () => {
      expect(validatePhoneNumber('15248110721')).toBeTruthy()
      expect(validatePhoneNumber('168015667s8')).toBeFalsy()
      expect(validatePhoneNumber('1680156678')).toBeFalsy()
    })
  })

  describe('验证邮箱', () => {
    it('validateEmail(邮箱地址)', () => {
      expect(validateEmail('123@qq.com')).toBeTruthy()
      expect(validateEmail('123@xn')).toBeFalsy()
      expect(validateEmail('baidu.com')).toBeFalsy()
    })
  })

  describe('验证身份证', () => {
    it('validateIDCard(身份证号)', () => {
      // 大陆
      expect(validateIDCard('410222198706134038')).toBeTruthy()
      expect(validateIDCard('11204416541220243x')).toBeFalsy()
      // 香港
      expect(validateIDCard('c668668(a)')).toBeTruthy()
      expect(validateIDCard('A123456(0)')).toBeTruthy()
      // 台湾
      expect(validateIDCard('N280988409')).toBeTruthy()
      expect(validateIDCard('N380988409')).toBeFalsy()
      // 澳门
      expect(validateIDCard('1000248(3)')).toBeTruthy()
    })
  })

  describe('验证银行卡', () => {
    expect(validateBankCard('6222600260001072444')).toBeTruthy()
  })
})
