This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Database

Set `DATABASE_URL` in `.env` to your Supabase PostgreSQL connection string.
For migrations, you can optionally set `DIRECT_URL` to a direct or session pooler
connection; Drizzle Kit uses it instead of `DATABASE_URL` when present.
Keep both variables private, without a `NEXT_PUBLIC_` prefix.

Import the database in Node.js Server Components, Server Actions, or Route Handlers:

```ts
import { db } from "@/lib/db";
```

Define tables in `lib/db/schema.ts`. The schema starts empty; no application
tables or migrations have been created.

```bash
npm run db:generate # Generate migrations after defining tables
npm run db:migrate # Apply generated migrations
npm run db:studio # Browse the database locally
```

`npm run db:push` applies schema changes directly, without migration files.
Use generated migrations for production changes and review the SQL before applying.
Commit the generated `drizzle/` migrations alongside schema changes.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
