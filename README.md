## 🔗 URL Shortener API

API RESTful para encurtamento de URLs com autenticação de usuários.

## Checklist de features do projeto

[x] Implementado com a última versão estável do Node: 22.16.0  
[x] API RESTful com Node.js (última versão estável)  
[x] Banco de dados relacional com suporte a soft delete (deleted_at)  
[x] Autenticação com e-mail e senha (Bearer Token)  
[x] Cadastro de usuários  
[x] Login de usuários  
[x] Encurtar URL (endpoint público e único)  
[x] Encurtar URL vinculado ao usuário (se autenticado)  
[x] Código encurtado com até 6 caracteres  
[x] Redirecionar e contar acessos ao visitar URL encurtada  
[x] Listar URLs encurtadas por usuário (autenticado)  
[x] Exibir quantidade de cliques por URL  
[x] Atualizar URL original (usuário autenticado)  
[x] Deletar URL (soft delete - apenas marca deleted_at)  
[x] Registro de data de atualização (updated_at) em todos os dados  
[x] Middleware de autenticação protegendo rotas privadas  
[x] Uso de variáveis de ambiente para configs sensíveis (ex: DB, JWT secret)  
[x] Documentação de uso no README (como rodar o projeto)  

## 🚀 Como rodar o projeto

### 1. Clone o repositório
```bash
$ git clone https://github.com/HigorR456/backend-challenge
```

### 2. Instale as dependências

```bash
$ yarn install
```

### 3. Configure o ambiente
```bash
Crie um arquivo .env com as variáveis do arquivo .env.example
```

### 4. Rode as migrations
```bash
$ npx prisma migrate dev
```

### 5. Inicie o projeto
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
