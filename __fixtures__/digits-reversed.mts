/**
 * @file Fixtures - digitsReversed
 * @module fixtures/digitsReversed
 */

import { chars } from '@flex-development/fsm-tokenizer'

/**
 * List of digits in reverse.
 *
 * @type {Readonly<['9', '8', '7', '6', '5', '4', '3', '2', '1', '0']>}
 */
export default Object.freeze([
  chars.digit9,
  chars.digit8,
  chars.digit7,
  chars.digit6,
  chars.digit5,
  chars.digit4,
  chars.digit3,
  chars.digit2,
  chars.digit1,
  chars.digit0
] as const)
