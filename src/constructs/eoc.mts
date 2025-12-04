/**
 * @file Constructs - eoc
 * @module string-wrap/constructs/eoc
 */

import tt from '#enums/tt'
import {
  codes,
  eof,
  type Code,
  type Construct,
  type Effects,
  type Event,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'
import width from 'string-width'

/**
 * End-of-content construct.
 *
 * @internal
 *
 * @const {Construct} eoc
 */
const eoc: Construct = {
  name: tt.eoc,
  test: eof,
  tokenize: tokenizeEnd
}

export default eoc

/**
 * Tokenize the end of content.
 *
 * @see {@linkcode Effects}
 * @see {@linkcode State}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  Context object to transition state machine
 * @param {State} ok
 *  Successful tokenization state
 * @return {State}
 *  Initial state
 */
function tokenizeEnd(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  /**
   * The tokenize context.
   *
   * @const {TokenizeContext} self
   */
  const self: TokenizeContext = this

  return eoc

  /**
   * At the end of content.
   *
   * @example
   *  ```markdown
   *  > | hello world
   *                 ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function eoc(this: void, code: Code): State | undefined {
    assert(code === codes.eof, 'expected eof code')
    void (effects.enter(tt.eoc), effects.consume(code), effects.exit(tt.eoc))

    // add the final line.
    // resolvers are not called, so the final line is added here.
    self.line.length && self.flush()

    /**
     * The last line.
     *
     * @const {string | undefined} last
     */
    const last: string | undefined = self.lines.at(-1)

    /**
     * The second to last line.
     *
     * @const {string | undefined} almostLast
     */
    const almostLast: string | undefined = self.lines.at(-2)

    // the last line may only contain ansi escape characters, or an otherwise
    // zero-width sequence. in this case, merge the last two lines to prevent
    // another line ending from being injected when the lines are joined.
    if (last !== undefined && almostLast !== undefined && !width(last)) {
      self.lines[self.lines.length - 2] = almostLast + last
      self.lines.pop()
    }

    /**
     * The last event before the `eoc` events.
     *
     * @const {Event | undefined} beforeEnd
     */
    const beforeEnd: Event | undefined = self.events.at(-3)

    // an empty line was found at the end of content, add it.
    if (beforeEnd && beforeEnd[1].type === tt.eol) self.flush()

    return ok
  }
}
