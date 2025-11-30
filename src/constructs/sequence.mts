/**
 * @file Constructs - sequence
 * @module string-wrap/constructs/sequence
 */

import tt from '#enums/tt'
import takeVisible from '#internal/take-visible'
import {
  eof,
  ev,
  type Code,
  type Construct,
  type Effects,
  type Event,
  type Place,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'
import { markdownLineEnding } from 'micromark-util-character'
import width from 'string-width'

/**
 * Sequence construct.
 *
 * @internal
 *
 * @const {Construct} sequence
 */
const sequence: Construct = {
  name: tt.sequence,
  resolve: resolveSequence,
  tokenize: tokenizeSequence
}

export default sequence

/**
 * Resolve the events parsed by {@linkcode tokenizeSequence}.
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
function resolveSequence(this: void, events: Event[]): Event[] {
  assert(events.length === 2, 'expected `2` events')

  /**
   * Index of current event.
   *
   * @var {number} index
   */
  let index: number = -1

  // add sequences to the current line,
  // or start a new line if the sequence cannot fit.
  while (++index < events.length) {
    assert(events[index], 'expected event')
    const [event, token, self] = events[index]!

    // get token value on enter.
    assert(event === ev.enter, 'expected `enter` event')
    assert(token.type === tt.sequence, 'expected `sequence` token')
    token.value = self.sliceSerialize(token)

    /**
     * The number of columns required to display the current line.
     *
     * @const {number} columns
     */
    const columns: number = width(self.line)

    /**
     * The number of columns required to display the sequence.
     *
     * @const {number} seq
     */
    const seq: number = width(token.value)

    // fill columns completely,
    // or break long sequences that don't fit on the current line.
    if (self.fill || (seq > self.cols && self.hard)) {
      /**
       * The current sequence.
       *
       * @var {string} sequence
       */
      let sequence: string = token.value

      // put as much of the sequence onto the current as line as possible,
      // pushing onto the next once the line has no more available columns.
      while (sequence.length) {
        /**
         * The remaining number of columns available.
         *
         * @const {number} space
         */
        const space: number = self.cols - width(self.line)

        /**
         * The longest prefix of {@linkcode sequence} that fits into the
         * remaining {@linkcode space} on the current line.
         *
         * @const {string} take
         */
        const take: string = takeVisible(sequence, space)

        // start new line if there is no space.
        if (space <= 0) self.flush()

        // add to current line
        // and remove the piece of the sequence that was already processed.
        self.line += take
        sequence = sequence.slice(take.length)

        // start new line if there is no space.
        if (width(self.line) === self.cols) self.flush()
      }

      // move onto event after sequence exit event.
      index++
      continue
    }

    // start new line if sequence cannot fit.
    if (columns && columns + seq > self.cols) self.flush()

    // sequence fits on line normally, or soft wrap is enabled
    // and long words may extend past the configured column width.
    self.line += token.value

    // move onto the next enter event.
    index++
  }

  return events
}

/**
 * Tokenize a sequence of characters that should remain unbroken when wrapped.
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
 * @param {State} nok
 *  Failed tokenization state
 * @return {State}
 *  Initial state
 */
function tokenizeSequence(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  /**
   * The tokenize context.
   *
   * @const {TokenizeContext} self
   */
  const self: TokenizeContext = this

  return sequence

  /**
   * Start of sequence.
   *
   * @example
   *  ```markdown
   *  > | hello world
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
  function sequence(this: void, code: Code): State | undefined {
    if (eof(code)) return nok(code)
    return effects.enter(tt.sequence), effects.consume(code), inside
  }

  /**
   * Inside sequence.
   *
   * @example
   *  ```markdown
   *  > | hello world
   *       ^^^^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function inside(this: void, code: Code): State | undefined {
    /**
     * The current point in the content.
     *
     * @const {Place} now
     */
    const now: Place = self.now()

    // text between matches is converted into string chunks,
    // so `now._bufferIndex` will greater than or equal to `0`.
    if (now._bufferIndex >= 0 && !markdownLineEnding(code)) {
      return effects.consume(code), inside
    }

    return effects.exit(tt.sequence), ok(code)
  }
}
