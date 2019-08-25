import { resolveQuery, stringifyQuery } from '../src/query'
// https://jestjs.io/docs/en/expect.html

describe('Query utils', () => {
  describe('resolveQuery', () => {
    it('should work', () => {
      const query = resolveQuery('foo=bar&foo=k', { baz: 'qux' })
      expect(JSON.stringify(query)).toBe(
        JSON.stringify({
          foo: ['bar', 'k'],
          baz: 'qux'
        })
      )

      expect(resolveQuery()).toEqual({})
    })

    it('将空参数转成null', () => {
      expect(resolveQuery('?foo&bar=&arr=1&arr&arr=2')).toEqual({
        foo: null,
        bar: '',
        arr: ['1', null, '2']
      })
    })
  })

  describe('stringifyQuery', () => {
    it('should work', () => {
      expect(
        stringifyQuery({
          foo: 'bar',
          baz: 'qux',
          arr: [1, 2]
        })
      ).toBe('?foo=bar&baz=qux&arr=1&arr=2')
    })

    it('过滤对象和数组里掉值为undefined的属性', () => {
      expect(
        stringifyQuery({
          foo: undefined,
          arr: [1, undefined, 3]
        })
      ).toBe('?arr=1&arr=3')
    })

    it('值为null时保留属性名', () => {
      expect(
        stringifyQuery({
          foo: null,
          bar: '',
          arr: [1, null, 3]
        })
      ).toBe('?foo&bar=&arr=1&arr&arr=3')
    })

    it('支持特殊字符', () => {
      expect(
        stringifyQuery({
          a: '*()!'
        })
      ).toBe('?a=%2a%28%29%21')
    })

    it('保留逗号', () => {
      expect(
        stringifyQuery({
          list: '1,2,3'
        })
      ).toBe('?list=1,2,3')
    })
  })
})
