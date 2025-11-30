/**
 * @file Constructs - eol
 * @module string-wrap/constructs/eol
 */

import tt from '#enums/tt'
import {
  type Code,
  type Construct,
  type Effects,
  type Event,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'
import { markdownLineEnding } from 'micromark-util-character'

/**
 * Line ending construct.
 *
 * @internal
 *
 * @const {Construct} eol
 */
const eol: Construct = {
  name: tt.eol,
  resolve: resolveLineEnding,
  tokenize: tokenizeLineEnding
}

export default eol

/**
 * Resolve the events parsed by {@linkcode tokenizeLineEnding}.
 *
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeContext}
 *
 * @this {void}
 *
 * @param {Event[]} events
 *  List of events
 * @return {Event[]}
 *  List of changed events
 */
function resolveLineEnding(this: void, events: Event[]): Event[] {
  assert(events.length === 2, 'expected `2` events')
  const [, token, self] = events[0]!
  return token.value = self.sliceSerialize(token), self.flush(), events
}

/**
 * Tokenize a line ending.
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
function tokenizeLineEnding(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  return lineEnding

  /**
   * At the end of a line.
   *
   * @example
   *  ```markdown
   *  > | hello
   *           ^
   *  > | world
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function lineEnding(this: void, code: Code): State | undefined {
    assert(markdownLineEnding(code), 'expected line ending `code`')
    effects.enter(tt.eol)
    effects.consume(code)
    effects.exit(tt.eol)
    return ok
  }
}
