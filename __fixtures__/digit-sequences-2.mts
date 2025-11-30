/**
 * @file Fixtures - digitSequences2
 * @module fixtures/digitSequences2
 */

import digitSequence2 from '#fixtures/digit-sequence-2'
import digitsReversed from '#fixtures/digits-reversed'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A string containing a delimiter, line breaks, and digits.
 *
 * @type {string}
 */
export default chars.minus.repeat(3) +
  chars.lf +
  digitSequence2 +
  chars.lf +
  digitsReversed.slice(1).join(chars.empty) +
  chars.crlf +
  digitsReversed.slice(2).join(chars.empty)
