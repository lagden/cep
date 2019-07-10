/**
 * Consulta module.
 * @module consulta
 */

'use strict'

const service = require('./lib/service')

/**
 * Busca por CEP.
 * @param {(string|number)} cep - CEP para a consulta.
 * @return {Object} Os dados do endereço.
 */
function consulta(cep) {
	return service('consultaCEP', {cep})
}

module.exports = consulta
