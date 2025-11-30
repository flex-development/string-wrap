/**
 * @file Fixtures - a
 * @module fixtures/a
 */

import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A string containing only spaces and the letter "a".
 *
 * @type {string}
 */
export default chars.space.repeat(2) + chars.lowercaseA + chars.space
