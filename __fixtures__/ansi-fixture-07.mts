/**
 * @file Fixtures - fixture7
 * @module fixtures/ansi/fixture7
 */

import colors from '@flex-development/colors'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * ANSI fixture #7.
 *
 * @type {string}
 */
export default colors.bgGreen(chars.space + colors.black('ok') + chars.space)
