/**
 * @file Fixtures - hiWorld
 * @module fixtures/hiWorld
 */

import { chars } from '@flex-development/fsm-tokenizer'

/**
 * Another string containing several sequences and a line break.
 *
 * @type {string}
 */
export default 'hi' + chars.lf + chars.space.repeat(2) + '🌎'
