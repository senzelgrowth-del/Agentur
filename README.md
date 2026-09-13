This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Canva-Integration

Die Seite `/canva` verbindet ein Canva-Konto über die
[Canva Connect API](https://www.canva.com/developers/docs/connect-api/) und kann
Designs durchsuchen sowie als PNG, JPG, PDF oder PPTX exportieren. Die Seite ist
per `robots: noindex` von der Indexierung ausgenommen.

### Einrichtung

1. Im [Canva Developer Portal](https://www.canva.com/developers/) eine Integration
   anlegen und die Scopes `profile:read`, `design:meta:read`, `design:content:read`
   und `asset:read` aktivieren.
2. Als Redirect-URL `<origin>/api/canva/callback` eintragen
   (lokal: `http://127.0.0.1:3000/api/canva/callback`).
3. `.env.example` nach `.env.local` kopieren und ausfüllen. `CANVA_TOKEN_SECRET`
   verschlüsselt die Tokens im Session-Cookie (`openssl rand -base64 32`).
   Im Deployment (Netlify) dieselben Variablen als Environment Variables setzen.

### Aufbau

| Pfad | Zweck |
| --- | --- |
| `src/lib/canva/config.ts` | Endpunkte, Scopes, Environment-Validierung |
| `src/lib/canva/oauth.ts` | Authorization-Code-Flow mit PKCE, Token-Refresh, Revoke |
| `src/lib/canva/session.ts` | AES-256-GCM-verschlüsselte, httpOnly Session-Cookies |
| `src/lib/canva/client.ts` | API-Client mit automatischem Token-Refresh |
| `src/app/api/canva/*` | Route Handler: connect, callback, disconnect, designs, export |
| `src/app/canva/page.tsx` | UI zum Verbinden, Durchsuchen und Exportieren |

Tokens liegen ausschließlich verschlüsselt im Cookie des Browsers — es gibt keine
serverseitige Datenbank. Canva rotiert Refresh-Tokens, daher wird die Session bei
jedem Refresh neu geschrieben.
