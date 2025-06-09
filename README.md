## 🔗 URL Shortener API

API RESTful para encurtamento de URLs com autenticação de usuários.    
O projeto está rodando em produção através de um web service criado no [render](https://render.com/)    

### Documentação:    
Você pode acessar por esse URL encurtado que redireciona para a documentação:    
[https://backend-challenge-a8wt.onrender.com/N8MRVE](https://backend-challenge-a8wt.onrender.com/N8MRVE)    

## Checklist de features do projeto

[x] Implementado com a última versão estável do Node: 22.16.0  
[x] API RESTful com NestJS
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

## TODO list

[ ] Adicionar ao endpoint que lista as URLs do usuário parâmetros como: paginação, filtro por data e ordenação   
[ ] Teste e2e

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

### 6. Rodando o projeto com Docker
Copie o arquivo de variáveis de ambiente:
```bash
$ cp .env.example .env
```

Edite o .env se necessário. Certifique-se das informações:
```bash
# Banco de dados (usado pela aplicação)
$ DATABASE_URL=postgresql://postgres:root@db:5432/urlshortener

# Configuração do Docker Compose - Banco de dados PostgreSQL
$ POSTGRES_USER=postgres
$ POSTGRES_PASSWORD=root
$ POSTGRES_DB=urlshortener

# Configuração do script de migração - Usado pelo entrypoint.sh para aguardar o banco
$ DB_HOST=db
$ DB_PORT=5432
$ DB_USER=postgres
```

Suba os containeres
```bash
$ docker-compose up --build
```

Depois caso queira parar os containers e remover também os volumes anônimos criados use:
```bash
$ docker-compose down -v
```

### 7. Acessando a documentação

Você pode acessar a documentação acessando /api, [https://backend-challenge-a8wt.onrender.com/api](https://backend-challenge-a8wt.onrender.com/api)

