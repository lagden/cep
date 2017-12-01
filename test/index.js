'use strict'

import test from 'ava'
import cep from '../index'

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
	} catch (err) {
		t.false(err.success)
		t.is(err.status, 404)
		t.is(err.message, 'CEP não encontrado')
	}
})

test('invalid', async t => {
	try {
		await cep('1234567')
	} catch (err) {
		t.false(err.success)
		t.is(err.status, 400)
		t.is(err.message, 'CEP deve conter 8 dígitos')
	}
})
