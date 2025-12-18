/**
 * @file Type Tests - ColumnsFunction
 * @module string-wrap/types/tests/unit-d/ColumnsFunction
 */

import type TestSubject from '#types/columns-function'

describe('unit-d:types/ColumnsFunction', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [number, (readonly string[] | null | undefined)?]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[number, (readonly string[] | null | undefined)?]>()
    })
  })

  describe('returns', () => {
    it('should return T', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<number | string>()
    })
  })
})
