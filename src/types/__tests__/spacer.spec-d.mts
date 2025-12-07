/**
 * @file Type Tests - Spacer
 * @module string-wrap/types/tests/unit-d/Spacer
 */

import type TestSubject from '#types/spacer'
import type { SpacerFunction } from '@flex-development/string-wrap'

describe('unit-d:types/Spacer', () => {
  it('should extract SpacerFunction', () => {
    expectTypeOf<TestSubject>().extract<SpacerFunction>().not.toBeNever()
  })

  it('should extract number', () => {
    expectTypeOf<TestSubject>().extract<number>().not.toBeNever()
  })

  it('should extract string', () => {
    expectTypeOf<TestSubject>().extract<string>().not.toBeNever()
  })
})
