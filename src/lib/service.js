// import {inspect} from 'node:util'
import {createClientAsync} from 'soap'
import CepError from './cep-error.js'
import dict from './dict.js'
import _faultstring from './faultstring.js'

const wsdl = {
	sandbox: 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl',
	producao: 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl',
}

async function service(method, args) {
	try {
		const client = await createClientAsync(wsdl.producao)
		// // Listener
		// client
		// 	.once('soapError', console.log)
		// 	.once('request', xml => {
		// 		// console.log('request', xml)
		// 		console.log('request', inspect(xml, false, undefined, true))
		// 	})
		// 	.once('response', body => {
		// 		// console.log('response', body)
		// 		console.log('response', inspect(body, false, undefined, true))
		// 	})

		const _response = await client[`${method}Async`](args, {
			method: 'POST',
			timeout: 5000,
		})
		// console.log(inspect(_response, false, undefined, true))
		const [{return: response}] = _response
		response.success = true
		response.status = 200
		return response
	} catch (error) {
		const faultstring = _faultstring(error)
		const r = dict.has(faultstring) && dict.get(faultstring)
		const base = {success: false, status: 500, message: faultstring}
		const data = {...base, ...r}
		throw new CepError(data.message, data)
	}
}

export default service
