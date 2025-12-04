/**
 * @file Unit Tests - wrap
 * @module string-wrap/lib/tests/unit/wrap
 */

import ansiFixture01 from '#fixtures/ansi-fixture-01'
import ansiFixture11 from '#fixtures/ansi-fixture-11'
import parsedOptions from '#fixtures/parsed-options'
import testSubject from '#lib/wrap'
import { chars } from '@flex-development/fsm-tokenizer'
import type { Config } from '@flex-development/string-wrap'

describe('unit:lib/wrap', () => {
  it.each<[thing: string, config: Config | number | string]>([
    [ansiFixture01, chars.digit5],
    [ansiFixture11, 60],
    [parsedOptions, { columns: 72, hard: true }]
  ])('should return wrapped string (%#)', (thing, config) => {
    expect(testSubject(thing, config)).toMatchSnapshot()
  })
})
