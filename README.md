[![npm](https://img.shields.io/npm/v/content-entry-transform.svg)](https://www.npmjs.com/package/content-entry-transform)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![bundlejs](https://deno.bundlejs.com/?q=content-entry-transform\&badge=detailed)](https://bundlejs.com/?q=content-entry-transform)
[![downloads](http://img.shields.io/npm/dm/content-entry-transform.svg?style=flat-square)](https://npmjs.org/package/content-entry-transform)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/content-entry-transform.svg?style=flat-square)](https://github.com/arlac77/content-entry-transform/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fcontent-entry-transform%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/content-entry-transform/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/content-entry-transform/badge.svg)](https://snyk.io/test/github/arlac77/content-entry-transform)
[![Coverage Status](https://coveralls.io/repos/arlac77/content-entry-transform/badge.svg)](https://coveralls.io/github/arlac77/content-entry-transform)

# content-entry-transform

transform content entries

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [createExpressionTransformer](#createexpressiontransformer)
    *   [Parameters](#parameters)
*   [createPropertiesTransformer](#createpropertiestransformer)
    *   [Parameters](#parameters-1)
*   [transform](#transform)
    *   [Parameters](#parameters-2)

## createExpressionTransformer

Transformer expanding '{{}}' expressions

### Parameters

*   `match` **any**&#x20;
*   `properties` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `"expression"`)

## createPropertiesTransformer

Creates a new transformer.
On match the entry will be assigned new properties as given by propertyDefinitions.

### Parameters

*   `match` &#x20;
*   `propertyDefinitions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `"property"`)
*   `matcher` **Matcher**&#x20;

Returns **Transformer**&#x20;

## transform

Apply transformers.

### Parameters

*   `source` **AsyncIterator\<ContentEntry>**&#x20;
*   `transformers` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<Transformer>**  (optional, default `[]`)
*   `onlyMatching` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** filter out all none matching entries

# install

With [npm](http://npmjs.org) do:

```shell
npm install content-entry-transform
```

# license

BSD-2-Clause
