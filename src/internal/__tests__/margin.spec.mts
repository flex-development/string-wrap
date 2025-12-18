/**
 * @file Unit Tests - margin
 * @module string-wrap/internal/tests/unit/margin
 */

import testSubject from '#internal/margin'
import { chars } from '@flex-development/fsm-tokenizer'

describe('unit:internal/margin', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [+chars.digit0],
    [chars.digit3],
    [chars.space.repeat(+chars.digit2)]
  ])('should return padding string (%j)', pad => {
    expect(testSubject(pad)).toMatchSnapshot()
  })
})
