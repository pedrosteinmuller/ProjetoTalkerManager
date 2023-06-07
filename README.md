# Projeto Talker Manager 🗣

Consiste em uma API construída para cadastro de palestrantes, a fim de cadastrar, visualizar, pesquisar, editar e excluir informações. 

* Contruída com Node.js, Express, MySQL e Docker
* Aplicação que obtém informações utilizando o módulo `fs`

### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize os comandos a seguir para inicializar o Docker:

```
docker-compose up -d
docker attach talker_manager
npm install // para instalar as dependências
docker-compose down // para parar completamente a aplicação
```

E utilize o comando a seguir para executar a aplicação:

```
npm start
```

### Endpoints

#### Login

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza login do usuário e retorna o token | http://localhost:3000/login |


Na requisição é necessário informar o seguinte JSON:

```
{
  "email": "email@email.com",
  "password": "123456"
}
```

#### Talker

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna os dados de todos os palestrantes, caso existam | http://localhost:3000/talker |
| `GET` | Retorna os dados de um palestrante específico, caso exista | http://localhost:3000/talker/:id |
| `GET` | Filtra pelo nome dos palestrantes em relação os caracteres passada como query | http://localhost:3000/talker/search |
| `PUT` | Altera os dados de um palestrante específico | http://localhost:3000/talker/:id |
| `POST` | Cria um novo palestrante | http://localhost:3000/talker |
| `DELETE` | Deleta um palestrante específico | http://localhost:3000/talker/:id |



Na requisição do PUT e POST, é necessário informar o seguinte JSON:

```
{
  "name": "Palestrante",
  "age": 30,
  "talk": {
    "watchedAt": "22/104/2022",
    "rate": 6
  }
}
```
