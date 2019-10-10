'use strict'

function faultstring(_error) {
	let faultstring
	try {
		({root: {Envelope: {Body: {Fault: {faultstring}}}}} = _error)
	} catch {
		faultstring = _error.message
	}
	return faultstring
}

module.exports = faultstring
