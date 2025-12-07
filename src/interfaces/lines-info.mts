/**
 * @file Interfaces - LinesInfo
 * @module string-wrap/interfaces/LinesInfo
 */

import type { SpacerFunction } from '@flex-development/string-wrap'

/**
 * Info about the lines of a wrapped string.
 */
interface LinesInfo {
  /**
   * The character, or characters, used to mark the end of a line.
   */
  eol: string

  /**
   * Get the string used to indent each line.
   *
   * @see {@linkcode SpacerFunction}
   */
  indent: SpacerFunction<string>

  /**
   * The list of lines forming the wrapped string.
   */
  lines: readonly string[]

  /**
   * Get the string used to pad the left side of each line.
   *
   * @see {@linkcode SpacerFunction}
   */
  padLeft: SpacerFunction<string>

  /**
   * Get the string used to pad the right side of each line.
   *
   * @see {@linkcode SpacerFunction}
   */
  padRight: SpacerFunction<string>
}

export type { LinesInfo as default }
