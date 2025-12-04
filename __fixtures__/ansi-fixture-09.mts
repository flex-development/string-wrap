/**
 * @file Fixtures - fixture9
 * @module fixtures/ansi/fixture9
 */

import url from '#fixtures/url'
import colors from '@flex-development/colors'

/**
 * ANSI fixture #9.
 *
 * @type {string}
 */
export default `Check out the \u001B]8;;${url}\u0007` +
  `${colors.bold('GitHub')} for Flex Development\u001B]8;;\u0007, it ` +
  colors.bgRed(
    `is \u001B]8;;${url}` +
      '\u0007supercalifragilisticexpialidocious\u001B]8;;\u0007'
  )
