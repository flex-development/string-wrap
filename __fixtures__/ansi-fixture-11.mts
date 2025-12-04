/**
 * @file Fixtures - fixture11
 * @module fixtures/ansi/fixture11
 */

import colors from '@flex-development/colors'
import { chars } from '@flex-development/fsm-tokenizer'

/**
 * ANSI fixture #11.
 *
 * @type {string}
 */
export default 'Options are defined with the ' +
  `[${colors.cyan('.option()')}](#commandoptioninfo-data) and ` +
  `[${colors.cyan('.options()')}](#commandoptionsinfos) methods, which also ` +
  'serve as documentation for the options.\n' +
  'Each option can have at most 2 flags, ' +
  'typically one long flag and one short or shortish ' +
  `(e.g. ${colors.cyan('-w')}, ${colors.cyan('--ws')}) flag. ` +
  `Flags can be separated by commas (${colors.cyan(chars.comma)}), ` +
  `pipes (${colors.cyan(chars.bar)}), or spaces (${colors.cyan(chars.space)}).`
