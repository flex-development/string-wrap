# string-wrap

[![ci](https://github.com/flex-development/string-wrap/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/flex-development/string-wrap/actions/workflows/ci.yml)
[![github release](https://img.shields.io/github/v/release/flex-development/string-wrap.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/string-wrap/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/string-wrap.svg)](https://npmjs.com/package/@flex-development/string-wrap)
[![npm downloads](https://img.shields.io/npm/dm/@flex-development/string-wrap.svg)](https://www.npmcharts.com/compare/@flex-development/string-wrap?interval=30)
[![install size](https://packagephobia.now.sh/badge?p=@flex-development/string-wrap)](https://packagephobia.now.sh/result?p=@flex-development/string-wrap)
[![codecov](https://codecov.io/gh/flex-development/string-wrap/graph/badge.svg?token=WnG7sE7HVw)](https://codecov.io/gh/flex-development/string-wrap)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/string-wrap.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits\&logoColor=ffffff)](https://conventionalcommits.org)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript\&logoColor=ffffff)](https://typescriptlang.org)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat\&logo=vitest\&logoColor=ffffff)](https://vitest.dev)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat\&logo=yarn\&logoColor=ffffff)](https://yarnpkg.com)

Wrap a string

## Contents

- [What is this?](#what-is-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`lines(thing, config[, options])`](#linesthing-config-options)
  - [`wrap(thing, config[, options])`](#wrapthing-config-options)
- [Types](#types)
  - [`Config`](#config)
  - [`LinePadding`](#linepadding)
  - [`LinesInfo`](#linesinfo)
  - [`Options`](#options)
  - [`StripAnsi`](#stripansi)
  - [`ToString<[T]>`](#tostringt)
- [Contribute](#contribute)

## What is this?

**TODO**: what is this?

## Install

This package is [ESM only][esm].

In Node.js with [yarn][]:

```sh
yarn add @flex-development/string-wrap
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import { wrap } from 'https://esm.sh/@flex-development/string-wrap'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { wrap } from 'https://esm.sh/@flex-development/string-wrap'
</script>
```

With [bun][]:

```sh
bun add @flex-development/string-wrap
```

<blockquote>
  <small>
    See <a href='https://bun.com/docs/cli/add'><code>bun add</code></a> for more details.
  </small>
</blockquote>

## Use

**TODO**: use

## API

This package exports the following identifiers:

- [`lines`](#linesthing-config-options)
- [`wrap`](#wrapthing-config-options)

The default export is [`wrap`](#wrapthing-config-options).

### `lines(thing, config[, options])`

Get info about the lines of a wrapped string.

#### Overloads

- `lines(thing: unknown, config: number | string, options?: Options | null | undefined): LinesInfo`
- `lines(thing: unknown, config: Config | number | string): LinesInfo`

##### Parameters

- `thing` (`unknown`)
  — the thing to wrap. non-string values will be converted to strings
- `config` ([`Config`](#config) | `number` | `string`)
  — the wrap configuration or the number of columns to wrap the string to
- `options` ([`Options`](#options) | `null` | `undefined`, `optional`)
  — options for wrapping

##### Returns

([`LinesInfo`](#linesinfo)) Info about the lines forming the wrapped string

### `wrap(thing, config[, options])`

Wrap a string to the specified column width.

#### Overloads

- `wrap(thing: unknown, config: number | string, options?: Options | null | undefined): string`
- `wrap(thing: unknown, config: Config | number | string): string`

##### Parameters

- `thing` (`unknown`)
  — the thing to wrap. non-string values will be converted to strings
- `config` ([`Config`](#config) | `number` | `string`)
  — the wrap configuration or the number of columns to wrap the string to
- `options` ([`Options`](#options) | `null` | `undefined`, `optional`)
  — options for wrapping

##### Returns

(`string`) The wrapped string

## Types

This package is fully typed with [TypeScript][].

### `Config`

String wrapping configuration (`interface`).

### Extends

- [`Options`](#options)

#### Properties

- `columns` (`number` | `string`)
  — the number of columns to wrap the string to

### `LinePadding`

The strings used to pad either side of each line (`type`).

```ts
type LinePadding = [left: string, right: string]
```

### `LinesInfo`

Info about the lines of a wrapped string (`interface`).

#### Properties

- `eol` (`string`)
  — the character, or characters, used to mark the end of a line
- `indent` (`string`)
  — the string used to indent each line
- `lines` (`readonly string[]`)
  — the list of lines forming the wrapped string
- `padding` ([`LinePadding`](#linepadding))
  — the strings used to pad either side of each line

### `Options`

Options for wrapping a string (`interface`).

#### Properties

- `eol?` (`string` | `null` | `undefined`, optional)
  — the character, or characters, used to mark the end of a line
  - default: `'\n'`
- `fill?` (`boolean` | `null` | `undefined`, optional)
  — whether to completely fill each column, splitting words as necessary.\
  by default, splits are made at spaces, ensuring that words aren't broken
  and don't extend past the configured number of `columns`
  > 👉 **note**: setting this to `true` will break words.
- `hard?` (`boolean` | `null` | `undefined`, optional)
  — whether to hard wrap words at the specified number of `columns`.\
  by default, long words remain unbroken and push onto the next line if they don't fit on the current line.\
  setting this to `true` will break long words.
  > 👉 **note**: setting this to `true` will break words.
- `indent?` (`number` | `string` | `null` | `undefined`, optional)
  — the size of the string to use for indenting each line (as a number or numeric), or the string itself
- `padLeft?` (`number` | `string` | `null` | `undefined`, optional)
  — the size of the string to use for padding the left side of each line (as a number or numeric), or the string itself
- `padRight?` (`number` | `string` | `null` | `undefined`, optional)
  — the size of the string to use for padding the right side of each line (as a number or numeric), or the string itself
- `stringify?` ([`ToString`](#tostringt) | `null` | `undefined`, optional)
  — convert a value to a string
- `stripAnsi?` ([`StripAnsi`](#stripansi) | `boolean` | `null` | `undefined`, optional)
  — whether to remove ANSI escape codes before wrapping, or a function to remove ANSI escape codes
- `tabSize?` (`number` | `null` | `undefined`, optional)
  — the number of spaces a tab is equivalent to
  - default: `2`
- `trim?` (`boolean` | `null` | `undefined`, optional)
  — whether to remove whitespace from the end of each line
  > 👉 **note**: lines are trimmed before applying indents or padding.
  - default: `true`

### `StripAnsi`

Remove ANSI escape codes from a string (`type`).

```ts
type StripAnsi = (this: void, string: string) => string
```

#### Parameters

- `string` (`string`)
  — the string containing ANSI escape codes

#### Returns

(`string`) The string with ANSI escape codes removed

### `ToString<[T]>`

Convert `value` to a string (`type`).

```ts
type ToString<T = any> = (this: void, value: T) => string
```

#### Type Parameters

- `T` (`any`, optional)
  — the thing to stringify

#### Parameters

- `value` (`T`)
  — the thing to stringify

#### Returns

(`string`) The stringified `value`

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

<!-- [aec]: https://en.wikipedia.org/wiki/ANSI_escape_code -->

[bun]: https://bun.sh

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[yarn]: https://yarnpkg.com
