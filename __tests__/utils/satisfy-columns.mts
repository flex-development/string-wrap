/**
 * @file Test Utilities - satisfyColumns
 * @module tests/utils/satisfyColumns
 */

import gs from '#internal/gs'
import stripAnsi from '@flex-development/strip-ansi'

/**
 * Create a function to check if a line without ANSI escape codes
 * has no more graphemes than the maximum number of `columns`.
 *
 * @this {void}
 *
 * @param {number | string} columns
 *  The maximum (inclusive) number of columns
 * @return {(this: void, line: string) => boolean}
 *  Line length predicate
 */
function satisfyColumns(
  this: void,
  columns: number | string
): (this: void, line: string) => boolean {
  return check

  /**
   * Check if `line` without ANSI escape codes has
   * no more graphemes than the maximum number of {@linkcode columns}.
   *
   * @this {void}
   *
   * @param {string} line
   *  The line to check
   * @return {boolean}
   *  `true` if `line` satisfies line length, `false` otherwise
   */
  function check(this: void, line: string): boolean {
    return gs.countGraphemes(stripAnsi(line)) <= +columns
  }
}

export default satisfyColumns
