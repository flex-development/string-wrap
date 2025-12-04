/**
 * @file Functional Tests - tokenize
 * @module string-wrap/internal/tests/functional/tokenize
 */

import ansiFixture01 from '#fixtures/ansi-fixture-01'
import ansiFixture02 from '#fixtures/ansi-fixture-02'
import ansiFixture03 from '#fixtures/ansi-fixture-03'
import ansiFixture04 from '#fixtures/ansi-fixture-04'
import ansiFixture05 from '#fixtures/ansi-fixture-05'
import ansiFixture07 from '#fixtures/ansi-fixture-07'
import ansiFixture08 from '#fixtures/ansi-fixture-08'
import ansiFixture09 from '#fixtures/ansi-fixture-09'
import ansiFixture10 from '#fixtures/ansi-fixture-10'
import digitSequence from '#fixtures/digit-sequence'
import digitSequence2 from '#fixtures/digit-sequence-2'
import digitSequences from '#fixtures/digit-sequences'
import digitSequences2 from '#fixtures/digit-sequences-2'
import digitsSequences3 from '#fixtures/digit-sequences-3'
import emojiSequence from '#fixtures/emoji-sequence'
import emojiSequences from '#fixtures/emoji-sequences'
import fooBar from '#fixtures/foo-bar'
import fooBar2 from '#fixtures/foo-bar-2'
import fullwidth from '#fixtures/fullwidth'
import helloWorld from '#fixtures/hello-world'
import lowercaseA from '#fixtures/lowercase-a'
import quickBrownFox from '#fixtures/quick-brown-fox'
import spaces from '#fixtures/spaces'
import tagline from '#fixtures/tagline'
import gs from '#internal/gs'
import margin from '#internal/margin'
import testSubject from '#internal/tokenize'
import hrc from '#tests/utils/hrc'
import colors from '@flex-development/colors'
import {
  chars,
  type EventType,
  type Token,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import type {
  Options,
  StripAnsi,
  ToString
} from '@flex-development/string-wrap'
import stripAnsi from '@flex-development/strip-ansi'
import {
  ksort,
  pick,
  shake,
  type JsonObject,
  type JsonValue,
  type ObjectCurly
} from '@flex-development/tutils'
import { VFile } from 'vfile'
import type { MockInstance } from 'vitest'

describe('functional:internal/tokenize', () => {
  let events: (context: TokenizeContext) => [EventType, Token][]
  let keys: string[]
  let lines: (context: TokenizeContext) => string[]
  let snapshot: (result: TokenizeContext, keys?: string[]) => JsonObject

  beforeAll(() => {
    keys = [
      'code',
      'cols',
      'columns',
      'currentConstruct',
      'defineSkip',
      'encoding',
      'eol',
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
      'stripAnsi',
      'token',
      'trim',
      'write'
    ]

    /**
     * Get a snapshot-compliant list of events.
     *
     * @this {void}
     *
     * @param {TokenizeContext} context
     *  The tokenization context
     * @return {[EventType, Token][]}
     *  Snapshot-compliant list of event types and tokens
     */
    events = function events(
      this: void,
      context: TokenizeContext
    ): [EventType, Token][] {
      return context.events.map(event => [
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

    /**
     * Get a snapshot-compliant list of lines.
     *
     * @this {void}
     *
     * @param {TokenizeContext} context
     *  The tokenization context
     * @return {string[]}
     *  Snapshot-compliant list of lines
     */
    lines = function lines(this: void, context: TokenizeContext): string[] {
      return context.lines.map(line => hrc(line))
    }

    /**
     * Create a snapshot-compliant object.
     *
     * @this {void}
     *
     * @param {TokenizeContext} result
     *  The tokenization context
     * @param {string[] | undefined} [keys]
     *  The keys to include
     * @return {JsonObject}
     *  Snapshot-compliant tokenize context
     */
    snapshot = function snapshot(
      this: void,
      result: TokenizeContext,
      keys?: string[] | undefined
    ): JsonObject {
      keys ??= []
      keys.push('cols', 'columns', 'lines', 'string')

      /**
       * The snapshot object.
       *
       * @const {ObjectCurly} snapshot
       */
      const snapshot: ObjectCurly = pick(result, keys)

      if ('events' in snapshot) snapshot['events'] = events(result)
      if ('lines' in snapshot) snapshot['lines'] = lines(result)
      snapshot['candidate'] = JSON.stringify(snapshot['string'])
      delete snapshot['string']

      return ksort(snapshot)
    }
  })

  describe('core', () => {
    it.each<[thing: string, columns: number | string]>([
      [chars.empty, chars.digit1],
      [chars.space.repeat(+chars.digit2), chars.digit2],
      [digitSequences, chars.digit1],
      [digitsSequences3, 15],
      [ansiFixture01, 20],
      [ansiFixture10, chars.digit8]
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
      expect(result).to.have.property('stripAnsi', stripAnsi)
      expect(result).to.have.property('trim', true)
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result, ['events'])).toMatchSnapshot()
    })

    it('should handle ansi that wraps onto multiple lines', () => {
      // Act
      const result = testSubject(ansiFixture02, chars.digit5)

      // Expect
      expect(result).to.have.keys(keys)
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })

    it.each<[thing: JsonValue, columns: number | string]>([
      [quickBrownFox, chars.digit5],
      [ansiFixture01, chars.digit5],
      [ansiFixture03, chars.digit5],
      [ansiFixture05, chars.digit5]
    ])('should not break sequences longer than `columns` (%#)', (
      thing,
      columns
    ) => {
      // Act
      const result = testSubject(thing, columns)

      // Expect
      expect(result).to.have.keys(keys)

      // Expect (line length)
      expect(result.lines).to.satisfy((lines: string[]): boolean => {
        return lines.some(line => stripAnsi(line).length > +columns)
      })

      // Expect (snapshot)
      expect(snapshot(result)).toMatchSnapshot()
    })

    it.each<[thing: string, columns: number | string]>([
      [emojiSequences, chars.digit1],
      [tagline, gs.countGraphemes(tagline)]
    ])('should support emojis (%#)', (thing, columns) => {
      // Act
      const result = testSubject(thing, columns)

      // Expect
      expect(result).to.have.keys(keys)
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })
  })

  describe('options.fill', () => {
    let fill: true

    beforeAll(() => {
      fill = true
    })

    it.each<[thing: string, columns: number | string]>([
      [digitSequence, chars.digit5],
      [digitsSequences3, chars.digit5],
      [digitsSequences3, 15],
      [ansiFixture01, chars.digit5]
    ])('should fill columns and break sequences longer than `columns` (%#)', (
      thing,
      columns
    ) => {
      // Act
      const result = testSubject(thing, { columns, fill })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('fill').be.true
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })

    it.each<[thing: string, columns: number | string]>([
      [digitSequence, chars.digit5],
      [digitsSequences3, chars.digit5],
      [digitsSequences3, 13],
      [ansiFixture01, chars.digit5]
    ])('should work with no trimming (%#)', (
      thing,
      columns
    ) => {
      // Act
      const result = testSubject(thing, { columns, fill, trim: false })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('fill').be.true
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })
  })

  describe('options.hard', () => {
    let hard: true

    beforeAll(() => {
      hard = true
    })

    it.each<[thing: string, columns: number | string]>([
      [ansiFixture01, chars.digit5],
      [digitSequences2, 10],
      [stripAnsi(ansiFixture09), 16],
      [ansiFixture04, chars.digit1],
      [ansiFixture05, chars.digit5],
      [ansiFixture09, 16]
    ])('should break sequences longer than `columns` (%#)', (
      thing,
      columns
    ) => {
      // Act
      const result = testSubject(thing, columns, { hard })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('hard', hard)
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })

    it.each<[thing: string, columns: number | string]>([
      [spaces, chars.digit2],
      [fooBar2, chars.digit3],
      [digitSequence2, chars.digit5],
      [ansiFixture08, 10]
    ])('should handle no trimming', (thing, columns) => {
      // Act
      const result = testSubject(thing, columns, { hard, trim: false })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('hard', hard)
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })

    it('should handle short sequences', () => {
      // Act
      const result = testSubject(fooBar2, chars.digit3, { hard })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('hard', hard)
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })

    it('should merge last line if it only contains ansi', () => {
      // Arrange
      const thing: string = colors.green('helloworld' + chars.space.repeat(2))

      // Act
      const result = testSubject(thing, chars.digit2, { hard })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('hard', hard)
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })

    it('should support emojis', () => {
      // Act
      const result = testSubject(emojiSequence, chars.digit1, { hard })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('hard', hard)
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })

    it('should support fullwidth characters', () => {
      // Act
      const result = testSubject(fullwidth, chars.digit2, { hard })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('hard', hard)
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })
  })

  describe('options.indent', () => {
    it.each<[
      thing: string,
      columns: number | string,
      indent: number | string
    ]>([
      [quickBrownFox, 20, chars.digit2],
      [helloWorld, chars.digit7, chars.space]
    ])('should indent each line (%#)', (thing, columns, indent) => {
      // Act
      const result = testSubject(thing, { columns, indent })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('indent', margin(indent))
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result, ['indent'])).toMatchSnapshot()
    })
  })

  describe('options.pad*', () => {
    it.each<[
      thing: string,
      columns: number | string,
      padLeft: number | string | null | undefined,
      padRight: number | string | null | undefined
    ]>([
      [emojiSequences, chars.digit3, chars.space.repeat(2), null],
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
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('padLeft', margin(padLeft))
      expect(result).to.have.property('padRight', margin(padRight))
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result, ['padLeft', 'padRight'])).toMatchSnapshot()
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

  describe('options.stripAnsi', () => {
    it.each<[
      thing: string,
      columns: number | string,
      stripAnsi: StripAnsi | true
    ]>([
      [ansiFixture01, 20, true],
      [ansiFixture02, 11, stripAnsi]
    ])('should remove ansi escape codes before wrapping (%#)', (
      thing,
      columns,
      stripAnsi
    ) => {
      // Act
      const result = testSubject(thing, columns, { stripAnsi })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('string', result.stripAnsi(thing))
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })
  })

  describe('options.trim', () => {
    it.each<[thing: string, columns: number | string]>([
      [spaces, chars.digit2],
      [digitSequences, chars.digit1],
      [fooBar, 42],
      [lowercaseA, 10],
      [chars.space + lowercaseA, 10],
      [colors.blue(fooBar), 42],
      [fooBar2, chars.digit3],
      [ansiFixture07, 100],
      [colors.bgGreen(`  ${colors.black('ok')}  `), 100],
      [ansiFixture10, chars.digit8]
    ])('should not trim lines if disabled (%#)', (thing, columns) => {
      // Act
      const result = testSubject(thing, columns, { trim: false })

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('trim').be.false
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })

    it.each<[thing: string, columns: number | string]>([
      [fooBar, chars.digit3],
      [fooBar, chars.digit6],
      [fooBar, 42],
      [colors.red(fooBar), chars.digit6],
      [colors.green(fooBar), 42]
    ])('should trim whitespace only on actual wrapped lines if enabled (%#)', (
      thing,
      columns
    ) => {
      // Act
      const result = testSubject(thing, columns)

      // Expect
      expect(result).to.have.keys(keys)
      expect(result).to.have.property('trim').be.true
      expect(result.lines).to.each.satisfyColumns(result.columns)
      expect(snapshot(result)).toMatchSnapshot()
    })
  })
})
