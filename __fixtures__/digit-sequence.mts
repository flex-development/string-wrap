/**
 * @file Fixtures - digitSequence
 * @module fixtures/digitSequence
 */

import digits from '#fixtures/digits'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A sequence containing only digits.
 *
 * @type {string}
 */
export default digits.join(chars.empty) + chars.lf
