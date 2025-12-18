import tt from '#enums/tt'
import type {} from '@flex-development/fsm-tokenizer'
import type {
  ColumnsFunction,
  Config,
  SpacerFunction,
  StripAnsi,
  ToString
} from '@flex-development/string-wrap'

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
    ac: number

    /**
     * A function that returns the maximum number of columns per line.
     *
     * @see {@linkcode ColumnsFunction}
     *
     * @internal
     * @override
     */
    columns: ColumnsFunction<number>

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
     * Get the string used to indent a line.
     *
     * @see {@linkcode SpacerFunction}
     *
     * @internal
     * @override
     */
    indent: SpacerFunction<string>

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
     * Get the string used to pad the left side of a line.
     *
     * @see {@linkcode SpacerFunction}
     *
     * @internal
     * @override
     */
    padLeft: SpacerFunction<string>

    /**
     * Get the string used to pad the right side of a line.
     *
     * @see {@linkcode SpacerFunction}
     *
     * @internal
     * @override
     */
    padRight: SpacerFunction<string>

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

    /**
     * Remove ANSI escape codes from a string.
     *
     * @see {@linkcode StripAnsi}
     *
     * @internal
     * @override
     */
    stripAnsi: StripAnsi

    /**
     * The number of spaces a tab is equivalent to.
     *
     * @internal
     * @override
     */
    tabSize: number
  }
}
