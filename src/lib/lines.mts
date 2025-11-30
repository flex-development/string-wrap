/**
 * @file lines
 * @module string-wrap/lib/lines
 */

import tokenize from '#internal/tokenize'
import type { TokenizeContext } from '@flex-development/fsm-tokenizer'
import type { Config, LinesInfo, Options } from '@flex-development/string-wrap'

export default lines

/**
 * Get info about the lines of a wrapped string.
 *
 * @see {@linkcode LinesInfo}
 * @see {@linkcode Options}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap.
 *  Non-string values will be converted to strings
 * @param {number | string} columns
 *  The number of columns to wrap the string to
 * @param {Options | null | undefined} [options]
 *  Options for wrapping
 * @return {LinesInfo}
 *  Info about the lines forming the wrapped string
 */
function lines(
  this: void,
  thing: unknown,
  columns: number | string,
  options?: Options | null | undefined
): LinesInfo

/**
 * Get info about the lines of a wrapped string.
 *
 * @see {@linkcode Config}
 * @see {@linkcode LinesInfo}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap.
 *  Non-string values will be converted to strings
 * @param {Config | number | string} config
 *  The wrap configuration or the number of columns to wrap the string to
 * @return {LinesInfo}
 *  Info about the lines forming the wrapped string
 */
function lines(
  this: void,
  thing: unknown,
  config: Config | number | string
): LinesInfo

/**
 * Get info about the lines of a wrapped string.
 *
 * @see {@linkcode Config}
 * @see {@linkcode LinesInfo}
 * @see {@linkcode Options}
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to wrap.
 *  Non-string values will be converted to strings
 * @param {Config | number | string} config
 *  The wrap configuration or the number of columns to wrap the string to
 * @param {Options | null | undefined} [options]
 *  Options for wrapping
 * @return {LinesInfo}
 *  Info about the lines forming the wrapped string
 */
function lines(
  this: void,
  thing: unknown,
  config: Config | number | string,
  options?: Options | null | undefined
): LinesInfo {
  /**
   * The tokenizer.
   *
   * @const {TokenizeContext} tokenizer
   */
  const tokenizer: TokenizeContext = tokenize(thing, config as never, options)

  return {
    eol: tokenizer.eol,
    indent: tokenizer.indent,
    lines: Object.freeze([...tokenizer.lines]),
    padding: [tokenizer.padLeft, tokenizer.padRight]
  }
}
