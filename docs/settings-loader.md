# Settings Loader

Specializovaná loading komponenta pro operaci "Načítám nastavení" s optimalizací pro české prostředí.

## Přehled

`SettingsLoader` je jednoúčelová komponenta navržená specificky pro zobrazení loading stavu při načítání nastavení. Poskytuje konzistentní vizuální zpětnou vazbu s českým textem a ikonografií zaměřenou na nastavení.

## Funkce

- **České lokalizace**: Výchozí text "Načítám nastavení..."
- **Animované ikony**: Kombinace Settings ikony s rotujícím Loader2
- **Flexibilní velikosti**: Malá, střední a velká velikost
- **Overlay podpora**: Možnost zobrazení jako overlay přes obsah
- **Accessibility**: Kompletní ARIA podpora
- **Data atributy**: Testovací data-name atributy

## Základní použití

```tsx
import { SettingsLoader } from '@/components';

// Základní loader
<SettingsLoader />

// S vlastním textem
<SettingsLoader text="Načítám vaše nastavení..." />

// Jako overlay
<SettingsLoader overlay />

// Bez textu
<SettingsLoader showText={false} />
```

## Props

### SettingsLoaderProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost loading indikátoru |
| `showText` | `boolean` | `true` | Zobrazit textový popis |
| `text` | `string` | `'Načítám nastavení...'` | Vlastní text |
| `overlay` | `boolean` | `false` | Zobrazit jako overlay |
| `className` | `string` | - | Dodatečné CSS třídy |
| `data-name` | `string` | `'settings-loader'` | Data atribut pro testování |

## Velikosti

### Small (`sm`)
- Ikona: 16x16px (w-4 h-4)
- Text: text-xs
- Kontejner: 32x32px (w-8 h-8)
- Použití: Tlačítka, inline elementy

### Medium (`md`) - výchozí
- Ikona: 24x24px (w-6 h-6)
- Text: text-sm
- Kontejner: 48x48px (w-12 h-12)
- Použití: Karty, sekce

### Large (`lg`)
- Ikona: 32x32px (w-8 h-8)
- Text: text-base
- Kontejner: 64x64px (w-16 h-16)
- Použití: Celostránkové loadery, modály

## Specializované komponenty

### SettingsModalOverlay

Overlay loader pro modální okna nastavení.

```tsx
import { SettingsModalOverlay } from '@/components';

<SettingsModalOverlay />
```

**Vlastnosti:**
- Automaticky `overlay={true}`
- Velikost `lg`
- Backdrop blur efekt
- Z-index 50

### InlineSettingsLoader

Kompaktní loader pro inline použití.

```tsx
import { InlineSettingsLoader } from '@/components';

<InlineSettingsLoader />
```

**Vlastnosti:**
- Velikost `sm`
- Bez textu (`showText={false}`)
- Transparentní pozadí

### SettingsCard

Loader v kartovém stylu s rámečkem.

```tsx
import { SettingsCard } from '@/components';

<SettingsCard />
```

**Vlastnosti:**
- Minimální výška 200px
- Rámeček a pozadí
- Centrované umístění

### SettingsButtonLoader

Loader pro tlačítka a akční prvky.

```tsx
import { SettingsButtonLoader } from '@/components';

<SettingsButtonLoader />
```

**Vlastnosti:**
- Velikost `sm`
- Bez textu
- Transparentní pozadí
- Bez rámečku

## Příklady použití

### V modálním okně nastavení

```tsx
function SettingsModal() {
  const [loading, setLoading] = useState(true);
  
  return (
    <div className="relative">
      {/* Obsah modálu */}
      <div>...</div>
      
      {/* Loading overlay */}
      {loading && <SettingsModalOverlay />}
    </div>
  );
}
```

### V tlačítku

```tsx
function SaveButton() {
  const [saving, setSaving] = useState(false);
  
  return (
    <button disabled={saving}>
      {saving ? (
        <SettingsButtonLoader />
      ) : (
        'Uložit nastavení'
      )}
    </button>
  );
}
```

### V kartě nastavení

```tsx
function SettingsSection() {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return <SettingsCard text="Načítám sekci nastavení..." />;
  }
  
  return <div>...</div>;
}
```

### Inline v textu

```tsx
function StatusText() {
  return (
    <div className="flex items-center gap-2">
      <InlineSettingsLoader />
      <span>Načítám nastavení...</span>
    </div>
  );
}
```

## Styling

Komponenta používá modré barevné schéma:

- **Primární barva**: `blue-600` / `blue-400` (dark mode)
- **Sekundární barva**: `blue-700` / `blue-300` (dark mode)
- **Pozadí**: `blue-50` / `blue-900/20` (dark mode)
- **Rámeček**: `blue-200` / `blue-800` (dark mode)

### Animace

- **Spinner**: Kontinuální rotace (animate-spin)
- **Ikona**: Pulsování (animate-pulse)
- **Pozadí**: Pulsování (animate-pulse)

## Accessibility

- **ARIA role**: `status` pro oznámení změn stavu
- **ARIA live**: `polite` pro nenásilné oznámení
- **ARIA label**: Automatické labeling s textem
- **Screen reader**: Kompatibilní s čtečkami obrazovky

## Data atributy

Všechny komponenty obsahují testovací atributy:

- `data-name="settings-loader"` - Hlavní kontejner
- `data-name="settings-loader-spinner"` - Rotující loader
- `data-name="settings-loader-settings-icon"` - Settings ikona
- `data-name="settings-loader-text"` - Textový obsah

Specializované komponenty mají vlastní prefixy:
- `settings-modal-overlay`
- `inline-settings-loader`
- `settings-card-loader`
- `settings-button-loader`

## Integrace

Komponenta je navržena pro snadnou integraci s existujícím systémem nastavení:

1. **Nahrazení základních loaderů** v settings kontextu
2. **Konzistentní UX** napříč aplikací
3. **České lokalizace** out-of-the-box
4. **Modulární design** s předpřipravenými variantami

## Best Practices

1. **Používejte správnou velikost** podle kontextu
2. **Overlay sparingly** - neblokujte zbytečně UI
3. **Konzistentní text** - držte se českých konvencí
4. **Testujte accessibility** s čtečkami obrazovky
5. **Kombinujte s feedback** - doplňte o success/error stavy
