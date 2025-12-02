/**
 * @file Internal - takeVisible
 * @module string-wrap/internal/takeVisible
 */

import gs from '#internal/gs'
import { ansiRegex } from '@flex-development/ansi-regex'
import { chars } from '@flex-development/fsm-tokenizer'
import stringWidth from 'string-width'

/**
 * Get the longest prefix of `sequence` that
 * fits within the specified number of `columns`.
 *
 * > 👉 **Note**: ANSI escape codes do not count towards substring width.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {string} sequence
 *  The character sequence
 * @param {number | string} columns
 *  The available number of columns
 * @return {string}
 *  Substring of `sequence` that fits into `columns`
 */
function takeVisible(
  this: void,
  sequence: string,
  columns: number | string
): string {
  if (+columns <= 0) return chars.empty

  /**
   * Regular expression matching ANSI escape codes.
   *
   * @const {RegExp} ansi
   */
  const ansi: RegExp = new RegExp(`^(${ansiRegex().source})`)

  /**
   * List of grapheme clusters.
   *
   * @const {string[]} graphemes
   */
  const graphemes: string[] = gs.splitGraphemes(sequence)

  /**
   * The index of the last grapheme cluster in the substring.
   *
   * @var {number} last
   */
  let last: number = 0

  /**
   * The current visual width of the substring.
   *
   * @var {number} width
   */
  let width: number = 0

  // build substring using graphemes.
  // ansi escape codes do not count towards the width of the substring.
  for (const [index, grapheme] of graphemes.entries()) {
    if (index < last) continue // skip clusters in ansi escape codes.

    /**
     * The visual width of the current grapheme.
     *
     * @const {number} size
     */
    const size: number = stringWidth(grapheme)

    // stop once column limit is reached, but ignore non-printing characters.
    if (width + size > +columns && size) break

    // grapheme cluster fits -- include in substring.
    width += size // increase visual width.
    last = index // capture index of last grapheme cluster in substring.

    /**
     * The remaining graphemes in the {@linkcode sequence}.
     *
     * @const {string[]} rest
     */
    const rest: string[] = last ? graphemes.slice(last + 1) : graphemes

    /**
     * A regular expression match array indicating whether the remaining portion
     * of the {@linkcode sequence} begins with an ANSI escape code.
     *
     * @const {RegExpMatchArray | null} match
     */
    const match: RegExpMatchArray | null = rest.join(chars.empty).match(ansi)

    // move index of last grapheme cluster to end of ansi escape code.
    if (match) last = index + match[0].length
  }

  return graphemes.slice(0, last + 1).join(chars.empty)
}

export default takeVisible
