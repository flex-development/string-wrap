/**
 * @file Type Aliases - ColumnsFunction
 * @module string-wrap/types/ColumnsFunction
 */

/**
 * Get the maximum number of columns for the line at `index`.
 *
 * > 👉 **Note**: The total number of available columns is calculated from the
 * > maximum number of columns, indentation, and padding.
 *
 * @template {number | string} [T]
 *  The maximum number of columns
 *
 * @this {void}
 *
 * @param {number} index
 *  The index of the current line, or `-1` on init
 * @param {ReadonlyArray<string> | null | undefined} [lines]
 *  The current list of lines
 * @return {T}
 *  The maximum number of columns
 */
type ColumnsFunction<T extends number | string = number | string> = (
  this: void,
  index: number,
  lines?: readonly string[] | null | undefined
) => T

export type { ColumnsFunction as default }
