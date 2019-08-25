import { uuid } from '../src/uuid'

describe('uuid', function() {
  it('类型测试', function() {
    const id = uuid()
    expect(typeof id).toStrictEqual('string')
  })

  it('类型测试', function() {
    const id = uuid()
    expect(/^[0-9A-Z]{8}-[0-9A-Z]{4}-4[0-9A-Z]{3}-[0-9A-Z]{4}-[0-9A-Z]{12}$/.test(id)).toBeTruthy()
  })

  it('多次不相等测试', function() {
    let i = 20
    while (i--) {
      expect(uuid()).not.toStrictEqual(uuid())
    }
  })
})
