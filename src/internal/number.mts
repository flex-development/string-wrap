/**
 * @file Internal - number
 * @module string-wrap/internal/number
 */

/**
 * Parse a number.
 *
 * @internal
 *
 * @this {void}
 *
 * @param {number | string} value
 *  The value to parse
 * @return {number}
 *  The parsed number
 */
function number(this: void, value: number | string): number {
  /**
   * The parsed number.
   *
   * @var {number} num
   */
  let num: number = +value

  // check if `value` is a key of `Number`.
  if (
    typeof value === 'string' &&
    value in Number &&
    typeof Number[value as never] === 'number'
  ) {
    num = Number[value as keyof typeof Number] as number
  }

  return num
}

export default number
