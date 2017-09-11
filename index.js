'use strict'

const service = require('./lib/service')

function consulta(cep) {
	return service('consultaCEP', {cep})
}

module.exports = consulta
