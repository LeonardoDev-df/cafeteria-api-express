# ☕ API de Gestão de Pedidos de Cafeteria

Uma API simples e eficiente desenvolvida com **Node.js**, **Express** e **SQLite**, focada no controle de pedidos de uma cafeteria, com funcionalidades como criação de pedidos, atualização de status e listagem por status.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite3](https://www.sqlite.org/index.html)
- [express-validator](https://express-validator.github.io/docs/)

---

## 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/cafeteria-api.git
cd cafeteria-api

Instale as dependências:

npm install

Crie o banco de dados SQLite:

node database/init.js

Inicie o servidor:

node server.js

🔗 Endpoints da API
Base URL: http://localhost:3000/orders

📌 Criar pedido
POST /orders

Body JSON:
json
{
  "cliente": "João",
  "item": "Café com leite",
  "quantidade": 2,
  "observacoes": "Sem açúcar"
}
📌 Listar todos os pedidos
GET /orders

📌 Buscar pedidos por status
GET /orders/status/em-preparo

GET /orders/status/pronto

GET /orders/status/entregue

📌 Atualizar status de um pedido
PUT /orders/:id/status

Body JSON:
json

{
  "status": "Pronto"
}

🗃️ Estrutura do Projeto
pgsql
cafeteria-api/
├── controllers/
│   └── ordersController.js
├── database/
│   ├── database.js
│   └── init.js
├── routes/
│   └── orders.routes.js
├── app.js
└── package.json

💡 Futuras Melhorias
Autenticação de funcionários

Painel de gerenciamento com status em tempo real (Socket.io)

Integração com frontend React

📄 Licença
Este projeto está sob a licença MIT.

✨ Autor
Desenvolvido por Leonardo Lopes Borges 🚀