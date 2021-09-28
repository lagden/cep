class CepError extends Error {
	constructor(message, {status, success}) {
		super(message)
		this.name = 'CepError'
		this.status = status
		this.success = success
	}
}

export default CepError
