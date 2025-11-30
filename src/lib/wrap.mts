/**
 * @file wrap
 * @module string-wrap/lib/wrap
 */

import lines from '#lib/lines'
import type { Config, Options } from '@flex-development/string-wrap'

export default wrap

/**
 * Wrap a string to the specified number of `columns`.
 *
 * @see {@linkcode Options}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap. Non-string values will be converted to strings
 * @param {number | string} columns
 *  The number of columns to wrap the string to
 * @param {Options | null | undefined} [options]
 *  Options for wrapping
 * @return {string}
 *  The wrapped string
 */
function wrap(
  this: void,
  thing: unknown,
  columns: number | string,
  options?: Options | null | undefined
): string

/**
 * Wrap a string to the specified column width.
 *
 * @see {@linkcode Config}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap. Non-string values will be converted to strings
 * @param {Config | number | string} config
 *  The wrap configuration or the number of columns to wrap the string to
 * @return {string}
 *  The wrapped string
 */
function wrap(
  this: void,
  thing: unknown,
  config: Config | number | string
): string

/**
 * Wrap a string to the specified column width.
 *
 * @see {@linkcode Config}
 * @see {@linkcode Options}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap. Non-string values will be converted to strings
 * @param {Config | number | string} config
 *  The wrap configuration or the number of columns to wrap the string to
 * @param {Options | null | undefined} [options]
 *  Options for wrapping
 * @return {string}
 *  The wrapped string
 */
function wrap(
  this: void,
  thing: unknown,
  config: Config | number | string,
  options?: Options | null | undefined
): string {
  const { eol, lines: list } = lines(thing, config as never, options)
  return list.join(eol)
}
