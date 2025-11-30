/**
 * @file Functional Tests - tokenize
 * @module string-wrap/internal/tests/functional/tokenize
 */

import digitSequence from '#fixtures/digit-sequence'
import digitSequences from '#fixtures/digit-sequences'
import digitSequences2 from '#fixtures/digit-sequences-2'
import emojiSequence from '#fixtures/emoji-sequence'
import emojiSequences from '#fixtures/emoji-sequences'
import fooBar from '#fixtures/foo-bar'
import fullwidth from '#fixtures/fullwidth'
import helloWorld from '#fixtures/hello-world'
import helloWorldEmoji from '#fixtures/hello-world-emoji'
import hiWorld from '#fixtures/hi-world'
import lowercaseA from '#fixtures/lowercase-a'
import quickBrownFox from '#fixtures/quick-brown-fox'
import tagline from '#fixtures/tagline'
import gs from '#internal/gs'
import margin from '#internal/margin'
import testSubject from '#internal/tokenize'
import {
  chars,
  type Event,
  type EventType,
  type Token
} from '@flex-development/fsm-tokenizer'
import type { Options, ToString } from '@flex-development/string-wrap'
import {
  ksort,
  shake,
  type JsonValue
} from '@flex-development/tutils'
import { VFile } from 'vfile'
import type { MockInstance } from 'vitest'

describe('functional:internal/tokenize', () => {
  let events: (events: Event[]) => [EventType, Token][]
  let keys: string[]

  beforeAll(() => {
    keys = [
      'code',
      'cols',
      'columns',
      'currentConstruct',
      'defineSkip',
      'encoding',
      'events',
      'fill',
      'flush',
      'hard',
      'indent',
      'interrupt',
      'line',
      'lines',
      'now',
      'padLeft',
      'padRight',
      'preprocess',
      'previous',
      'serializeChunks',
      'sliceSerialize',
      'sliceStream',
      'string',
      'stringify',
      'token',
      'trim',
      'write'
    ]

    /**
     * @this {void}
     *
     * @param {Event[]} events
     *  List of events
     * @return {[EventType, Token][]}
     *  List of event types and tokens
     */
    events = function events(
      this: void,
      events: Event[]
    ): [EventType, Token][] {
      return events.map(event => [
        event[0],
        Object.defineProperties(event[1], { toJSON: { value: toJSON } })
      ])

      /**
       * @this {Token}
       *
       * @return {Record<string, any>}
       *  JSON-ish representation of `this` token
       */
      function toJSON(this: Token): Record<string, any> {
        return shake(ksort({
          end: this.end,
          next: this.next ? toJSON.call(this.next) : undefined,
          previous: this.previous ? toJSON.call(this.previous) : undefined,
          start: this.start,
          type: this.type,
          value: this.value
        }))
      }
    }
  })

  describe('core', () => {
    it.each<[thing: string, columns: number | string]>([
      [chars.empty, chars.digit1],
      [chars.space, chars.digit9],
      [emojiSequence, chars.digit2],
      [emojiSequences, +chars.digit1],
      [fullwidth, chars.digit2],
      [digitSequences, chars.digit1],
      [digitSequences2, 10],
      [tagline, gs.countGraphemes(tagline)],
      [fooBar, chars.digit3],
      [helloWorld, chars.digit5],
      [helloWorldEmoji, +chars.digit5],
      [quickBrownFox, 20]
    ])('should build wrapped string (%#)', (thing, columns) => {
      // Act
      const result = testSubject(thing, columns)

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('cols').be.a('number')
      expect(result).to.have.property('columns', +columns)
      expect(result).to.have.property('events').be.an('array')
      expect(result).to.have.property('fill', undefined)
      expect(result).to.have.property('hard', undefined)
      expect(result).to.have.property('indent', chars.empty)
      expect(result).to.have.property('line', chars.empty)
      expect(result).to.have.property('lines').be.an('array')
      expect(result).to.have.property('padLeft', chars.empty)
      expect(result).to.have.property('padRight', chars.empty)
      expect(result).to.have.property('string').be.a('string')
      expect(result).to.have.property('stringify', String)
      expect(result).to.have.property('trim', true)

      // Expect (snapshot)
      expect({
        candidate: JSON.stringify(result.string),
        cols: result.cols,
        columns: result.columns,
        events: events(result.events),
        lines: result.lines
      }).toMatchSnapshot()
    })

    it.each<[thing: JsonValue, columns: number | string]>([
      [emojiSequence, chars.digit2],
      [digitSequence, chars.digit1],
      [quickBrownFox, chars.digit3]
    ])('should not break sequences longer than `columns` (%#)', (
      thing,
      columns
    ) => {
      // Act
      const result = testSubject(thing, columns)

      // Expect
      expect(result.lines).to.satisfy((lines: string[]): boolean => {
        return lines.some(line => gs.countGraphemes(line) > result.columns)
      })

      // Expect (snapshot)
      expect({
        cols: result.cols,
        columns: result.columns,
        lines: result.lines
      }).toMatchSnapshot()
    })
  })

  describe('options.fill', () => {
    it.each<[thing: string, columns: number | string]>([
      [emojiSequence, chars.digit2],
      [quickBrownFox, chars.digit3]
    ])('should fill columns and break sequences longer than `columns` (%#)', (
      thing,
      columns
    ) => {
      // Act
      const result = testSubject(thing, { columns, fill: true })

      // Expect
      expect(result).to.have.property('fill').be.true

      // Expect (snapshot)
      expect({
        cols: result.cols,
        columns: result.columns,
        lines: result.lines
      }).toMatchSnapshot()
    })
  })

  describe('options.hard', () => {
    it.each<[thing: string, columns: number | string]>([
      [emojiSequence, chars.digit1],
      [fullwidth, chars.digit2],
      [digitSequence, chars.digit1],
      [digitSequences2, chars.digit4],
      [quickBrownFox, chars.digit3],
      [fooBar, chars.digit3]
    ])('should break sequences longer than `columns` (%#)', (
      thing,
      columns
    ) => {
      // Act
      const result = testSubject(thing, { columns, hard: true })

      // Expect
      expect(result).to.have.property('hard').be.true

      // Expect (line length)
      expect(result.lines).to.each.satisfy((line: string): boolean => {
        return gs.countGraphemes(line) <= result.columns
      })

      // Expect (snapshot)
      expect({
        cols: result.cols,
        columns: result.columns,
        lines: result.lines
      }).toMatchSnapshot()
    })
  })

  describe('options.indent', () => {
    it.each<[
      thing: string,
      columns: number | string,
      indent: number | string
    ]>([
      [quickBrownFox, 20, +chars.digit2],
      [helloWorld, chars.digit7, chars.ht]
    ])('should add indent to each line (%#)', (thing, columns, indent) => {
      // Act
      const result = testSubject(thing, { columns, indent })

      // Expect
      expect(result).to.have.property('indent', margin(indent))

      // Expect (line length)
      expect(result.lines).to.each.satisfy((line: string): boolean => {
        return gs.countGraphemes(line) <= result.columns
      })

      // Expect (snapshot)
      expect({
        cols: result.cols,
        columns: result.columns,
        indent: result.indent,
        lines: result.lines
      }).toMatchSnapshot()
    })
  })

  describe('options.pad*', () => {
    it.each<[
      thing: string,
      columns: number | string,
      padLeft: number | string | null | undefined,
      padRight: number | string | null | undefined
    ]>([
      [emojiSequences, chars.digit3, chars.ht.repeat(2), null],
      [digitSequences, chars.digit5, undefined, chars.space.repeat(4)],
      [quickBrownFox, 20, chars.digit1, chars.digit1]
    ])('should add padding to each line (%#)', (
      thing,
      columns,
      padLeft,
      padRight
    ) => {
      // Act
      const result = testSubject(thing, { columns, padLeft, padRight })

      // Expect
      expect(result).to.have.property('padLeft', margin(padLeft))
      expect(result).to.have.property('padRight', margin(padRight))

      // Expect (line length)
      expect(result.lines).to.each.satisfy((line: string): boolean => {
        return gs.countGraphemes(line) <= result.columns
      })

      // Expect (snapshot)
      expect({
        cols: result.cols,
        columns: result.columns,
        lines: result.lines,
        padLeft: result.padLeft,
        padRight: result.padRight
      }).toMatchSnapshot()
    })
  })

  describe('options.stringify', () => {
    let options: Options
    let stringify: MockInstance<ToString>
    let thing: VFile

    beforeAll(() => {
      thing = new VFile(digitSequences)
    })

    beforeEach(() => {
      stringify = vi.fn(thing.toString.bind(thing)).mockName('stringify')
      options = { stringify } as unknown as Options
    })

    it('should make stringified `thing` subject of wrapping', () => {
      // Act
      const result = testSubject(thing, chars.digit1, options)

      // Expect
      expect(result).to.have.property('string', digitSequences)
      expect(result).to.have.property('stringify', stringify)
      expect(stringify).toHaveBeenCalledExactlyOnceWith(thing)
    })
  })

  describe('options.trim', () => {
    it.each<[thing: string, columns: number | string]>([
      [lowercaseA, 10],
      [hiWorld, chars.digit2]
    ])('should not trim lines if disabled (%#)', (thing, columns) => {
      // Act
      const result = testSubject(thing, columns, { trim: false })

      // Expect
      expect(result).to.have.property('trim').be.false

      // Expect (snapshot)
      expect({
        cols: result.cols,
        columns: result.columns,
        lines: result.lines
      }).toMatchSnapshot()
    })
  })
})
