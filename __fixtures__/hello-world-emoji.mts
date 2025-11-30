/**
 * @file Fixtures - helloWorldEmoji
 * @module fixtures/helloWorldEmoji
 */

import { chars } from '@flex-development/fsm-tokenizer'

/**
 * Another string containing several sequences and a line break.
 *
 * @type {string}
 */
export default 'hello' + chars.lf + chars.space.repeat(2) + '🌎'
