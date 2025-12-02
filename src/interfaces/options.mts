/**
 * @file Interfaces - Options
 * @module string-wrap/interfaces/Options
 */

import type { ToString } from '@flex-development/string-wrap'

/**
 * Options for wrapping a string.
 */
interface Options {
  /**
   * The character, or characters, used to mark the end of a line.
   *
   * @default '\n'
   */
  eol?: string | null | undefined

  /**
   * Whether to completely fill each column, splitting words as necessary.
   *
   * By default, splits are made at spaces, ensuring that words aren't broken
   * and don't extend past the configured number of {@linkcode columns}.
   *
   * > 👉 **Note**: Setting this to `true` will break words.
   */
  fill?: boolean | null | undefined

  /**
   * Whether to hard wrap words at the specified number of {@linkcode columns}.
   *
   * By default, long words remain unbroken and push onto the next line if they
   * don't fit on the current line.
   *
   * Setting this to `true` will break long words.
   */
  hard?: boolean | null | undefined

  /**
   * The size of the indent, or a string used to indent each line.
   */
  indent?: number | string | null | undefined

  /**
   * The size of the string to use for padding the left side of each line (as a
   * number or numeric), or the string to use.
   */
  padLeft?: number | string | null | undefined

  /**
   * The size of the string to use for padding the right side of each line (as a
   * number or numeric), or the string to use.
   */
  padRight?: number | string | null | undefined

  /**
   * Convert a value to a string.
   *
   * @see {@linkcode ToString}
   */
  stringify?: ToString | null | undefined

  /**
   * The number of spaces a tab is equivalent to.
   *
   * @default 2
   */
  tabSize?: number | null | undefined

  /**
   * Whether to remove whitespace from the beginning and end of each line.
   *
   * > 👉 **Note**: Lines are trimmed before applying indents or padding.
   *
   * @default true
   */
  trim?: boolean | null | undefined
}

export type { Options as default }
