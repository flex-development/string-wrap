/**
 * @file Test Utilities - hrc
 * @module tests/utils/hrc
 */

import type { ToString } from '@flex-development/string-wrap'

/**
 * Make control characters in `value` human-readable.
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The string containing control characters.
 *  Non-string values will be converted to strings (i.e. `toString(value)`)
 * @param {ToString | null | undefined} [toString]
 *  Convert `value` to a string
 * @return {string}
 *  The `value` with human-readable control characters
 */
function hrc(
  this: void,
  value: unknown,
  toString?: ToString | null | undefined
): string {
  toString ??= String

  /**
   * Regular expression matching control characters.
   *
   * @const {RegExp} re
   */
  const re: RegExp = /[\u0000-\u001F\u007F-\u009F]/g

  return toString(value).replace(re, hr)

  /**
   * Convert a control `character` to a human-readable string.
   *
   * @this {void}
   *
   * @param {string} character
   *  The control character
   * @return {string}
   *  The control `character` as a human-readable string
   */
  function hr(this: void, character: string): string {
    return `\\u${character.codePointAt(0)!.toString(16).padStart(4, '0')}`
  }
}

export default hrc
