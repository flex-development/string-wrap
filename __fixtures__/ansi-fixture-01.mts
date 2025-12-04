/**
 * @file Fixtures - fixture01
 * @module fixtures/ansi/fixture01
 */

import colors from '@flex-development/colors'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * ANSI fixture #1.
 *
 * @type {string}
 */
export default `The ${colors.bold('quick')} brown` +
  chars.space +
  `${colors.red('fox jumped over ')}the ${colors.italic('lazy')}` +
  chars.space +
  colors.green('dog and then ran away with the unicorn.')
