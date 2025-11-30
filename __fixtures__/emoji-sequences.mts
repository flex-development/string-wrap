/**
 * @file Fixtures - emojiSequences
 * @module fixtures/emojiSequences
 */

import emojis from '#fixtures/emojis'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A string containing only emojis and spaces.
 *
 * @type {string}
 */
export default emojis.join(chars.space)
