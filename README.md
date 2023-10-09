# API de Banco Digital - Desafio Cubos Academy

Este é um projeto piloto de uma API RESTful para um Banco Digital, desenvolvido como parte de um desafio da Cubos Academy. A API permite realizar diversas operações bancárias, como criar conta bancária, listar contas, atualizar dados do usuário da conta, excluir uma conta, depositar, sacar, transferir valores entre contas, consultar o saldo da conta e emitir extrato bancário.

## Visão Geral

Este projeto é uma implementação de uma API para um Banco Digital. Ele oferece uma série de funcionalidades bancárias, incluindo:

- Criar conta bancária.
- Listar contas bancárias.
- Atualizar informações do usuário da conta.
- Excluir uma conta bancária.
- Depositar dinheiro em uma conta bancária.
- Sacar dinheiro de uma conta bancária.
- Transferir dinheiro entre contas bancárias.
- Consultar o saldo de uma conta.
- Emitir um extrato bancário.

## Requisitos

- Node.js (v12 ou superior) instalado
- npm (Node Package Manager) instalado
- Git (opcional, caso queira clonar o repositório)

# Endpoints da API

## Listar Contas Bancárias

- **Método**: GET
- **Rota**: `/contas?senha_banco=Cubos123Bank`
- **Descrição**: Lista todas as contas bancárias existentes.

  ![image](https://github.com/flaviaros4/API-Banco-Digital/assets/139448717/1c15ec2f-6178-482d-8eab-c55da0f4f1f6)


## Criar Conta Bancária

- **Método**: POST
- **Rota**: `/contas`
- **Descrição**: Cria uma nova conta bancária com saldo inicial zero.

 ![image](https://github.com/flaviaros4/API-Banco-Digital/assets/139448717/1345afd1-fe2b-40d6-8e9e-8f1fdf71a954)


## Atualizar Usuário da Conta Bancária

- **Método**: PUT
- **Rota**: `/contas/:numeroConta/usuario`
- **Descrição**: Atualiza os dados do usuário de uma conta bancária.

 ![image](https://github.com/flaviaros4/API-Banco-Digital/assets/139448717/c6617074-d32e-4654-aead-965fd8c51f00)

## Excluir Conta Bancária

- **Método**: DELETE
- **Rota**: `/contas/:numeroConta`
- **Descrição**: Exclui uma conta bancária se o saldo for zero.

## Depositar

- **Método**: POST
- **Rota**: `/transacoes/depositar`
- **Descrição**: Realiza um depósito em uma conta bancária e registra a transação.

  ![image](https://github.com/flaviaros4/API-Banco-Digital/assets/139448717/61e855a2-68bb-42df-9aa3-0211d04bc707)


## Sacar

- **Método**: POST
- **Rota**: `/transacoes/sacar`
- **Descrição**: Realiza um saque em uma conta bancária e registra a transação.

 ![image](https://github.com/flaviaros4/API-Banco-Digital/assets/139448717/da2493ee-5ea4-4754-9956-dcd7346b4843)



## Transferir

- **Método**: POST
- **Rota**: `/transacoes/transferir`
- **Descrição**: Realiza uma transferência entre contas bancárias e registra a transação.

![image](https://github.com/flaviaros4/API-Banco-Digital/assets/139448717/c40f8808-73d0-423d-9153-68bd3606875e)


## Saldo

- **Método**: GET
- **Rota**: `/contas/saldo?numero_conta=1&senha=12345`
- **Descrição**: Retorna o saldo de uma conta bancária.

 ![image](https://github.com/flaviaros4/API-Banco-Digital/assets/139448717/39e0988d-2841-40f7-981b-3caf6205f0c3)


## Extrato

- **Método**: GET
- **Rota**: `/contas/extrato?numero_conta=1&senha=12345`
- **Descrição**: Retorna o extrato de transações de uma conta bancária.

![image](https://github.com/flaviaros4/API-Banco-Digital/assets/139448717/d0ac06c5-754a-4ddf-8207-5fa5072016cb)

