# sweet-cli

This is the command line package for [sweet.js](https://github.com/sweet-js/sweet.js).

For more information about Sweet in general and to read the documentation, see the [website](http://sweetjs.org).

# Getting started

Install @sweet-js/cli via npm:

```sh
$ npm install -g @sweet-js/cli
```

Write your sweet code:

```js
syntax hi = function (ctx) {
  return #`console.log('hello, world!')`;
}
hi
```

And compile:

```sh
$ sjs my_sweet_code.js
console.log('hello, world!')
```
