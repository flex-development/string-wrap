/**
 * @file Fixtures - digitSequence2
 * @module fixtures/digitSequence2
 */

import digitSequence from '#fixtures/digit-sequence'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A sequence containing only digits and a space.
 *
 * @type {string}
 */
export default digitSequence + chars.space
