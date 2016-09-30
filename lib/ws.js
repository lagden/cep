'use strict';

const soap = require('soap');
const pify = require('pify');

const createClient = pify(soap.createClient);
const wsdl = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';
const wsdlOptions = {
	overrideRootElement: {
		namespace: 'cli',
		xmlnsAttributes: [{
			name: 'xmlns:cli',
			value: 'http://cliente.bean.master.sigep.bsb.correios.com.br/'
		}]
	}
};

function errorMessages(m) {
	const dict = {
		'soap:Server: CEP NAO ENCONTRADO': 'CEP não encontrado',
		'soap:Server: BUSCA DEFINIDA COMO EXATA, 0 CEP DEVE TER 8 DIGITOS': 'CEP deve conter 8 dígitos'
	};
	return dict[m] || m;
}

function ws(method, args) {
	return createClient(wsdl, wsdlOptions)
		.then(client => pify(client[method])(args, {method: 'POST'}))
		.then(result => {
			result.return.success = true;
			return result.return;
		})
		.catch(err => {
			const message = errorMessages(err.message);
			return Promise.reject({success: false, message});
		});
}

module.exports = ws;
