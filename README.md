# Projeto Backend Node.js

Este repositório fornece um ponto de partida para projetos Node.js no backend, apresentando duas branches principais. Na branch main, encontra-se um template básico com estrutura organizada e configurações iniciais. Por outro lado, a branch auth estende esse template ao incluir um sistema básico de autenticação, sendo ideal para projetos que demandam funcionalidades de login e controle de acesso desde o início. Além disso você pode escolher entre as branches para começar com um projeto simples ou com autenticação integrada. Contribuições são bem recebidas, seja para relatar problemas, sugerir melhorias ou enviar pull requests. 

Este é um projeto backend Node.js que utiliza Express e MongoDB. O projeto possui duas branches principais:

- **main**: Contém o código base com uma rota de teste.
- **auth**: Expande o código da branch `main` para incluir autenticação, rotas de login e manipulação de usuários.

## Como Executar

### Instalação de Dependências

```bash
npm install
```

### Configuração do Ambiente

```env
MONGO_URL=sua_url_do_mongodb
PORT=3000
DB_NAME=seu_nome_de_banco_de_dados
JWT_SECRET=sua_chave_secreta_para_jwt
```

### Execução do Servidor (Branch: main)

```bash
npm start
```

### Execução do Servidor (Branch: auth)

```bash
git checkout auth
npm start
```
