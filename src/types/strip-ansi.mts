/**
 * @file Type Aliases - StripAnsi
 * @module string-wrap/types/StripAnsi
 */

/**
 * Remove ANSI escape codes from a string.
 *
 * @this {void}
 *
 * @param {string} string
 *  The string containing ANSI escape codes
 * @return {string}
 *  The string with ANSI escape codes removed
 */
type StripAnsi = (this: void, string: string) => string

export type { StripAnsi as default }
