/**
 * @file Type Tests - LinePadding
 * @module string-wrap/types/tests/unit-d/LinePadding
 */

import type TestSubject from '#types/line-padding'

describe('unit-d:types/LinePadding', () => {
  it('should equal [string, string]', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<[string, string]>()
  })
})
