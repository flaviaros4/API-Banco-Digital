const dados = require('../dados/bancodedados');

let numeroConta = 0;
let saldoInicial = 0;

const listarContas = (req, res) => {
    const { contas } = dados;
    return res.status(200).send(contas);

};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const cpfExiste = dados.contas.find((conta) => conta.usuario.cpf === cpf);
    const emailExiste = dados.contas.find((conta) => conta.usuario.email === email);

    if (cpfExiste || emailExiste) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    }

    numeroConta++;

    novaConta = {
        numero: numeroConta,
        saldo: saldoInicial,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    dados.contas.push(novaConta);

    return res.status(201).send();

};

const atualizarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    const cpfExiste = dados.contas.find((conta) => conta.usuario.cpf === cpf);
    const emailExiste = dados.contas.find((conta) => conta.usuario.email === email);

    if (cpfExiste || emailExiste) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    }

    const encontrarConta = dados.contas.find((conta) => conta.numero === Number(numeroConta));

    if (!encontrarConta) {
        return res.status(400).json({ mensagem: 'Número da conta inválido' });
    }

    encontrarConta.usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    };

    return res.status(201).send();
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const encontrarConta = dados.contas.find((conta) => conta.numero === Number(numeroConta));

    if (isNaN(numeroConta) || numeroConta < dados.contas.length) {
        return res.status(400).json({ mensagem: 'Número da conta inválido' });
    }

    if (saldoInicial > 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    dados.contas.splice(encontrarConta, 1);

    return res.status(204).send();

}

const depositarConta = (req, res) => {
    const { numero_conta, valor } = req.body;

    const encontrarConta = dados.contas.find((conta) => conta.numero === Number(numero_conta));

    if (!encontrarConta) {
        return res.status(400).json({ mensagem: 'Conta não encontrada' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Depósito inválido' });
    }

    encontrarConta.saldo += valor;

    const depositoConta = {
        data: new Date().toLocaleString(),
        numero_conta,
        valor
    };

    dados.depositos.push(depositoConta);

    return res.status(201).json();

}

const sacarConta = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    const encontrarConta = dados.contas.find((conta) => conta.numero === Number(numero_conta));

    if (!encontrarConta) {
        return res.status(400).json({ mensagem: 'Conta não encontrada' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero!' });
    }

    if (isNaN(senha)) {
        return res.status(400).json({ mensagem: 'Senha inválida' });
    }

    if (encontrarConta.saldo < valor) {
        return res.status(400).json({ mensagem: 'Saldo indisponível para saque' });
    }

    encontrarConta.saldo -= valor;

    const saqueConta = {
        data: new Date().toLocaleString(),
        numero_conta,
        valor,
    };

    dados.saques.push(saqueConta);

    return res.status(201).json();

}

const transferirSaldo = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const encontrarContaOrigem = dados.contas.find((conta) => conta.numero === Number(numero_conta_origem));
    const encontrarContaDestino = dados.contas.find((conta) => conta.numero === Number(numero_conta_destino));

    if (!encontrarContaOrigem) {
        return res.status(400).json({ mensagem: 'Conta origem não encontrada' });
    }

    if (!encontrarContaDestino) {
        return res.status(400).json({ mensagem: 'Conta destino não encontrada' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero!' });
    }

    if (isNaN(senha)) {
        return res.status(400).json({ mensagem: 'Senha inválida' });
    }

    if (encontrarContaOrigem.saldo < valor) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' });
    }

    encontrarContaOrigem.saldo -= valor;
    encontrarContaDestino.saldo += valor;



    const transferencia = {
        data: new Date().toLocaleString(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    dados.transferencias.push(transferencia);

    return res.status(201).json();
}

const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    const encontrarConta = dados.contas.find((conta) => conta.numero === Number(numero_conta));


    if (!encontrarConta) {
        return res.status(400).json({ mensagem: 'Conta não encontrada' });
    }
    if (encontrarConta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha inválida' });
    }

    const saldoFormatado = {
        saldo: encontrarConta.saldo
    };

    return res.status(200).json(saldoFormatado);
}

const consultarExtrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    const encontrarConta = dados.contas.find((conta) => conta.numero === Number(numero_conta));

    if (!encontrarConta) {
        return res.status(400).json({ mensagem: 'Conta não encontrada' });
    }
    if (encontrarConta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha inválida' });
    }


    const extrato = {
        depositos: dados.depositos.filter((deposito) => deposito.numero_conta === numero_conta),
        saques: dados.saques.filter((saque) => saque.numero_conta === numero_conta),
        transferenciasEnviadas: dados.transferencias.filter((transferencia) => Number(transferencia.numero_conta_origem) === Number(numero_conta)),
        transferenciasRecebidas: dados.transferencias.filter((transferencia) => Number(transferencia.numero_conta_destino) === Number(numero_conta))
    };

    return res.status(200).json(extrato);
}


module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    excluirConta,
    depositarConta,
    sacarConta,
    transferirSaldo,
    consultarSaldo,
    consultarExtrato
};
