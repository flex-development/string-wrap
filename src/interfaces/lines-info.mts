/**
 * @file Interfaces - LinesInfo
 * @module string-wrap/interfaces/LinesInfo
 */

import type { LinePadding } from '@flex-development/string-wrap'

/**
 * Info about the lines of a wrapped string.
 */
interface LinesInfo {
  /**
   * The character, or characters, used to mark the end of a line.
   */
  eol: string

  /**
   * The string used to indent each line.
   */
  indent: string

  /**
   * The list of lines forming the wrapped string.
   */
  lines: readonly string[]

  /**
   * The strings used to pad either side of each line.
   *
   * @see {@linkcode LinePadding}
   */
  padding: LinePadding
}

export type { LinesInfo as default }
