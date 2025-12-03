# UpNext - Plataforma de Programas de Formação em Tecnologia

Plataforma web para conectar talentos com oportunidades de formação em tecnologia.

Deploy: <https://upnext-seven.vercel.app/>

## Funcionalidades

- Listagem de programas com filtros por categoria, nível e formato
- Sistema de busca por texto
- Detalhes completos de cada programa (requisitos, benefícios, prazos)
- Sistema de favoritos com persistência
- Listagem de instituições parceiras
- Perfil de usuário editável
- Interface responsiva

## Tecnologias

**Frontend:**

- Next.js 15 (App Router)
- TypeScript
- Chakra UI
- Zustand (gerenciamento de estado)
- Framer Motion

**Backend:**

- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite
- Swagger (documentação)

## Configuração de Ambiente

### Frontend

1. **Criar arquivo `.env.local` na raiz do projeto:**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Importante:** Este arquivo não está no repositório (.gitignore). Você precisa criá-lo manualmente.

## Instalação

### Frontend

```bash
git clone <url-do-repositorio>
cd upnext
npm install
# Criar .env.local com a variável acima
npm run dev
```

Acesse: <http://localhost:3000>

### Backend

```bash
cd upnext-backend
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Acesse: <http://localhost:3001>
Documentação: <http://localhost:3001/api-docs>

## Scripts

**Frontend:**

- `npm run dev` - Desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Executa build
- `npm run lint` - Linter

**Backend:**

- `npm run dev` - Desenvolvimento
- `npm run build` - Compila TypeScript
- `npm run start` - Executa build
- `npm run prisma:migrate` - Executar migrações
- `npm run prisma:seed` - Popular banco de dados
- `npm run prisma:studio` - Interface visual do banco

## Estrutura

```
upnext/                         # Frontend
├── src/
│   ├── app/                   # Páginas Next.js
│   ├── components/            # Componentes React
│   ├── services/              # Integração com API
│   ├── hooks/                 # Custom hooks
│   ├── store/                 # Zustand store
│   └── data/                  # Mock data

upnext-backend/                # Backend
├── prisma/
│   ├── schema.prisma         # Schema do banco
│   └── seed.ts               # Dados iniciais
├── src/
│   ├── repositories/         # Acesso ao banco
│   ├── services/             # Lógica de negócio
│   ├── controllers/          # Controllers HTTP
│   ├── routes/               # Rotas da API
│   └── server.ts             # Servidor Express
```

## API Endpoints

### Programs

- GET `/api/programs` - Listar todos
- GET `/api/programs/:id` - Buscar por ID
- POST `/api/programs` - Criar
- PUT `/api/programs/:id` - Atualizar
- DELETE `/api/programs/:id` - Deletar

### Institutions

- GET `/api/institutions` - Listar todas
- GET `/api/institutions/:id` - Buscar por ID
- POST `/api/institutions` - Criar
- PUT `/api/institutions/:id` - Atualizar
- DELETE `/api/institutions/:id` - Deletar

### Users

- GET `/api/users` - Listar todos
- GET `/api/users/:id` - Buscar por ID
- POST `/api/users` - Criar
- PUT `/api/users/:id` - Atualizar
- DELETE `/api/users/:id` - Deletar

### Favorites

- GET `/api/favorites/user/:userId` - Listar favoritos do usuário
- POST `/api/favorites` - Adicionar favorito
- DELETE `/api/favorites/:id` - Remover favorito

## Variáveis de Ambiente

**Frontend (`.env.local`):**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Backend (`.env`):**

```env
DATABASE_URL="file:./dev.db"
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## Arquitetura

O backend segue a arquitetura em camadas:

- **Repository**: Acesso aos dados (Prisma)
- **Service**: Lógica de negócio
- **Controller**: Manipulação HTTP
- **Routes**: Definição de endpoints

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**UpNext** - Conectando talentos com o futuro da tecnologia 🚀
