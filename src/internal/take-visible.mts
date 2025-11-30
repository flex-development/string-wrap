/**
 * @file Internal - takeVisible
 * @module string-wrap/internal/takeVisible
 */

import gs from '#internal/gs'
import { chars } from '@flex-development/fsm-tokenizer'
import stringWidth from 'string-width'

/**
 * Get the longest prefix of `sequence` that
 * fits within the specified number of `columns`.
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

  for (const [index, grapheme] of graphemes.entries()) {
    /**
     * The visual width of the current grapheme.
     *
     * @const {number} size
     */
    const size: number = stringWidth(grapheme)

    // stop once column limit is reached, but ignore non-printing characters.
    if (size && width + size > +columns) break

    // include grapheme cluster in substring if it fits.
    width += size // increase visual width.
    last = index // capture index of last grapheme cluster in substring.
  }

  return graphemes.slice(0, last + 1).join(chars.empty)
}

export default takeVisible
