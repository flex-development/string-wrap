/**
 * @file wrap
 * @module string-wrap/lib/wrap
 */

import lines from '#lib/lines'
import type {
  Columns,
  Config,
  Options
} from '@flex-development/string-wrap'

export default wrap

/**
 * Wrap a string to the specified number of `columns`.
 *
 * @see {@linkcode Columns}
 * @see {@linkcode Options}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap.
 *  Non-string values will be converted to strings
 * @param {Columns} columns
 *  The number of columns to wrap the string to,
 *  or a function that returns the maximum number of columns per line
 * @param {Options | null | undefined} [options]
 *  Options for wrapping
 * @return {string}
 *  The wrapped string
 */
function wrap(
  this: void,
  thing: unknown,
  columns: Columns,
  options?: Options | null | undefined
): string

/**
 * Wrap a string to the specified column width.
 *
 * @see {@linkcode Columns}
 * @see {@linkcode Config}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap.
 *  Non-string values will be converted to strings
 * @param {Columns | Config} config
 *  The wrap configuration, the number of columns to wrap the string to,
 *  or a function that returns the maximum number of columns per line
 * @return {string}
 *  The wrapped string
 */
function wrap(this: void, thing: unknown, config: Columns | Config): string

/**
 * Wrap a string to the specified column width.
 *
 * @see {@linkcode Columns}
 * @see {@linkcode Config}
 * @see {@linkcode Options}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap.
 *  Non-string values will be converted to strings
 * @param {Columns | Config} config
 *  The wrap configuration, the number of columns to wrap the string to,
 *  or a function that returns the maximum number of columns per line
 * @param {Options | null | undefined} [options]
 *  Options for wrapping
 * @return {string}
 *  The wrapped string
 */
function wrap(
  this: void,
  thing: unknown,
  config: Columns | Config,
  options?: Options | null | undefined
): string {
  const { eol, lines: list } = lines(thing, config as never, options)
  return list.join(eol)
}
