import tt from '#enums/tt'
import type {} from '@flex-development/fsm-tokenizer'
import type { Config, ToString } from '@flex-development/string-wrap'

declare module '@flex-development/fsm-tokenizer' {
  interface TokenInfo {
    /**
     * The value of the token.
     *
     * @internal
     */
    value?: string | null | undefined
  }

  interface TokenFields {}

  interface TokenTypeMap {
    eoc: tt.eoc
    eol: tt.eol
    sequence: tt.sequence
    space: tt.space
  }

  interface TokenizeContext extends Config {
    /**
     * The number of available columns
     * after accounting for indentation ({@linkcode indent})
     * and padding ({@linkcode padLeft}, {@linkcode padRight}).
     *
     * @internal
     */
    cols: number

    /**
     * The number of columns to wrap the {@linkcode string} to.
     *
     * @internal
     * @override
     */
    columns: number

    /**
     * The character, or characters, used to mark the end of a line.
     *
     * @internal
     * @override
     */
    eol: string

    /**
     * Start a new line.
     *
     * @internal
     *
     * @this {void}
     *
     * @return {undefined}
     */
    flush(this: void): undefined

    /**
     * The string used to indent each line.
     *
     * @internal
     * @override
     */
    indent: string

    /**
     * The current line text without indentation or padding.
     *
     * @internal
     */
    line: string

    /**
     * The list of wrapped lines.
     *
     * @internal
     */
    lines: string[]

    /**
     * The string used to pad the left side of each line.
     *
     * @internal
     * @override
     */
    padLeft: string

    /**
     * The string used to pad the right side of each line.
     *
     * @internal
     * @override
     */
    padRight: string

    /**
     * The string to wrap.
     *
     * @internal
     */
    string: string

    /**
     * Convert a value to a string.
     *
     * @see {@linkcode ToString}
     *
     * @internal
     * @override
     */
    stringify: ToString
  }
}
