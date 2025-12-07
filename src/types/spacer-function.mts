/**
 * @file Type Aliases - SpacerFunction
 * @module string-wrap/types/SpacerFunction
 */

/**
 * Get a spacer configuration for the line at `index`.
 *
 * Spacers can be used to indent a line, and/or pad either side of it.
 *
 * @template {number | string | null | undefined} [T]
 *  The spacer configuration
 *
 * @this {void}
 *
 * @param {number} index
 *  The index of the current line
 * @param {ReadonlyArray<string> | null | undefined} [lines]
 *  The current list of lines
 * @return {T}
 *  The spacer configuration
 */
type SpacerFunction<
  T extends number | string | null | undefined =
    | number
    | string
    | null
    | undefined
> = (
  this: void,
  index: number,
  lines?: readonly string[] | null | undefined
) => T

export type { SpacerFunction as default }
