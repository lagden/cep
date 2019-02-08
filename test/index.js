'use strict'

import test from 'ava'
import cep from '..'
import faultstring from '../lib/faultstring'

test('cep', async t => {
	const r = await cep('09715-295')
	t.true(r.success)
	t.is(r.status, 200)
	t.is(r.end, 'Rua Primo Modolin')
})

test('number', async t => {
	const r = await cep(70165900)
	t.true(r.success)
	t.is(r.status, 200)
	t.is(r.end, 'Praça dos Três Poderes')
})

test('not found', async t => {
	try {
		await cep('00000-000')
	} catch (error) {
		t.false(error.success)
		t.is(error.status, 400)
		t.is(error.message, 'CEP inválido')
	}
})

test('invalid', async t => {
	try {
		await cep('1234567')
	} catch (error) {
		t.false(error.success)
		t.is(error.status, 400)
		t.is(error.message, 'CEP inválido')
	}
})

test('faultstring', t => {
	const _faultstring = faultstring(new Error('faultstring'))
	t.is(_faultstring, 'faultstring')
})
