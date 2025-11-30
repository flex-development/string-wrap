/**
 * @file Internal - margin
 * @module string-wrap/internal/margin
 */

import { chars } from '@flex-development/fsm-tokenizer'

/**
 * Get a string to use for creating space on either side of a line.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {number | string | null | undefined} pad
 *  The size of the string to use for a margin (as a number or numeric),
 *  or a string used for the margin on either side of a line
 * @return {string}
 *  The string to use for padding
 */
function margin(this: void, pad: number | string | null | undefined): string {
  return typeof pad === 'number'
    ? chars.space.repeat(pad)
    : typeof pad === 'string' && pad.trim() && !Number.isNaN(+pad)
    ? chars.space.repeat(+pad)
    : pad ?? chars.empty
}

export default margin
