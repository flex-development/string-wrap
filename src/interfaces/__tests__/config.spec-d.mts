/**
 * @file Type Tests - Config
 * @module string-wrap/interfaces/tests/unit-d/Config
 */

import type TestSubject from '#interfaces/config'
import type { Options } from '@flex-development/string-wrap'

describe('unit-d:interfaces/Config', () => {
  it('should extend Options', () => {
    expectTypeOf<TestSubject>().toExtend<Options>()
  })

  it('should match [columns: number | string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('columns')
      .toEqualTypeOf<number | string>()
  })
})
