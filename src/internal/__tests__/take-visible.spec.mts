/**
 * @file Unit Tests - takeVisible
 * @module string-wrap/internal/tests/unit/takeVisible
 */

import digitSequence from '#fixtures/digit-sequence'
import emojiSequence from '#fixtures/emoji-sequence'
import testSubject from '#internal/take-visible'
import hrc from '#tests/utils/hrc'
import { faker } from '@faker-js/faker'
import colors from '@flex-development/colors'
import { chars } from '@flex-development/fsm-tokenizer'

describe('unit:internal/takeVisible', () => {
  it.each<number | string>([
    +chars.digit0,
    chars.digit0
  ])('should return empty string if there is no space (%j)', columns => {
    expect(testSubject(faker.git.commitSha(), columns)).to.eq(chars.empty)
  })

  it.each<Parameters<typeof testSubject>>([
    [colors.bold(emojiSequence), chars.digit1],
    [colors.underline(digitSequence), +chars.digit3],
    [colors.green('dog'), chars.digit1],
    [colors.green('hello') + 'world', chars.digit5],
    [emojiSequence, +chars.digit1],
    [digitSequence, chars.digit3]
  ])('should return longest substring that fits into `columns` ([%j, %j])', (
    sequence,
    columns
  ) => {
    expect(hrc(testSubject(sequence, columns))).toMatchSnapshot()
  })
})
