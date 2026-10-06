# Platform Builder AI

AI-powered SaaS platform for generating websites, landing pages, dashboards, and mini-apps using prompts and a visual builder.

## Stack
- Frontend: Next.js + Tailwind
- Backend: NestJS + Prisma
- Database: PostgreSQL
- Cache/Queue: Redis
- Auth: JWT

## Local development

```bash
npm install

docker compose up -d
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

npm run db:generate
npm run db:migrate

npm --workspace apps/api run start:dev
npm --workspace apps/web run dev
```

## Project structure

```text
platform-builder-ai/
├── apps/
│   ├── api/
│   └── web/
├── docker-compose.yml
├── package.json
├── turbo.json
└── README.md
```
