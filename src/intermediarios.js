const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (senha_banco != 'Cubos123Bank') {
        return res.status(401).json({ mensagem: 'A senha do banco informada é inválida!' });
    }

    next();
}

const validarCampos = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    next();
}

const validarDeposito = (req, res, next) => {
    const { numero_conta, valor } = req.body;


    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'Número da conta não informado' });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: 'Valor do depósito não informado' });
    }

    next();

}

const validarSaque = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;


    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'Número da conta não informado' });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: 'Valor do depósito não informado' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'Senha não informada' });
    }

    next();
}

const validarTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;


    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: 'Número da conta origem não informado' });
    }

    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: 'Número da conta destino não informado' });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: 'Valor do depósito não informado' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'Senha não informada' });
    }

    next();
}

const verificacaoSaldo = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'Número da conta não informado' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'Senha não informada' });
    }

    next();

}

module.exports = {
    validarSenha,
    validarCampos,
    validarDeposito,
    validarSaque,
    validarTransferencia,
    verificacaoSaldo
};
