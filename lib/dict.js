'use strict'

const dict = Object.create(null)

dict['CEP NAO ENCONTRADO'] = {
	status: 404,
	message: 'CEP não encontrado'
}

dict['BUSCA DEFINIDA COMO EXATA, 0 CEP DEVE TER 8 DIGITOS'] = {
	status: 400,
	message: 'CEP deve conter 8 dígitos'
}

module.exports = dict
