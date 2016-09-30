'use strict';

import test from 'ava';
import cep from '../index';

test.cb('cep', t => {
	t.plan(2);
	cep('09715-295')
		.then(r => {
			t.true(r.success);
			t.is(r.end, 'Rua Primo Modolin');
			t.end();
		});
});

test.cb('number', t => {
	t.plan(2);
	cep(70165900)
		.then(r => {
			t.true(r.success);
			t.is(r.end, 'Praça dos Três Poderes');
			t.end();
		});
});

test.cb('not found', t => {
	t.plan(2);
	cep('00000-000')
		.catch(err => {
			t.false(err.success);
			t.is(err.message, 'CEP não encontrado');
			t.end();
		});
});

test.cb('invalid', t => {
	t.plan(2);
	cep('0000000')
		.catch(err => {
			t.false(err.success);
			t.is(err.message, 'CEP deve conter 8 dígitos');
			t.end();
		});
});
