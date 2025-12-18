/**
 * @file Type Aliases - Columns
 * @module string-wrap/types/Columns
 */

import type { ColumnsFunction } from '@flex-development/string-wrap'

/**
 * Union of column configurations.
 *
 * @see {@linkcode ColumnsFunction}
 */
type Columns = ColumnsFunction | number | string

export type { Columns as default }
