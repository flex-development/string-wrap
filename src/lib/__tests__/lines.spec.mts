/**
 * @file Unit Tests - lines
 * @module string-wrap/lib/tests/unit/lines
 */

import emojiSequences from '#fixtures/emoji-sequences'
import quickBrownFox from '#fixtures/quick-brown-fox'
import testSubject from '#lib/lines'
import { chars } from '@flex-development/fsm-tokenizer'
import type { Config } from '@flex-development/string-wrap'

describe('unit:lib/lines', () => {
  let keys: string[]

  beforeAll(() => {
    keys = ['columns', 'eol', 'indent', 'lines', 'padLeft', 'padRight']
  })

  it.each<[thing: unknown, config: Config]>([
    [
      emojiSequences,
      {
        columns: chars.digit3,
        eol: chars.crlf,
        indent: chars.digit2
      }
    ],
    [
      quickBrownFox,
      {
        columns: 20,
        padLeft: chars.space,
        padRight: chars.space
      }
    ]
  ])('should return lines info (%#)', (thing, config) => {
    // Act
    const result = testSubject(thing, config)

    // Expect
    expect(result).to.have.keys(keys)
    expect(result).to.have.property('lines').be.frozen

    // Expect (snapshot)
    expect({
      columns: result.columns,
      eol: JSON.stringify(result.eol),
      indent: result.indent,
      lines: result.lines,
      padLeft: result.padLeft,
      padRight: result.padRight
    }).toMatchSnapshot()
  })
})
