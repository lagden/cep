import service from './lib/service.js'

/**
 * Busca por CEP.
 * @param {(string|number)} cep - CEP para a consulta.
 * @return {Object} Os dados do endereço.
 */
function consulta(cep) {
	return service(cep)
}

export default consulta
