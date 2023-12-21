# Projeto Backend Node.js

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
