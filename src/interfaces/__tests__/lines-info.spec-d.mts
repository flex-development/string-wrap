/**
 * @file Type Tests - LinesInfo
 * @module string-wrap/interfaces/tests/unit-d/LinesInfo
 */

import type TestSubject from '#interfaces/lines-info'
import type { LinePadding } from '@flex-development/string-wrap'

describe('unit-d:interfaces/LinesInfo', () => {
  it('should match [eol: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('eol').toEqualTypeOf<string>()
  })

  it('should match [indent: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('indent').toEqualTypeOf<string>()
  })

  it('should match [lines: readonly string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('lines')
      .toEqualTypeOf<readonly string[]>()
  })

  it('should match [padding: LinePadding]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('padding')
      .toEqualTypeOf<LinePadding>()
  })
})
