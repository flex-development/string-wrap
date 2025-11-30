/**
 * @file Unit Tests - wrap
 * @module string-wrap/lib/tests/unit/wrap
 */

import parsedOptions from '#fixtures/parsed-options'
import testSubject from '#lib/wrap'

describe('unit:lib/wrap', () => {
  it('should return wrapped string', () => {
    // Act
    const result = testSubject(parsedOptions, { columns: 72, hard: true })

    // Expect
    expect(result).to.be.a('string').and.not.empty
    expect(result).toMatchSnapshot()
  })
})
