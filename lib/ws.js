'use strict'

const soap = require('soap')
const pify = require('pify')

const createClient = pify(soap.createClient)
const wsdl = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
const wsdlOptions = {
	overrideRootElement: {
		namespace: 'cli',
		xmlnsAttributes: [{
			name: 'xmlns:cli',
			value: 'http://cliente.bean.master.sigep.bsb.correios.com.br/'
		}]
	}
}

function errorMessages(m) {
	const dict = {
		'soap:Server: CEP NAO ENCONTRADO': {
			status: 404,
			message: 'CEP não encontrado'
		},
		'soap:Server: BUSCA DEFINIDA COMO EXATA, 0 CEP DEVE TER 8 DIGITOS': {
			status: 400,
			message: 'CEP deve conter 8 dígitos'
		}
	}
	return dict[m]
}

function ws(method, args) {
	return createClient(wsdl, wsdlOptions)
		.then(client => pify(client[method])(args, {method: 'POST'}))
		.then(result => {
			result.return.success = true
			result.return.status = 200
			return result.return
		})
		.catch(err => {
			const r = errorMessages(err.message)
			return Promise.reject(Object.assign({success: false, status: 500, message: err.message}, r))
		})
}

module.exports = ws
