# Changelog

All notable changes to this project will be documented in this file.

## [1.3.1] - 2025-08-17

### Fixed
- **Theme Font Colors**: Opraveny barvy písma pro lepší kompatibilitu s dark mode
  - Button komponenta nyní plně podporuje dark mode s správnými barvami
  - Nahrazeny `bg-black` a `text-black` za sémantické barvy (`bg-gray-900`, `text-gray-900`)
  - Přidána podpora pro `dark:focus:ring-offset-gray-900` pro lepší focus indikátory
  - Vylepšen kontrast a čitelnost ve všech theme módech

### Changed
- **Button Component**: Kompletní dark mode podpora
  - Všechny varianty (primary, secondary, outline, ghost) nyní mají dark mode styly
  - Vylepšené focus ring offsety pro dark mode
  - Lepší kontrast a accessibility

### Technical Details
- Aktualizace `src/components/Button.tsx` s dark mode styly
- Oprava barev v `src/app/page.tsx` pro konzistentní theming
- Použití sémantických barev místo absolutních hodnot
- Zachování všech existujících funkcionalit

### Files Modified
- `src/components/Button.tsx` - Přidání dark mode podpory
- `src/app/page.tsx` - Oprava barev pro lepší dark mode kompatibilitu
- `config.json` - Aktualizace verze
- `changelog.md` - Tento záznam

## [1.3.2] - 2025-08-17

### Added
- **Settings Loader**: Specializovaná komponenta pro "Načítám nastavení"
  - Optimalizováno pro české prostředí s výchozím textem "Načítám nastavení..."
  - Kombinace Settings ikony s animovaným Loader2
  - Modré barevné schéma konzistentní s nastavením
  - Předpřipravené varianty: SettingsModalOverlay, InlineSettingsLoader, SettingsCard, SettingsButtonLoader
  - Kompletní dokumentace a accessibility podpora

## [1.3.1] - 2025-08-17

### Added
- **Settings Loading Indicator**: Specializovaný loading indikátor pro nastavení
  - Kontextové animace a zprávy pro různé operace (loading, saving, testing, validating, syncing)
  - Operačně specifické ikony a barvy
  - Podpora overlay režimu pro modální okna
  - Předpřipravené komponenty: SettingsModalLoader, SettingsSaveLoader, APIKeyValidationLoader, ConnectionTestLoader
  - Kompletní dokumentace a accessibility podpora

## [1.3.0] - 2025-08-17

### Fixed
- **API Key Validation**: Opravena chyba s maskovanými API klíči obsahujícími hvězdičky
  - Detekce a varování před maskovanými klíči
  - Validace formátu API klíčů před odesláním
  - Lepší chybové zprávy pro neplatné klíče
- **Deprecated Navigator.platform**: Nahrazeno moderní alternativou

### Added
- **API Key Management System**: Kompletní systém pro správu API klíčů
  - Utility funkce pro validaci a sanitizaci klíčů
  - Detekce maskovaných klíčů s hvězdičkami
  - Bezpečné debug logování bez odhalení skutečných klíčů
  - Prioritní systém (uživatelský > environment klíč)
- **APIKeyInput Component**: Specializovaná komponenta pro API klíče
  - Real-time validace při psaní
  - Show/Hide toggle pro zobrazení klíče
  - Visual feedback (ikony pro validní/nevalidní stav)
  - Detekce a varování před maskovanými klíči
  - Help text s formátem pro každý provider
  - Dark mode podpora
- **Enhanced Error Handling**: Lepší zpracování chyb API klíčů
  - Specifické chybové zprávy pro každý provider
  - Validace před odesláním requestu
  - Debug informace pro troubleshooting

### Changed
- **Settings Modal**: Nahrazení základních inputů APIKeyInput komponentami
  - Lepší UX pro zadávání API klíčů
  - Okamžitá validace a feedback
  - Bezpečnější zobrazení klíčů
- **API Routes**: Vylepšená validace API klíčů
  - Kontrola formátu před použitím
  - Debug logování pro troubleshooting
  - Lepší error handling

### Technical Details
- Nová utility knihovna `src/lib/api-keys.ts`
- Komponenta `APIKeyInput` s kompletní validací
- Debug funkce pro bezpečné logování
- Provider-specific validace (OpenAI, Gemini, Z.AI)
- Detekce a prevence použití maskovaných klíčů

### Files Added
- `src/lib/api-keys.ts` - API key utility funkce
- `src/components/APIKeyInput.tsx` - Specializovaná komponenta pro API klíče
- `docs/api-key-management.md` - Dokumentace správy API klíčů

### Files Modified
- `src/app/api/analyze-image/route.ts` - Vylepšená validace API klíčů
- `src/components/SettingsModal.tsx` - Použití APIKeyInput komponent
- `src/components/index.ts` - Export nových komponent
- `config.json` - Aktualizace verze a komponenty
- `changelog.md` - Tento záznam

## [1.2.0] - 2025-08-17

### Added
- **TypeScript Types**: Kompletní typová definice pro celou aplikaci
  - Globální typy v `src/types/index.ts`
  - Typy pro všechny komponenty, hooks a API
  - Namespace export pro snadnější importy
  - Utility typy pro pokročilé použití
- **Loading Indicator Component**: Modulární loading komponenta
  - 4 varianty animací: spinner, dots, pulse, bars
  - 4 velikosti: sm, md, lg, xl
  - 4 barevná schémata: primary, secondary, white, gray
  - Fullscreen overlay podpora
  - Specializované komponenty: FullScreenLoader, ButtonLoader, CardLoader, PageLoader
  - Kompletní accessibility podpora
  - Dark mode kompatibilita

### Changed
- **Type Safety**: Všechny hooks a komponenty nyní používají TypeScript typy
  - useTheme hook s typovaným return
  - useSettings hook s typovaným return
  - Komponenty s typovanými props
- **Loading States**: Nahrazení inline loading stavů LoadingIndicator komponentou
  - Konzistentní loading UX napříč aplikací
  - Lepší accessibility a screen reader podpora

### Technical Details
- Centralizované typy pro lepší maintainability
- Strict TypeScript konfigurace
- Utility typy pro pokročilé patterns
- Namespace export pro organizaci typů
- Kompletní dokumentace pro LoadingIndicator

### Files Added
- `src/types/index.ts` - Globální typové definice
- `src/components/LoadingIndicator.tsx` - Loading komponenta
- `docs/loading-indicator.md` - Dokumentace loading komponenty

### Files Modified
- `src/hooks/useTheme.ts` - Přidání typů
- `src/hooks/useSettings.ts` - Přidání typů
- `src/components/ThemeToggle.tsx` - Použití globálních typů
- `src/components/SettingsModal.tsx` - Použití globálních typů
- `src/components/index.ts` - Export nových komponent
- `src/app/page.tsx` - Použití LoadingIndicator
- `config.json` - Aktualizace verze a komponenty
- `changelog.md` - Tento záznam

## [1.1.0] - 2025-08-17

### Added
- **Dark Mode Support**: Kompletní implementace dark mode tématu
  - Light, dark a system preference módy
  - Automatická detekce systémového nastavení
  - Persistence v localStorage
  - Smooth přechody mezi tématy
- **Theme Toggle Component**: Nová komponenta pro přepínání témat
  - Cyklické přepínání mezi light/dark/system
  - Ikony pro každý mód (Sun/Moon/Monitor)
  - Tooltip s aktuálním stavem
- **API Keys Input Enhancement**: Změna typu inputů z password na text
  - Lepší UX pro kopírování a editaci API klíčů
  - Zachování všech bezpečnostních opatření

### Changed
- **UI/UX Improvements**: Všechny komponenty nyní podporují dark mode
  - SettingsModal s kompletní dark mode podporou
  - Hlavní stránka s dark mode styly
  - Konzistentní barevná paleta napříč aplikací
- **Tailwind Configuration**: Přidána podpora pro class-based dark mode
- **Theme Colors**: Meta tag pro mobile browsery s podporou dark mode

### Technical Details
- Nový hook `useTheme` pro správu stavu tématu
- Komponenta `ThemeToggle` s podporou všech tří módů
- Aktualizace všech stylů pro dark mode kompatibilitu
- Zachování všech existujících funkcionalit

### Files Modified
- `src/hooks/useTheme.ts` - Nový hook pro správu tématu
- `src/components/ThemeToggle.tsx` - Nová komponenta pro přepínání témat
- `src/components/SettingsModal.tsx` - Aktualizace pro dark mode + změna API inputs
- `src/app/page.tsx` - Přidání ThemeToggle a dark mode stylů
- `src/app/layout.tsx` - Meta tag pro theme-color
- `src/app/globals.css` - CSS proměnné pro dark mode
- `tailwind.config.js` - Konfigurace dark mode
- `config.json` - Aktualizace verze a komponenty
- `changelog.md` - Tento záznam

## [1.0.1] - 2025-08-16

### Added
- **Button Component**: Created modular and reusable Button component
  - Support for multiple variants: primary, secondary, outline, ghost
  - Flexible sizing options: sm, md, lg, full
  - Icon integration with Lucide React
  - Loading states with spinner animation
  - Full TypeScript support with comprehensive prop interfaces
  - Accessibility features (focus management, ARIA attributes)

- **Utility Functions**: Added `cn()` utility for Tailwind CSS class merging
  - Combines `clsx` for conditional classes
  - Uses `tailwind-merge` for deduplication

- **Component Examples**: Created ButtonExamples component showcasing:
  - "Full Size" button with plus icon (outline variant)
  - "Upload New" button (ghost variant)
  - "Settings" button with settings icon (outline variant)
  - Additional variant demonstrations

- **Documentation**: Comprehensive Button component documentation
  - Usage examples and prop descriptions
  - Design system integration examples
  - Accessibility guidelines

- **Dependencies**: Added new packages
  - `clsx@2.1.1` for conditional class names

- **Configuration**:
  - Created `config.json` with app metadata and component configuration
  - Established project structure documentation

### Technical Details
- All components built with TypeScript for type safety
- Tailwind CSS for styling with consistent design system
- Modular architecture with separate files for each component
- Proper error handling and loading states
- Responsive design considerations

### Files Created
- `src/components/Button.tsx` - Main Button component
- `src/components/ButtonExamples.tsx` - Usage examples
- `src/lib/utils.ts` - Utility functions
- `docs/button-component.md` - Component documentation
- `config.json` - Application configuration
- `changelog.md` - This changelog file
