/**
 * @file Type Tests - SpacerFunction
 * @module string-wrap/types/tests/unit-d/SpacerFunction
 */

import type TestSubject from '#types/spacer-function'

describe('unit-d:types/SpacerFunction', () => {
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
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<number | string | null | undefined>()
    })
  })
})
