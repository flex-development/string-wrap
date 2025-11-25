/**
 * @file E2E Tests - api
 * @module string-wrap/tests/e2e/api
 */

import * as testSubject from '@flex-development/string-wrap'
import { alphabetize, identity } from '@flex-development/tutils'

describe('e2e:string-wrap', () => {
  it('should expose public api', () => {
    expect(alphabetize(Object.keys(testSubject), identity)).toMatchSnapshot()
  })
})
