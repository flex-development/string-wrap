/**
 * @file Enums - tt
 * @module string-wrap/enums/tt
 */

import type { TokenType } from '@flex-development/fsm-tokenizer'

/**
 * Token types.
 *
 * @internal
 *
 * @enum {TokenType}
 */
enum tt {
  eoc = 'eoc',
  eol = 'eol',
  sequence = 'sequence',
  space = 'space'
}

export default tt
