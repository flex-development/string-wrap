/**
 * @file Fixtures - parsedOptions
 * @module fixtures/parsedOptions
 */

/**
 * A long string containing several sequences and a line break.
 *
 * @type {string}
 */
export default 'Parsed options can be accessed by calling [`.opts<T>()`](#commandoptst) on a [`Command`](#commandinfo) object, and are passed to the command\'s [`action`](#commandactionaction) handler.\nMulti-word options such as `--template-engine` are `camelCased`, becoming `program.opts().templateEngine`, or can be configured to be converted using `snake_case`, becoming `program.opts().template_engine`.'
