/**
 * @file Interfaces - Config
 * @module string-wrap/interfaces/Config
 */

import type { Columns, Options } from '@flex-development/string-wrap'

/**
 * String wrapping configuration.
 *
 * @see {@linkcode Options}
 *
 * @extends {Options}
 */
interface Config extends Options {
  /**
   * The number of columns to wrap the string to,
   * or a function that returns the maximum number of columns per line.
   *
   * @see {@linkcode Columns}
   */
  columns: Columns
}

export type { Config as default }
