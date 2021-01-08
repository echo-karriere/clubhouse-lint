<h1 align="center">echo karriere clubhouse-lint</h1>

<p align="center">
   <a href="https://github.com/echo-karriere/clubhouse-lint/actions"><img alt="GitHub Actions Status" src="https://github.com/echo-karriere/clubhouse-lint/workflows/pipeline/badge.svg" /></a>
   <a href="https://www.npmjs.com/package/@echo-karriere/clubhouse-lint"><img alt="npm" src="https://img.shields.io/npm/v/@echo-karriere/clubhouse-lint" /></a>
   <br />
</p>

<p align="center">
   <strong>Husky hook for checking the commit message format</strong>
</p>

<details>
<summary>Table of Contents</summary>
<br />

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->

**Table of Contents**

- [Developing](#developing)
  - [`test`](#test)
- [LICENSE](#license)

<!-- markdown-toc end -->

</details>

## What

We use [Clubhouse](https://clubhouse.io/) as our project management tool and to
ensure that commit messages are consistent we made this utility to check commit
messages when committing.

# Usage

To use you need to have [`husky`](https://github.com/typicode/husky) installed,
then install this package: `yarn add -D @echo-karriere/clubhouse-lint`. Update
the `husky` configuration:

```json
"husky": {
  "hooks": {
    "commit-msg": "clubhouse-lint"
  }
},
```

# Developing

Run `yarn` to install packages and then `yarn dev` to start developing.

To start developing simply run `yarn start` to start the development server.

## `test`

To test our code run `yarn test`. You should also ensure that the code you've
written is up to spec with `yarn lint:ts` and `yarn lint:style`.

# LICENSE

MIT.
