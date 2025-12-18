/**
 * @file lines
 * @module string-wrap/lib/lines
 */

import tokenize from '#internal/tokenize'
import type { TokenizeContext } from '@flex-development/fsm-tokenizer'
import type {
  Columns,
  Config,
  LinesInfo,
  Options
} from '@flex-development/string-wrap'

export default lines

/**
 * Get info about the lines of a wrapped string.
 *
 * @see {@linkcode Columns}
 * @see {@linkcode LinesInfo}
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
 * @return {LinesInfo}
 *  Info about the lines forming the wrapped string
 */
function lines(
  this: void,
  thing: unknown,
  columns: Columns,
  options?: Options | null | undefined
): LinesInfo

/**
 * Get info about the lines of a wrapped string.
 *
 * @see {@linkcode Columns}
 * @see {@linkcode Config}
 * @see {@linkcode LinesInfo}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap.
 *  Non-string values will be converted to strings
 * @param {Columns | Config} config
 *  The wrap configuration, the number of columns to wrap the string to,
 *  or a function that returns the maximum number of columns per line
 * @return {LinesInfo}
 *  Info about the lines forming the wrapped string
 */
function lines(this: void, thing: unknown, config: Columns | Config): LinesInfo

/**
 * Get info about the lines of a wrapped string.
 *
 * @see {@linkcode Columns}
 * @see {@linkcode Config}
 * @see {@linkcode LinesInfo}
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
 * @return {LinesInfo}
 *  Info about the lines forming the wrapped string
 */
function lines(
  this: void,
  thing: unknown,
  config: Columns | Config,
  options?: Options | null | undefined
): LinesInfo {
  /**
   * The tokenizer.
   *
   * @const {TokenizeContext} tokenizer
   */
  const tokenizer: TokenizeContext = tokenize(thing, config as never, options)

  return {
    columns: tokenizer.columns,
    eol: tokenizer.eol,
    indent: tokenizer.indent,
    lines: Object.freeze([...tokenizer.lines]),
    padLeft: tokenizer.padLeft,
    padRight: tokenizer.padRight
  }
}
