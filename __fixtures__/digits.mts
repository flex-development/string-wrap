/**
 * @file Fixtures - digits
 * @module fixtures/digits
 */

import { chars } from '@flex-development/fsm-tokenizer'

/**
 * List of digits.
 *
 * @type {Readonly<['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']>}
 */
export default Object.freeze([
  chars.digit0,
  chars.digit1,
  chars.digit2,
  chars.digit3,
  chars.digit4,
  chars.digit5,
  chars.digit6,
  chars.digit7,
  chars.digit8,
  chars.digit9
] as const)
