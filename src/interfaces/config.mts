/**
 * @file Interfaces - Config
 * @module string-wrap/interfaces/Config
 */

import type { Options } from '@flex-development/string-wrap'

/**
 * String wrapping configuration.
 *
 * @see {@linkcode Options}
 *
 * @extends {Options}
 */
interface Config extends Options {
  /**
   * The number of columns to wrap the string to.
   */
  columns: number | string
}

export type { Config as default }
