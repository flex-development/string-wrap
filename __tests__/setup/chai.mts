/**
 * @file Test Setup - chai
 * @module tests/setup/chai
 * @see https://chaijs.com
 */

import each from '#tests/plugins/chai/each'
import satisfyColumns from '#tests/plugins/chai/satisfy-columns'
import { chai } from 'vitest'

/**
 * initialize chai plugins.
 */
chai.use(each)
chai.use(satisfyColumns)
