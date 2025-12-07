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
import { ansiRegex } from '@flex-development/ansi-regex'
import {
  chars,
  codes,
  createTokenizer,
  initialize,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import type {
  Config,
  Options,
  SpacerFunction
} from '@flex-development/string-wrap'
import stripAnsi from '@flex-development/strip-ansi'
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
    }),
    tabSize: config.tabSize ?? +chars.digit2
  })

  // write chunks.
  void chunks(context.trim ? trimEnd(context.string) : context.string, / /g)

  return context

  /**
   * Write chunks to the tokenizer.
   *
   * @this {void}
   *
   * @param {string} input
   *  The string to chunk
   * @param {RegExp} chunker
   *  The regular expression used to create chunks
   * @return {undefined}
   */
  function chunks(this: void, input: string, chunker: RegExp): undefined {
    /**
     * The index where the last match ends.
     *
     * @var {number} index
     */
    let index: number = 0

    // write chunks to the tokenizer.
    for (const { 0: match, index: start } of input.matchAll(chunker)) {
      /**
       * The index at which the match ends.
       *
       * @const {number} end
       */
      const end: number = start + match.length

      // text between matches.
      if (start > index) context.write(input.slice(index, start))

      // the match itself.
      for (const code of context.preprocess(match, null)) context.write(code)
      index = end
    }

    // remaining tail text.
    index < input.length && context.write(input.slice(index))

    // signal end of content.
    return void context.write(codes.eof)
  }

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
    self.indent = spacing(config.indent)
    self.line = chars.empty
    self.lines = []
    self.padLeft = spacing(config.padLeft)
    self.padRight = spacing(config.padRight)
    self.stringify = config.stringify ?? String
    self.trim = config.trim ?? true

    // get available columns.
    self.cols -= gs.countGraphemes(self.indent(0))
    self.cols -= gs.countGraphemes(self.padLeft(0) + self.padRight(0))
    self.cols = Math.max(0, self.cols)

    // get ansi escape code remover.
    self.stripAnsi = typeof config.stripAnsi === 'function'
      ? config.stripAnsi
      : stripAnsi

    // capture the string to wrap.
    self.string = self.stringify(thing)

    // remove ansi escape codes.
    if (config.stripAnsi) self.string = self.stripAnsi(self.string)

    return void self
  }

  /**
   * Store a line and start the next one.
   *
   * @this {TokenizeContext}
   *
   * @return {undefined}
   */
  function flush(this: TokenizeContext): undefined {
    // remove whitespace from end of line
    // and any whitespace immediately before ansi escape codes at end of line.
    if (this.trim) this.line = trimEnd(this.line)

    // indent and pad line.
    this.line = this.padLeft(this.lines.length, this.lines) + this.line
    this.line = this.indent(this.lines.length, this.lines) + this.line
    this.line += this.padRight(this.lines.length, this.lines)

    // add new line.
    this.lines.push(this.line)

    // re-calculate available columns for the next line.
    this.cols = this.columns
    this.cols -= gs.countGraphemes(this.indent(this.lines.length, this.lines))
    this.cols -= gs.countGraphemes(this.padLeft(this.lines.length, this.lines))
    this.cols -= gs.countGraphemes(this.padRight(this.lines.length, this.lines))
    this.cols = Math.max(0, this.cols)

    return this.line = chars.empty, void 0
  }

  /**
   * Create a spacer function.
   *
   * @this {void}
   *
   * @param {SpacerFunction | number | string | null | undefined} init
   *  The spacing function, the size of the spacing string,
   *  or the string to use
   * @return {SpacerFunction<string>}
   *  Spacer function
   */
  function spacing(
    this: void,
    init: SpacerFunction | number | string | null | undefined
  ): SpacerFunction<string> {
    if (typeof init === 'function') {
      /**
       * @this {void}
       *
       * @param {number} index
       *  The index of the current line
       * @param {ReadonlyArray<string> | null | undefined} [lines]
       *  The current list of lines
       * @return {string}
       *  The spacer
       */
      return function spacer(
        this: void,
        index: number,
        lines?: readonly string[] | null | undefined
      ): string {
        ok(typeof init === 'function', 'expected spacer `init` function')
        return margin(init(index, lines))
      }
    }

    /**
     * @this {void}
     *
     * @return {string}
     *  The spacer
     */
    return function spacer(this: void): string {
      ok(typeof init !== 'function', 'expected no spacer `init` function')
      return margin(init)
    }
  }

  /**
   * Remove any whitespace (spaces and tabs, but not line terminators)
   * from the end of a line.
   *
   * If an ANSI escape code ends a line, and any trimmable characters are
   * found before it (up to the first non-trimmable character),
   * those characters will also be removed.
   *
   * @this {void}
   *
   * @param {string} line
   *  The line to trim
   * @return {string}
   *  The trimmed line
   */
  function trimEnd(this: void, line: string): string {
    line = line.replace(/[\t ]+$/, chars.empty)

    /**
     * List of ANSI escape code matches.
     *
     * @const {RegExpExecArray[]} ansis
     */
    const ansis: RegExpExecArray[] = [...line.matchAll(ansiRegex())]

    // check for ansi escape codes at the end of line and retrim.
    if (ansis.length) {
      /**
       * Last ANSI escape code match.
       *
       * @const {RegExpExecArray} lastAnsi
       */
      const lastAnsi: RegExpExecArray = ansis.at(-1)!

      // ansi escape code found at end of match, retrim.
      if (lastAnsi.index + lastAnsi[0].length === line.length) {
        line = line.slice(0, lastAnsi.index).trimEnd() + lastAnsi[0]
      }
    }

    return line
  }
}
