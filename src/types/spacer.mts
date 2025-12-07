/**
 * @file Type Aliases - Spacer
 * @module string-wrap/types/Spacer
 */

import type { SpacerFunction } from '@flex-development/string-wrap'

/**
 * Union of spacer configurations.
 *
 * Spacers can be used to indent a line, and/or pad either side of it.
 *
 * Valid spacer configurations are functions,
 * sizes (as a number or numeric), or the spacer itself.
 *
 * @see {@linkcode SpacerFunction}
 */
type Spacer = SpacerFunction | number | string

export type { Spacer as default }
