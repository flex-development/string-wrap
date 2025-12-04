/**
 * @file Fixtures - digitSequences2
 * @module fixtures/digitSequences2
 */

import digitSequence from '#fixtures/digit-sequence'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A string containing digits and a line break.
 *
 * @type {string}
 */
export default digitSequence.trimEnd().slice(1, -1) +
  chars.crlf +
  chars.digit9 +
  digitSequence.trimEnd() +
  chars.digit0
