/**
 * @file Fixtures - digitSequence2
 * @module fixtures/digitSequence2
 */

import digitsReversed from '#fixtures/digits-reversed'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * Another sequence containing only digits.
 *
 * @type {string}
 */
export default digitsReversed.join(chars.empty)
