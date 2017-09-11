'use strict'

const dict = Object.create(null)

dict['soap:Server: CEP NAO ENCONTRADO'] = {
	status: 404,
	message: 'CEP não encontrado'
}

dict['soap:Server: BUSCA DEFINIDA COMO EXATA, 0 CEP DEVE TER 8 DIGITOS'] = {
	status: 400,
	message: 'CEP deve conter 8 dígitos'
}

module.exports = dict
