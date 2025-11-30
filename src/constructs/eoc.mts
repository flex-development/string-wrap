/**
 * @file Constructs - eoc
 * @module string-wrap/constructs/eoc
 */

import tt from '#enums/tt'
import {
  codes,
  type Code,
  type Construct,
  type Effects,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'

/**
 * End-of-content construct.
 *
 * @internal
 *
 * @const {Construct} eoc
 */
const eoc: Construct = {
  name: tt.eoc,
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
    return self.line.length && self.flush(), ok
  }
}
