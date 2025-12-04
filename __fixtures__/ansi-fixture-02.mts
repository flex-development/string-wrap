/**
 * @file Fixtures - fixture2
 * @module fixtures/ansi/fixture2
 */

import colors from '@flex-development/colors'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * ANSI fixture #2.
 *
 * @type {string}
 */
export default colors.green('hello world') + chars.space + 'hey!'
