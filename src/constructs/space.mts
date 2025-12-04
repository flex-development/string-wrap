/**
 * @file Constructs - space
 * @module string-wrap/constructs/space
 */

import tt from '#enums/tt'
import {
  codes,
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
 * Space construct.
 *
 * @internal
 *
 * @const {Construct} space
 */
const space: Construct = {
  name: tt.space,
  resolve: resolveSpace,
  tokenize: tokenizeSpace
}

export default space

/**
 * Resolve the events parsed by {@linkcode tokenizeSpace}.
 *
 * @see {@linkcode Event}
 *
 * @this {void}
 *
 * @param {Event[]} events
 *  List of events
 * @return {Event[]}
 *  List of changed events
 */
function resolveSpace(this: void, events: Event[]): Event[] {
  assert(events.length === 2, 'expected `2` events')
  const [, token, self] = events[0]!

  // get token value.
  token.value = self.sliceSerialize(token)

  // start a new line if a space cannot fit,
  // or add the space to the current line if the line already has content.
  // if the line has no content, but should not be trimmed, also add the space.
  if (width(self.line) + token.value.length > self.cols) {
    self.flush()
    if (!self.trim) self.line += token.value
  } else if (width(self.line) || !self.trim) {
    // this space belongs on the newline specified by `self.string`.
    // drop the last line (which is empty) to prevent duplicate newlines.
    // when the current line is flushed, it'll replace the popped line.
    if (self.events.at(-3)?.[1].type === tt.eol) self.lines.pop()
    self.line += token.value
  }

  return events
}

/**
 * Tokenize a space.
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
function tokenizeSpace(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  return space

  /**
   * Start of a space character.
   *
   * @example
   *  ```markdown
   *  > |
   *      ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function space(this: void, code: Code): State | undefined {
    assert(code === codes.space, 'expected ` `')
    effects.enter(tt.space)
    effects.consume(code)
    effects.exit(tt.space)
    return ok
  }
}
