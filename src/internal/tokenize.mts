/**
 * @file Internal - tokenize
 * @module string-wrap/internal/tokenize
 */

import eoc from '#constructs/eoc'
import eol from '#constructs/eol'
import sequence from '#constructs/sequence'
import space from '#constructs/space'
import gs from '#internal/gs'
import margin from '#internal/margin'
import {
  chars,
  codes,
  createTokenizer,
  initialize,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import type { Config, Options } from '@flex-development/string-wrap'
import { ok } from 'devlop'

export default tokenize

/**
 * Tokenize a string.
 *
 * @see {@linkcode Options}
 * @see {@linkcode TokenizeContext}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to tokenize.
 *  Non-string values will be converted to strings
 * @param {number | string} columns
 *  The number of columns to wrap the string to
 * @param {Options | null | undefined} [options]
 *  Options for wrapping
 * @return {TokenizeContext}
 *  The tokenization context
 */
function tokenize(
  this: void,
  thing: unknown,
  columns: number | string,
  options?: Options | null | undefined
): TokenizeContext

/**
 * Tokenize a string.
 *
 * @see {@linkcode Config}
 * @see {@linkcode TokenizeContext}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to tokenize.
 *  Non-string values will be converted to strings
 * @param {Config | number | string} config
 *  The wrap configuration or the number of columns to wrap the string to
 * @return {TokenizeContext}
 *  The tokenization context
 */
function tokenize(
  this: void,
  thing: unknown,
  config: Config | number | string
): TokenizeContext

/**
 * Tokenize a string.
 *
 * @see {@linkcode Config}
 * @see {@linkcode Options}
 * @see {@linkcode TokenizeContext}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {unknown} thing
 *  The thing to tokenize.
 *  Non-string values will be converted to strings
 * @param {Config | number | string} config
 *  The wrap configuration or the number of columns to wrap the string to
 * @param {Options | null | undefined} [options]
 *  Options for wrapping
 * @return {TokenizeContext}
 *  The tokenization context
 */
function tokenize(
  this: void,
  thing: unknown,
  config: Config | number | string,
  options?: Options | null | undefined
): TokenizeContext {
  if (typeof config !== 'object') {
    config = { ...options, columns: config }
  }

  /**
   * The tokenization context.
   *
   * @const {TokenizeContext} context
   */
  const context: TokenizeContext = createTokenizer({
    debug: 'string-wrap',
    finalizeContext,
    initial: initialize({
      [codes.crlf]: eol,
      [codes.lf]: eol,
      [codes.space]: space,
      [codes.vcr]: eol,
      [codes.vlf]: eol,
      null: [sequence, eoc]
    })
  })

  /**
   * The index where the last match ends.
   *
   * @var {number} index
   */
  let index: number = 0

  // write chunks to the tokenizer.
  for (const match of context.string.matchAll(/ /g)) {
    /**
     * The index at which the match was found.
     *
     * @const {number} start
     */
    const start: number = match.index

    /**
     * The index at which the match ends.
     *
     * @const {number} end
     */
    const end: number = start + match[0].length

    // text between matches
    if (start > index) context.write(context.string.slice(index, start))

    // the match itself
    for (const code of context.preprocess(match[0], null, false)) {
      context.write(code)
    }

    index = end
  }

  // remaining tail text.
  context.write(context.string.slice(index))

  // signal end of content and return event list.
  return context.write(codes.eof), context

  /**
   * Finalize the tokenization context.
   *
   * @this {void}
   *
   * @param {TokenizeContext} self
   *  The base tokenize context
   * @return {undefined}
   */
  function finalizeContext(this: void, self: TokenizeContext): undefined {
    ok(typeof config === 'object', 'expected wrap config object')

    self.cols = self.columns = +config.columns
    self.eol = config.eol?.replaceAll(/[\t ]/g, chars.empty) || chars.lf
    self.fill = config.fill
    self.flush = flush.bind(self)
    self.hard = config.hard
    self.indent = margin(config.indent)
    self.line = chars.empty
    self.lines = []
    self.padLeft = margin(config.padLeft)
    self.padRight = margin(config.padRight)
    self.stringify = config.stringify ?? String
    self.trim = config.trim ?? true

    // get available columns.
    self.cols -= gs.countGraphemes(self.indent)
    self.cols -= gs.countGraphemes(self.padLeft + self.padRight)
    self.cols = Math.max(0, self.cols)

    // capture the string to wrap.
    self.string = self.stringify(thing)

    return void self
  }

  /**
   * Start a new line.
   *
   * @todo dynamic indent/padding
   *
   * @this {TokenizeContext}
   *
   * @return {undefined}
   */
  function flush(this: TokenizeContext): undefined {
    if (this.trim) this.line = this.line.trimEnd()

    ok(typeof this.indent === 'string', 'expected string `indent`')
    ok(typeof this.padLeft === 'string', 'expected string `padLeft`')
    ok(typeof this.padRight === 'string', 'expected string `padRight`')

    this.lines.push(this.indent + this.padLeft + this.line + this.padRight)
    this.line = chars.empty

    return void 0
  }
}
