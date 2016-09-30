'use strict';

const ws = require('./lib/ws');

function consulta(cep) {
	return ws('consultaCEP', {cep});
}

module.exports = consulta;
