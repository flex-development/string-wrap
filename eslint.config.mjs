/**
 * @file eslint
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

import fldv from '@flex-development/eslint-config'

/**
 * eslint configuration.
 *
 * @type {import('eslint').Linter.Config[]}
 * @const config
 */
const config = [
  ...fldv.configs.node,
  {
    files: ['**/*.+(cts|mts|ts|tsx)'],
    ignores: ['**/*.{md,mdx}/*.+(cts|mts|ts|tsx)'],
    rules: {
      '@typescript-eslint/restrict-template-expressions': [
        2,
        {
          allow: [
            {
              from: 'file',
              name: ['Error', 'URL', 'URLSearchParams']
            },
            {
              from: 'lib',
              name: ['Error', 'URL', 'URLSearchParams']
            }
          ],
          allowAny: false,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true
        }
      ]
    }
  },
  {
    files: ['src/constructs/*.mts'],
    rules: {
      'unicorn/no-this-assignment': 0
    }
  }
]

export default config
