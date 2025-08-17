<div align="center">

# 🔍 Image Description Analyzer

### 🚀 AI-Powered Image Analysis with Next.js

*Upload images and get intelligent descriptions, tags, and safety insights powered by OpenAI and Google Gemini*

</div>

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.1.3-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![pnpm](https://img.shields.io/badge/pnpm-8+-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>

## 📸 Screenshots

<details>
<summary><strong>👆 Click to expand screenshots</strong></summary>

### Upload and analyze
<img src="./docs/screenshots/screenshot-1.png" alt="Upload and analyze interface" width="900" />

### Settings & API key management  
<img src="./docs/screenshots/screenshot-2.png" alt="Settings and API key configuration" width="900" />

### Analysis results
<img src="./docs/screenshots/screenshot-3.png" alt="AI-generated analysis results" width="900" />

</details>

## 🚀 Quick Start

### Prerequisites
- 📦 **Node.js** 18+ 
- 🔧 **pnpm** (recommended - repo uses pnpm lockfile)

### Installation

```bash
# Clone the repository
git clone https://github.com/nykadamec/web-nextjs.git

# Navigate to project directory
cd web-nextjs

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

🌐 **The app will be available at** [`http://localhost:4000`](http://localhost:4000)

### 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | 🏃‍♂️ Start development server (port 4000) |
| `pnpm build` | 🏗️ Build for production |
| `pnpm start` | 🚀 Start production server |
| `pnpm lint` | 🧹 Run ESLint |
| `pnpm typecheck` | 🔍 Run TypeScript checks |
| `pnpm screenshots` | 📷 Generate screenshots with Playwright |

### 📸 Generate Screenshots (Optional)

```bash
# Install Playwright browsers (one-time setup)
pnpm exec playwright install --with-deps

# Generate fresh screenshots
pnpm screenshots
```

## ✨ Features

- 🖼️ **Image Upload** - Drag & drop or file picker support
- 🤖 **AI Analysis** - Generate descriptions, tags, and safety scores
- 🔑 **API Management** - Secure local storage of provider keys
- 💾 **Persistent History** - SQLite database for settings and history
- 🎨 **Modern UI** - Clean, responsive design with dark mode
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized assets

## ⚙️ Configuration

### 🔐 API Keys
- Manage provider API keys directly in the app
- Settings are persisted to `data/database.db`
- See [`docs/api-key-management.md`](docs/api-key-management.md) for detailed setup

### 🌐 Environment Variables (Optional)
If you prefer environment-based configuration, create `.env.local`:

```env
# API Keys
OPENAI_API_KEY="sk-your-openai-key"
GEMINI_API_KEY="your-gemini-key"

# Database
DATABASE_URL="sqlite:./data/database.db"

# App Settings  
NEXT_PUBLIC_APP_URL="http://localhost:4000"
```

## 📁 Project Structure

```
web-nextjs/
├── 📂 src/
│   ├── 📂 app/              # Next.js app routes and pages
│   ├── 📂 components/       # Reusable React components
│   ├── 📂 hooks/           # Custom React hooks
│   └── 📂 lib/             # Utilities and database access
├── 📂 data/                # SQLite database storage
├── 📂 docs/                # Documentation and screenshots
└── 📂 scripts/             # Build and utility scripts
```

## 🧪 Testing

Unit tests are located in `src/lib/__tests__/`.

```bash
# Run type checking
pnpm typecheck

# Run linting
pnpm lint
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔀 **Open** a Pull Request

### 📝 Guidelines
- Open an issue first for major changes
- Add tests for new functionality where applicable
- Follow the existing code style
- Update documentation as needed

## 🔒 Privacy & Security

> **⚠️ Important Notice**
> 
> This application may send images or derived text to third-party AI providers (OpenAI, Google Gemini) depending on your configuration. 
> 
> **Do not upload sensitive, private, or confidential content** unless you trust the configured AI provider and understand their data handling policies.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**

[⭐ Star this repo](https://github.com/nykadamec/web-nextjs) • [🐛 Report Bug](https://github.com/nykadamec/web-nextjs/issues) • [💡 Request Feature](https://github.com/nykadamec/web-nextjs/issues)

</div>
    "language": "english",
