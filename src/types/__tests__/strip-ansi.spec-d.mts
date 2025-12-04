/**
 * @file Type Tests - StripAnsi
 * @module string-wrap/types/tests/unit-d/StripAnsi
 */

import type TestSubject from '#types/strip-ansi'

describe('unit-d:types/StripAnsi', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [string]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[string]>()
    })
  })

  describe('returns', () => {
    it('should return string', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<string>()
    })
  })
})
