/**
 * @file Fixtures - emojiSequence
 * @module fixtures/emojiSequence
 */

import emojis from '#fixtures/emojis'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A sequence containing only emojis.
 *
 * @type {string}
 */
export default emojis.join(chars.empty)
