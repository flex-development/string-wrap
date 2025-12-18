/**
 * @file Interfaces - Options
 * @module string-wrap/interfaces/Options
 */

import type { Spacer, StripAnsi, ToString } from '@flex-development/string-wrap'

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
   * A spacer function, the size of the string to use for indenting each line
   * (as a number or numeric), or the string itself.
   *
   * @see {@linkcode Spacer}
   */
  indent?: Spacer | null | undefined

  /**
   * A spacer function, the size of the string to use for padding the left side
   * of each line (as a number or numeric), or the string itself.
   *
   * @see {@linkcode Spacer}
   */
  padLeft?: Spacer | null | undefined

  /**
   * A spacer function, the size of the string to use for padding the right
   * side of each line (as a number or numeric), or the string itself.
   *
   * @see {@linkcode Spacer}
   */
  padRight?: Spacer | null | undefined

  /**
   * Convert a value to a string.
   *
   * @see {@linkcode ToString}
   */
  stringify?: ToString | null | undefined

  /**
   * Whether to remove ANSI escape codes before wrapping,
   * or a function to remove ANSI escape codes.
   *
   * @see {@linkcode StripAnsi}
   */
  stripAnsi?: StripAnsi | boolean | null | undefined

  /**
   * The number of spaces a tab is equivalent to.
   *
   * @default 2
   */
  tabSize?: number | string | null | undefined

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
