/**
 * @file Type Tests - Options
 * @module string-wrap/interfaces/tests/unit-d/Options
 */

import type TestSubject from '#interfaces/options'
import type { StripAnsi, ToString } from '@flex-development/string-wrap'
import type { Nilable, OptionalKeys } from '@flex-development/tutils'

describe('unit-d:interfaces/Options', () => {
  it('should have all optional keys', () => {
    expectTypeOf<OptionalKeys<TestSubject>>().toEqualTypeOf<keyof TestSubject>()
  })

  it('should match [eol?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('eol')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [fill?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fill')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [hard?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('hard')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [indent?: number | string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('indent')
      .toEqualTypeOf<Nilable<number | string>>()
  })

  it('should match [padLeft?: number | string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('padLeft')
      .toEqualTypeOf<Nilable<number | string>>()
  })

  it('should match [padRight?: number | string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('padRight')
      .toEqualTypeOf<Nilable<number | string>>()
  })

  it('should match [stringify?: ToString | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('stringify')
      .toEqualTypeOf<Nilable<ToString>>()
  })

  it('should match [stripAnsi?: StripAnsi | boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('stripAnsi')
      .toEqualTypeOf<Nilable<StripAnsi | boolean>>()
  })

  it('should match [tabSize?: number | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tabSize')
      .toEqualTypeOf<Nilable<number>>()
  })

  it('should match [trim?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('trim')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
