/**
 * @file Type Tests - Options
 * @module string-wrap/interfaces/tests/unit-d/Options
 */

import type TestSubject from '#interfaces/options'
import type { OptionalKeys } from '@flex-development/tutils'

describe('unit-d:interfaces/Options', () => {
  it('should have all optional keys', () => {
    expectTypeOf<OptionalKeys<TestSubject>>().toEqualTypeOf<keyof TestSubject>()
  })
})
