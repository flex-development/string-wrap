/**
 * @file E2E Tests - lib
 * @module string-wrap/lib/tests/e2e
 */

import * as testSubject from '#lib/index'
import { alphabetize, identity } from '@flex-development/tutils'

describe('e2e:lib', () => {
  it('should expose public api', () => {
    expect(alphabetize(Object.keys(testSubject), identity)).toMatchSnapshot()
  })
})
