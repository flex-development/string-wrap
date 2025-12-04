/**
 * @file example
 * @module example
 */

import c from '@flex-development/colors'
import wrap from '@flex-development/string-wrap'

/**
 * The string to wrap.
 *
 * @type {string}
 * @const string
 */
const string = `The ${c.bold(c.italic('quick'))} brown ` +
  c.red('🦊 jumped over ') +
  'the ' +
  c.bold('lazy ') +
  c.green('🐶 and then ran away with the 🦄.')

/**
 * The number of columns to wrap the string to.
 *
 * @type {number}
 * @const columns
 */
const columns = 8

console.log(wrap(string, columns, { indent: 2 }))
