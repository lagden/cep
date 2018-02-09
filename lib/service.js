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

async function service(method, args) {
	try {
		const client = await createClientAsync(wsdl, wsdlOptions)
		const result = await client[`${method}Async`](args, {method: 'POST'})
		result.return.success = true
		result.return.status = 200
		return result.return
	} catch (err) {
		const r = dict[err.message]
		const base = {success: false, status: 500, message: err.message}
		const data = {...base, ...r}
		throw new CepError(data.message, data)
	}
}

module.exports = service
