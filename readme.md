<h3 align="center">
  <br>
  <img src="https://cdn.rawgit.com/lagden/cep/master/cep.svg" alt="CEP" width="300">
  <br>
  <br>
  <br>
</h3>

# CEP

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[![XO code style][xo-img]][xo]
[![Snyk badge][snyk-img]][snyk]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/cep.svg
[npm]:             https://www.npmjs.com/package/@tadashi/cep
[ci-img]:          https://github.com/lagden/cep/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/cep/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/cep/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/cep?branch=master
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo
[snyk-img]:        https://snyk.io/test/github/lagden/cep/badge.svg
[snyk]:            https://snyk.io/test/github/lagden/cep


Busca por CEP diretamente da API dos Correios.  
Inspirado [nesse](https://github.com/prodis/correios-cep) projeto feito em Ruby.


## Instalação

```
$ npm i -S @tadashi/cep
```


## Uso

```js
import cep from '@tadashi/cep'

const response = await cep('01311-922')
console.log(response.endereco) // Avenida Paulista
```


## API

### consulta(cep: string): object

Nome   | Tipo     | Descrição
------ | -------- | ------------
cep    | string   | CEP para a consulta


#### Response

Nome        | Tipo
------      | --------
bairro      | string
cep         | string
cidade      | string
complemento | string
endereco    | string
uf          | string


## License

MIT © [Thiago Lagden](https://github.com/lagden)
