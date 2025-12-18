/**
 * @file Unit Tests - number
 * @module string-wrap/internal/tests/unit/number
 */

import testSubject from '#internal/number'
import { chars } from '@flex-development/fsm-tokenizer'

describe('unit:internal/number', () => {
  it.each<Parameters<typeof testSubject>>([
    ['EPSILON'],
    ['NEGATIVE_INFINITY'],
    ['NaN'],
    ['false'],
    ['parseInt'],
    [chars.digit1 + chars.digit3],
    [+chars.digit3]
  ])('should return parsed number (%j)', value => {
    expect(testSubject(value)).toMatchSnapshot()
  })
})
