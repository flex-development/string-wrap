/**
 * @file Fixtures - digitSequences3
 * @module fixtures/digitSequences3
 */

import digitSequence from '#fixtures/digit-sequence'
import digitSequences2 from '#fixtures/digit-sequences-2'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A string containing digits, a line break, and a space.
 *
 * @type {string}
 */
export default digitSequences2 + chars.space + digitSequence.slice(1, 6)
