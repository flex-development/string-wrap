/**
 * @file Unit Tests - takeVisible
 * @module string-wrap/internal/tests/unit/takeVisible
 */

import digits from '#fixtures/digits'
import emojis from '#fixtures/emoji-sequence'
import testSubject from '#internal/take-visible'
import { faker } from '@faker-js/faker'
import { chars } from '@flex-development/fsm-tokenizer'

describe('unit:internal/takeVisible', () => {
  it.each<number | string>([
    +chars.digit0,
    chars.digit0
  ])('should return empty string if there is no space (%j)', columns => {
    expect(testSubject(faker.git.commitSha(), columns)).to.eq(chars.empty)
  })

  it.each<Parameters<typeof testSubject>>([
    [emojis, +chars.digit1],
    [digits.join(chars.empty), chars.digit3]
  ])('should return longest substring that fits into `columns` ([%j, %j])', (
    sequence,
    columns
  ) => {
    expect(testSubject(sequence, columns)).toMatchSnapshot()
  })
})
