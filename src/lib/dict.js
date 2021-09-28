const dict = new Map()

dict.set('CEP NAO ENCONTRADO', {
	status: 404,
	message: 'CEP não encontrado',
})

dict.set('BUSCA DEFINIDA COMO EXATA, 0 CEP DEVE TER 8 DIGITOS', {
	status: 400,
	message: 'CEP deve conter 8 dígitos',
})

dict.set('CEP INVÁLIDO', {
	status: 400,
	message: 'CEP inválido',
})

export default dict
