<h3 align="center">
  <br>
  <img src="https://cdn.rawgit.com/lagden/cep/master/cep.svg" alt="CEP" width="300">
  <br>
  <br>
  <br>
</h3>

# CEP

[![Greenkeeper badge](https://badges.greenkeeper.io/lagden/cep.svg)](https://greenkeeper.io/)
[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![Dependency Status][dep-img]][dep]
[![devDependency Status][devDep-img]][devDep]

[npm-img]:       https://img.shields.io/npm/v/lagden-cep.svg
[npm]:           https://www.npmjs.com/package/lagden-cep
[ci-img]:        https://travis-ci.org/lagden/cep.svg
[ci]:            https://travis-ci.org/lagden/cep
[coveralls-img]: https://coveralls.io/repos/github/lagden/cep/badge.svg?branch=master
[coveralls]:     https://coveralls.io/github/lagden/cep?branch=master
[dep-img]:       https://david-dm.org/lagden/cep.svg
[dep]:           https://david-dm.org/lagden/cep
[devDep-img]:    https://david-dm.org/lagden/cep/dev-status.svg
[devDep]:        https://david-dm.org/lagden/cep#info=devDependencies

Busca por CEP diretamente da API dos Correios  
Inspirado nesse projeto feito em Ruby: https://github.com/prodis/correios-cep


## Instalação

```
$ npm i -S lagden-cep
```


## Uso

```js
const consulta = require('lagden-cep');
consulta('09715-295')
	.then(r => {
		console.log(r.end); // Rua Primo Modolin
	});
```


### API

#### consulta(cep)

Nome        | Tipo                 | Requerido | Default           | Descrição
----------- | -------------------- |:---------:|:-----------------:| ------------
cep         | `string` ou `number` | sim       | -                 | CEP para a consulta


## License

MIT © [Thiago Lagden](http://lagden.in)
