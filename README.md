# Sustain Wear - Applied Software Engineering Assignment

## Setup Guide

- Install dependencies

```bash
npm ci
```

- Run dev server

```bash
npm run dev
```

- Go to the web app on http://localhost:3000

- Create a .env file and put in
```
DATABASE_URL="file:./dev.db"
```

- Run migrate to get the database migrations
```bash
npx prisma migrate deploy
```
