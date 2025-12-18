/**
 * @file Plugins - satisfyColumns
 * @module tests/plugins/chai/satisfyColumns
 */

import gs from '#internal/gs'
import type { ColumnsFunction } from '@flex-development/string-wrap'
import stripAnsi from '@flex-development/strip-ansi'
import { ok } from 'devlop'

export default plugin

/**
 * Initialize a chai plugin to check if a line without ANSI escape codes has
 * no more graphemes than the specified number of columns.
 *
 * @see {@linkcode Chai.ChaiStatic}
 * @see {@linkcode Chai.ChaiUtils}
 *
 * @param {ChaiStatic} chai
 *  `chai` export
 * @param {Chai.ChaiUtils} utils
 *  `chai` utilities
 * @return {undefined}
 */
function plugin(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): undefined {
  utils.addChainableMethod(chai.Assertion.prototype, 'satisfyColumns', satisfy)
  return void 0

  /**
   * @this {Chai.Assertion}
   *
   * @param {ColumnsFunction<number>} columns
   *  A function that returns the maximum number of columns per line
   * @return {undefined}
   */
  function satisfy(
    this: Chai.Assertion,
    columns: ColumnsFunction<number>
  ): undefined {
    /**
     * The lines to check.
     *
     * @const {string[]} lines
     */
    const lines: string[] = utils.flag(this, 'object')

    /**
     * The index of the current line.
     *
     * @var {number} i
     */
    let i: number = -1

    // check size of each line.
    while (++i < lines.length) {
      /**
       * The current line.
       *
       * @const {string | undefined} line
       */
      const line: string | undefined = lines[i]

      ok(typeof line === 'string', 'expected `line[index]`')

      /**
       * The maximum number of allowed columns.
       *
       * @const {number} max
       */
      const max: number = columns(i, lines.slice(0, i))

      /**
       * The number of graphemes in the line.
       *
       * @const {number} size
       */
      const size: number = gs.countGraphemes(stripAnsi(line))

      void this.assert(
        size <= max,
        `expected line[${i}] size to be in range [0,#{exp}] but got #{act}`,
        `expected line[${i}] size to not be in range [0,#{exp}] but got #{act}`,
        max,
        size
      )
    }

    return void columns
  }
}
