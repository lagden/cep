'use strict'

const {createClientAsync} = require('soap')
const CepError = require('./cep-error')
const dict = require('./dict')

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

function service(method, args) {
	return createClientAsync(wsdl, wsdlOptions)
		.then(client => client[`${method}Async`](args, {method: 'POST'}))
		.then(result => {
			result.return.success = true
			result.return.status = 200
			return result.return
		})
		.catch(err => {
			const r = dict[err.message]
			const data = Object.assign({}, {success: false, status: 500, message: err.message}, r)
			return Promise.reject(new CepError(data.message, data))
		})
}

module.exports = service