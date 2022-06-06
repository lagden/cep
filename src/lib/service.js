// import {inspect} from 'node:util'
import got from 'got'
import {transform} from 'camaro'
import CepError from './cep-error.js'
import dict from './dict.js'

const wsdl = {
	sandbox: 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl',
	producao: 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl',
}

async function service(code) {
	try {
		const xml = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="http://cliente.bean.master.sigep.bsb.correios.com.br/"><soap:Body><tns:consultaCEP><cep>${code}</cep></tns:consultaCEP></soap:Body></soap:Envelope>`
		const response = await got.post(wsdl.producao, {
			headers: {
				'Content-Type': 'text/xml; charset=utf-8',
				'User-Agent': '@tadashi/cep:2.1.0',
				SOAPAction: '',
			},
			throwHttpErrors: false,
			body: xml,
		})

		const template = {
			bairro: '//bairro',
			cep: '//cep',
			cidade: '//cidade',
			complemento: '//complemento2',
			endereco: '//end',
			uf: '//uf',
		}

		const templateFault = {
			falha: '//faultstring',
		}

		const dataFault = await transform(response.body, templateFault)
		if (dataFault?.falha && dataFault.falha !== '') {
			throw new Error(dataFault.falha)
		}

		const data = await transform(response.body, template)
		return {
			success: true,
			status: 200,
			...data,
		}
	} catch (error) {
		const r = dict.has(error.message) && dict.get(error.message)
		const b = {
			success: false,
			status: 500,
			message: error.message,
			...r,
		}
		const data = {...b, ...r}
		throw new CepError(data.message, data)
	}
}

export default service
