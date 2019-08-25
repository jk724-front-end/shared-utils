/**
 * 生成32的字符串，每一位都是随机的16进制数，重复的概率是1/(16^32)
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0
      let v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    .toUpperCase()
}
