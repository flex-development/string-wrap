/**
 * @file Type Tests - LinesInfo
 * @module string-wrap/interfaces/tests/unit-d/LinesInfo
 */

import type TestSubject from '#interfaces/lines-info'
import type {
  ColumnsFunction,
  SpacerFunction
} from '@flex-development/string-wrap'

describe('unit-d:interfaces/LinesInfo', () => {
  it('should match [columns: ColumnsFunction<number>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('columns')
      .toEqualTypeOf<ColumnsFunction<number>>()
  })

  it('should match [eol: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('eol').toEqualTypeOf<string>()
  })

  it('should match [indent: SpacerFunction<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('indent')
      .toEqualTypeOf<SpacerFunction<string>>()
  })

  it('should match [lines: readonly string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('lines')
      .toEqualTypeOf<readonly string[]>()
  })

  it('should match [padLeft: SpacerFunction<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('padLeft')
      .toEqualTypeOf<SpacerFunction<string>>()
  })

  it('should match [padRight: SpacerFunction<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('padRight')
      .toEqualTypeOf<SpacerFunction<string>>()
  })
})
