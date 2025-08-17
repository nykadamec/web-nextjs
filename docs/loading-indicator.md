# Loading Indicator Component

Modulární komponenta pro zobrazování loading stavů s různými variantami a velikostmi.

## Základní použití

```typescript
import LoadingIndicator from '@/components/LoadingIndicator';

function MyComponent() {
  return (
    <LoadingIndicator 
      size="md" 
      variant="spinner" 
      text="Loading..." 
    />
  );
}
```

## Props

### LoadingIndicatorProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Velikost loading indikátoru |
| `variant` | `'spinner' \| 'dots' \| 'pulse' \| 'bars'` | `'spinner'` | Typ animace |
| `color` | `'primary' \| 'secondary' \| 'white' \| 'gray'` | `'primary'` | Barevné schéma |
| `text` | `string` | `undefined` | Volitelný text pod indikátorem |
| `fullScreen` | `boolean` | `false` | Zobrazit jako fullscreen overlay |
| `className` | `string` | `undefined` | Dodatečné CSS třídy |
| `data-name` | `string` | `'loading-indicator'` | Data atribut pro testování |

## Varianty

### Spinner (výchozí)
Rotující ikona pomocí Lucide React Loader2.

```typescript
<LoadingIndicator variant="spinner" />
```

### Dots
Tři tečky s pulse animací.

```typescript
<LoadingIndicator variant="dots" />
```

### Pulse
Jednoduchý kruh s pulse efektem.

```typescript
<LoadingIndicator variant="pulse" />
```

### Bars
Čtyři sloupce s animovanou výškou.

```typescript
<LoadingIndicator variant="bars" />
```

## Velikosti

### Small (sm)
- Spinner: 16x16px
- Text: text-xs
- Vhodné pro tlačítka a malé komponenty

### Medium (md) - výchozí
- Spinner: 24x24px  
- Text: text-sm
- Univerzální velikost

### Large (lg)
- Spinner: 32x32px
- Text: text-base
- Pro větší komponenty

### Extra Large (xl)
- Spinner: 48x48px
- Text: text-lg
- Pro celostránkové loading

## Barevná schémata

### Primary
Modrá barva (`text-blue-600 dark:text-blue-400`)

### Secondary  
Šedá barva (`text-gray-600 dark:text-gray-400`)

### White
Bílá barva pro tmavé pozadí

### Gray
Neutrální šedá

## Specializované komponenty

### FullScreenLoader
Fullscreen overlay s loading indikátorem.

```typescript
import { FullScreenLoader } from '@/components/LoadingIndicator';

<FullScreenLoader text="Loading application..." />
```

### ButtonLoader
Malý spinner pro tlačítka.

```typescript
import { ButtonLoader } from '@/components/LoadingIndicator';

<button disabled={loading}>
  {loading ? <ButtonLoader /> : 'Submit'}
</button>
```

### CardLoader
Loading placeholder pro karty.

```typescript
import { CardLoader } from '@/components/LoadingIndicator';

<CardLoader text="Loading content..." />
```

### PageLoader
Celostránkový loading.

```typescript
import { PageLoader } from '@/components/LoadingIndicator';

<PageLoader text="Loading page..." />
```

## Příklady použití

### V tlačítku
```typescript
function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button 
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
    >
      {loading && <ButtonLoader />}
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  );
}
```

### Podmíněné zobrazení
```typescript
function DataComponent({ data, loading }: { data: any[], loading: boolean }) {
  if (loading) {
    return <LoadingIndicator text="Loading data..." />;
  }
  
  return (
    <div>
      {data.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
```

### Fullscreen overlay
```typescript
function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  
  useEffect(() => {
    // Simulace načítání
    setTimeout(() => setInitialLoading(false), 2000);
  }, []);
  
  if (initialLoading) {
    return <FullScreenLoader text="Initializing application..." />;
  }
  
  return <MainApp />;
}
```

### V modalu
```typescript
function SettingsModal({ saving }: { saving: boolean }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {saving && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <LoadingIndicator text="Saving settings..." />
          </div>
        )}
        {/* Modal content */}
      </div>
    </div>
  );
}
```

## Accessibility

Komponenta obsahuje správné ARIA atributy:

- `role="status"` - označuje loading stav
- `aria-live="polite"` - oznámí změny screen readeru
- `aria-label` - popisuje účel loading indikátoru

## Dark Mode

Všechny varianty podporují dark mode pomocí Tailwind CSS dark: prefixu.

## Animace

### CSS Animace
- `animate-spin` - rotace pro spinner
- `animate-pulse` - pulse efekt pro dots a pulse varianty
- Vlastní timing pro bars variantu

### Performance
- Používá CSS animace místo JavaScript
- Optimalizováno pro 60fps
- Respektuje `prefers-reduced-motion`

## Customizace

### Vlastní barvy
```typescript
<LoadingIndicator 
  className="text-red-500 dark:text-red-400"
  variant="spinner"
/>
```

### Vlastní velikost
```typescript
<LoadingIndicator 
  className="w-10 h-10"
  variant="spinner"
/>
```

### Kombinace s jinými komponentami
```typescript
function LoadingCard() {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-center h-32">
        <LoadingIndicator 
          variant="dots" 
          text="Processing..."
          color="secondary"
        />
      </div>
    </div>
  );
}
```
