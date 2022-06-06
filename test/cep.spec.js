import test from 'ava'
import cep from '../src/cep.js'

test('cep', async t => {
	const r = await cep('09715-295')
	t.true(r.success)
	t.is(r.status, 200)
	t.is(r.endereco, 'Rua Primo Modolin')
})

test('bairro', async t => {
	const r = await cep('02226-040')
	t.true(r.success)
	t.is(r.status, 200)
	t.is(r.bairro, 'Jardim Brasil (Zona Norte)')
})

test('number', async t => {
	const r = await cep(70_165_900)
	t.true(r.success)
	t.is(r.status, 200)
	t.is(r.endereco, 'Praça dos Três Poderes')
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
