/**
 * 验证手机号码是否正确
 * @param phoneNumber 手机号
 */
export function validatePhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return false
  return /^1[0-9]{10}$/.test(phoneNumber)
}

/**
 * 验证邮箱格式是否正确
 * @param email 邮箱地址
 */
export function validateEmail(email: string) {
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)
}

/**
 * 验证身份证
 * @param IDCard 身份证号
 */
export function validateIDCard(IDCard: string) {
  if (/^[a-zA-Z][0-9]{6}((（|\()[0-9aA](\)|）))$/.test(IDCard)) {
    // 香港
    return true
  }
  if (/^[a-zA-Z][0-9]{9}$/.test(IDCard)) {
    // 台湾
    let genderSex = IDCard.substring(1, 2)
    if (genderSex === '1' || genderSex === '2') {
      return true
    }
    return false
  }
  if (/^[157]\d{6}((（|\()[0-9](\)|）))$/.test(IDCard)) {
    // 澳门
    return true
  }
  if (
    /^[1-9][0-9]{5}(18|19|20)?[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/.test(
      IDCard
    )
  ) {
    // 大陆身份证
    // 18位身份证需要验证最后一位校验位
    const IDCardArr = IDCard.split('')
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    // 校验位
    let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    let ai = 0
    let wi = 0
    for (let i = 0; i < 17; i++) {
      ai = +IDCardArr[i]
      wi = factor[i]
      sum += ai * wi
    }
    let last = parity[sum % 11]
    if (`${last}` !== `${IDCardArr[17]}`.toLocaleUpperCase()) {
      return false
    }
    return true
  }
  return false
}

/**
 * 验证银行卡
 * @param bankCard
 */
export function validateBankCard(bankCard: string) {
  if (!bankCard) return false
  return /^[0-9]{5,25}$/.test(bankCard)
}

export default {
  validatePhoneNumber,
  validateEmail,
  validateIDCard,
  validateBankCard
}
