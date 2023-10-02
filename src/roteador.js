const express = require('express');
const { listarContas, criarConta, atualizarConta, excluirConta, depositarConta, sacarConta, transferirSaldo, consultarSaldo, consultarExtrato } = require('./controladores/banco');
const { validarSenha, validarCampos, validarDeposito, validarSaque, validarTransferencia, verificacaoSaldo } = require('./intermediarios');
const rotas = express();

rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', validarCampos, criarConta);
rotas.put('/contas/:numeroConta/usuario', validarCampos, atualizarConta);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.post('/transacoes/depositar', validarDeposito, depositarConta);
rotas.post('/transacoes/sacar', validarSaque, sacarConta);
rotas.post('/transacoes/transferir', validarTransferencia, transferirSaldo);
rotas.get('/contas/saldo', verificacaoSaldo, consultarSaldo);
rotas.get('/contas/extrato', verificacaoSaldo, consultarExtrato);

module.exports = rotas;