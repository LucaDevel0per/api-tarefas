
# 📝 To-Do App (Fullstack)

Este é um projeto fullstack de gerenciamento de tarefas (to-do list), que permite **criar, listar, editar e excluir tarefas**, com dados salvos em um banco MongoDB. O sistema é composto por:

- 🔙 Backend com Node.js, Express e MongoDB
- 🌐 Frontend com Next.js, React, TailwindCSS e Shadcn UI

---

## 📦 Funcionalidades

- ✅ Criar tarefas com título e descrição
- 📄 Listar todas as tarefas
- 🖊️ Editar tarefas
- 🗑️ Deletar tarefas
- 🧠 Interface intuitiva e moderna
- 🛠️ Integração com API Express + MongoDB Atlas

---

## 📁 Estrutura do Projeto

```bash
📦 api-tarefas/
├── client/           # Frontend (Next.js)
├── server/           # Backend (Express + MongoDB)
└── README.md
```

🚀 Tecnologias Utilizadas

🔙 Backend
- Node.js

- Express

- TypeScript

- MongoDB Atlas

- Mongoose

- dotenv 

- CORS

🌐 Frontend
- React

- Next.js (App Router)

- TailwindCSS

- Shadcn UI

- TypeScript

- Axios

🔧 Como rodar o projeto localmente
1. Clone o repositório
```bash 
git clone https://github.com/LucaDevel0per/api-tarefas.git
cd api-tarefas
```

2. Inicie o backend
```bash
cd server
npm install
cp .env.example .env # configure sua string do MongoDB
npm run dev
```

3. Inicie o frontend
```bash
cd ../client
npm install
npm run dev
```
Acesse: http://localhost:3000

## 📬 Rotas da API (Backend)
### POST /api/tasks
Cria uma nova tarefa.
```json
{
  "title": "Comprar leite",
  "description": "Ir no mercado comprar leite"
}
```

### GET /api/tasks
Lista todas as tarefas.

### GET /api/tasks/:id
Retorna uma tarefa específica.

### PATCH /api/tasks/:id
Atualiza uma tarefa.

### DELETE /api/tasks/:id
Remove uma tarefa.

## 🧪 Testes (em breve)
O backend será testado com Jest + Supertest.

## 💡 Futuras Melhorias
- Autenticação com JWT

- Filtros e categorias para tarefas

- Upload de arquivos e anotações

- Testes automatizados com Jest

- Deploy no Vercel (frontend) e Render (backend)

---

#### 👨‍💻 Desenvolvedor
[LucaDevel0per](https://github.com/LucaDevel0per)

## 📄 Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.