/**
 * @file Fixtures - digitSequences
 * @module fixtures/digitSequences
 */

import digits from '#fixtures/digits'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A string containing only digits and spaces.
 *
 * @type {string}
 */
export default digits.join(chars.space) + chars.lf
