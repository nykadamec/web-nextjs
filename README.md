# Image Description Analyzer - Next.js

Aplikace pro analýzu a popis obrázků pomocí různých AI modelů (OpenAI, Gemini).

## 🚀 Rychlý start

### 1. Instalace závislostí

```bash
cd web-nextjs
npm install
# nebo
pnpm install
```

### 2. Nastavení environment variables

Zkopírujte `.env.local` a nastavte vaše API klíče:

```bash
cp .env.local .env.local.example
```

Upravte `.env.local`:

```env
# API Keys
OPENAI_API_KEY="sk-your-openai-api-key"
GEMINI_API_KEY="your-gemini-api-key"

# Database
DATABASE_URL="sqlite:./data/database.db"

# App Settings
NEXT_PUBLIC_APP_URL="http://localhost:4000"
```

### 3. Spuštění aplikace

```bash
npm run dev
# nebo
pnpm dev
```

Aplikace bude dostupná na [http://localhost:4000](http://localhost:4000).

## 🏗️ Architektura

### Frontend
- **Next.js 15** - React framework s App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Ikony

### Backend
- **Next.js API Routes** - Server-side API
- **SQLite** - Databáze pro user settings
- **Better SQLite3** - SQLite driver

### AI Integrace
- **OpenAI GPT-4o-mini** - Vision model
- **Google Gemini** - Multimodal AI
- **Podpora pro custom API klíče**

## 📁 Struktura projektu

```
web-nextjs/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── analyze-image/
│   │   │   ├── settings/
│   │   │   └── upload/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx       # Hlavní stránka
│   ├── components/        # React komponenty
│   ├── hooks/            # Custom hooks
│   └── lib/              # Utility funkce
├── data/                 # SQLite databáze
├── public/              # Statické soubory
└── package.json
```

## 🔧 API Endpointy

### `POST /api/analyze-image`
Analýza obrázku pomocí AI modelu.

**Request:**
```json
{
  "imageUrl": "data:image/jpeg;base64,...",
  "settings": {
    "model": "openai",
    "language": "english",
    "detailLevel": "detailed"
  }
}
```

**Response:**
```json
{
  "success": true,
  "description": "Popis obrázku...",
  "settings": {...}
}
```

### `GET/POST /api/settings`
Správa uživatelských nastavení.

### `POST /api/upload`
Upload obrázků s konverzí na base64.

## 🎯 Funkce

- ✅ **Upload obrázků** - Drag & drop, file picker
- ✅ **AI analýza** - OpenAI GPT-4o-mini, Google Gemini
- ✅ **Konfigurovatelná nastavení** - Jazyk, úroveň detailů, model
- ✅ **Správa API klíčů** - Bezpečné ukládání
- ✅ **Export výsledků** - Copy to clipboard, download
- ✅ **Responsive design** - Mobilní a desktop
- ✅ **TypeScript** - Type safety
- ✅ **Databáze** - Persistence nastavení

## 🔑 Získání API klíčů

### OpenAI
1. Jděte na [OpenAI Platform](https://platform.openai.com/)
2. Vytvořte API klíč
3. Nastavte v `.env.local` nebo v aplikaci

### Google Gemini
1. Jděte na [Google AI Studio](https://aistudio.google.com/)
2. Vytvořte API klíč
3. Nastavte v `.env.local` nebo v aplikaci

## 🚀 Deployment

### Vercel (doporučeno)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t image-analyzer .
docker run -p 4000:4000 image-analyzer
```

## 🔧 Development

### Spuštění testů
```bash
npm run test
```

### Type checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## 📝 Changelog

Viz [changelog.md](../changelog.md) pro historii změn.

## 🤝 Přispívání

1. Fork projektu
2. Vytvořte feature branch
3. Commitněte změny
4. Pushněte do branch
5. Otevřete Pull Request

## 📄 Licence

MIT License - viz LICENSE soubor.
