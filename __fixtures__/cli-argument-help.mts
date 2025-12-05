/**
 * @file Fixtures - cliArgumentHelp
 * @module fixtures/cliArgumentHelp
 */

import digits from '#fixtures/digits'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * A string containing several sequences and a line break.
 *
 * @type {string}
 */
export default 'first value in starting sequence' +
  chars.lf +
  chars.space.repeat(2) +
  'choices' +
  chars.colon +
  chars.space +
  JSON.stringify(digits)
