'use strict'

// const {inspect} = require('util')
const {createClientAsync} = require('soap')
const CepError = require('./cep-error')
const dict = require('./dict')
const _faultstring = require('./faultstring')

const wsdl = {
	sandbox: 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl',
	producao: 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
}

async function service(method, args) {
	try {
		const client = await createClientAsync(wsdl.producao)
		const _res = await client[`${method}Async`](args, {method: 'POST'})
		// console.log(inspect(_res, false, null, true))
		const [{return: res}] = _res
		res.success = true
		res.status = 200
		return res
	} catch (error) {
		const faultstring = _faultstring(error)
		const r = dict.has(faultstring) && dict.get(faultstring)
		const base = {success: false, status: 500, message: faultstring}
		const data = {...base, ...r}
		throw new CepError(data.message, data)
	}
}

module.exports = service
