/**
 * @file Plugins - satisfyColumns
 * @module tests/plugins/chai/satisfyColumns
 */

import gs from '#internal/gs'
import satisfyColumns from '#tests/utils/satisfy-columns'
import stripAnsi from '@flex-development/strip-ansi'

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
   * @param {number | string} columns
   *  The maximum (inclusive) number of columns
   * @return {undefined}
   */
  function satisfy(
    this: Chai.Assertion,
    columns: number | string
  ): undefined {
    /**
     * The line to check.
     *
     * @const {string} line
     */
    const line: string = utils.flag(this, 'object')

    return void this.assert(
      satisfyColumns(columns)(line),
      'expected length of #{this} to be in range [0,#{exp}] but got #{act}',
      'expected length of #{this} to not be in range [0,#{exp}] but got #{act}',
      +columns,
      gs.countGraphemes(stripAnsi(line))
    )
  }
}
