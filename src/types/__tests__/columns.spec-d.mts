/**
 * @file Type Tests - Columns
 * @module string-wrap/types/tests/unit-d/Columns
 */

import type TestSubject from '#types/columns'
import type { ColumnsFunction } from '@flex-development/string-wrap'

describe('unit-d:types/Columns', () => {
  it('should extract ColumnsFunction', () => {
    expectTypeOf<TestSubject>().extract<ColumnsFunction>().not.toBeNever()
  })

  it('should extract number', () => {
    expectTypeOf<TestSubject>().extract<number>().not.toBeNever()
  })

  it('should extract string', () => {
    expectTypeOf<TestSubject>().extract<string>().not.toBeNever()
  })
})
