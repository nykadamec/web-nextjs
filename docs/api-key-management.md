# API Key Management

Dokumentace pro správu API klíčů v Image Description Analyzer aplikaci.

## Přehled

Aplikace podporuje tři AI poskytovatele:
- **OpenAI** - GPT-4 Vision API
- **Google Gemini** - Gemini Vision API  
- **Z.AI** - Z.AI API

## API Key Validace

### Formáty API klíčů

#### OpenAI
- **Formát**: Začíná `sk-` následované alfanumerickými znaky
- **Délka**: Minimálně 20 znaků
- **Příklad**: `sk-proj-abcd1234...`

#### Google Gemini
- **Formát**: Začíná `AIza` následované alfanumerickými znaky
- **Délka**: Minimálně 20 znaků
- **Příklad**: `AIzaSyAbc123...`

#### Z.AI
- **Formát**: Libovolný formát
- **Délka**: Minimálně 10 znaků

### Validační funkce

```typescript
import { isValidAPIKey, validateAPIKeyWithMessage } from '@/lib/api-keys';

// Základní validace
const isValid = isValidAPIKey('sk-proj-...', 'openai');

// Validace s chybovou zprávou
const result = validateAPIKeyWithMessage('sk-proj-...', 'openai');
if (!result.valid) {
  console.error(result.message);
}
```

## Komponenty

### APIKeyInput

Specializovaná komponenta pro zadávání API klíčů s validací:

```typescript
import APIKeyInput from '@/components/APIKeyInput';

<APIKeyInput
  label="OpenAI API Key"
  placeholder="sk-..."
  value={apiKey}
  onChange={setApiKey}
  provider="openai"
  data-name="openai-key"
/>
```

#### Funkce:
- **Validace v reálném čase** - kontrola formátu při psaní
- **Show/Hide toggle** - možnost zobrazit/skrýt klíč
- **Visual feedback** - ikony pro validní/nevalidní stav
- **Detekce maskovaných klíčů** - varování při hvězdičkách
- **Help text** - nápověda pro formát klíče

## Bezpečnost

### Maskování klíčů

```typescript
import { maskAPIKey } from '@/lib/api-keys';

const masked = maskAPIKey('sk-proj-abcd1234efgh5678');
// Výsledek: "sk-proj-****5678"
```

### Detekce maskovaných klíčů

```typescript
import { isMaskedAPIKey } from '@/lib/api-keys';

const isMasked = isMaskedAPIKey('sk-proj-****5678');
// Výsledek: true
```

### Debug logování

Pro bezpečné logování bez odhalení skutečných klíčů:

```typescript
import { debugAPIKey } from '@/lib/api-keys';

debugAPIKey(apiKey, 'OpenAI', 'user');
// Log: [API-KEY-DEBUG] OpenAI (user): sk-proj-****5678 | Valid: true | Masked: false | Length: 51
```

## Priorita klíčů

Aplikace používá následující prioritu pro API klíče:

1. **Uživatelský klíč** - zadaný v nastavení
2. **Environment klíč** - z `.env.local`

```typescript
import { getAPIKey } from '@/lib/api-keys';

const apiKey = getAPIKey(userKey, envKey, 'openai');
```

## Časté problémy

### 1. Maskované klíče s hvězdičkami

**Problém**: API klíč obsahuje hvězdičky (`*`)
```
sk-proj-************************************************pYEA
```

**Řešení**: Zadejte skutečný API klíč bez hvězdiček

**Detekce**:
```typescript
if (isMaskedAPIKey(apiKey)) {
  console.error('API key appears to be masked');
}
```

### 2. Neplatný formát

**Problém**: API klíč nemá správný formát

**Řešení**: 
- OpenAI: Musí začínat `sk-`
- Gemini: Musí začínat `AIza`
- Zkontrolujte délku klíče

### 3. Prázdný klíč

**Problém**: API klíč není zadán

**Řešení**: Zadejte platný API klíč v nastavení nebo `.env.local`

## Environment Variables

### .env.local
```bash
# API Keys (optional - for development)
OPENAI_API_KEY="sk-proj-your-actual-key-here"
GEMINI_API_KEY="AIzaSyYour-actual-key-here"
ZAI_API_KEY="your-zai-key-here"
```

### Získání API klíčů

#### OpenAI
1. Jděte na [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Vytvořte nový API klíč
3. Zkopírujte celý klíč (začíná `sk-`)

#### Google Gemini
1. Jděte na [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Vytvořte nový API klíč
3. Zkopírujte celý klíč (začíná `AIza`)

## API Route Implementation

### Validace v API route

```typescript
import { getAPIKey, validateAPIKeyWithMessage, debugAPIKey } from '@/lib/api-keys';

// Debug logování
if (userApiKey) {
  debugAPIKey(userApiKey, 'OpenAI', 'user');
}

// Získání platného klíče
const apiKey = getAPIKey(userApiKey, envApiKey, 'openai');

if (!apiKey) {
  const validation = validateAPIKeyWithMessage(userApiKey || envApiKey || '', 'openai');
  return NextResponse.json(
    { error: validation.message || "Valid API key required" },
    { status: 401 }
  );
}
```

## Testing

### Testování validace

```typescript
import { isValidAPIKey } from '@/lib/api-keys';

// Platné klíče
console.log(isValidAPIKey('sk-proj-abcd1234', 'openai')); // true
console.log(isValidAPIKey('AIzaSyAbc123', 'gemini')); // true

// Neplatné klíče
console.log(isValidAPIKey('sk-****1234', 'openai')); // false
console.log(isValidAPIKey('invalid', 'openai')); // false
```

## Troubleshooting

### Debug kroky

1. **Zkontrolujte formát klíče**
   ```typescript
   console.log('Key format:', apiKey.substring(0, 8));
   ```

2. **Zkontrolujte délku**
   ```typescript
   console.log('Key length:', apiKey.length);
   ```

3. **Zkontrolujte maskování**
   ```typescript
   console.log('Is masked:', isMaskedAPIKey(apiKey));
   ```

4. **Použijte debug logování**
   ```typescript
   debugAPIKey(apiKey, 'OpenAI', 'user');
   ```

### Časté chyby

- `Incorrect API key provided` - Neplatný nebo maskovaný klíč
- `API key format is invalid` - Špatný formát klíče
- `API key appears to be masked` - Klíč obsahuje hvězdičky

## Best Practices

1. **Nikdy nelogujte skutečné API klíče**
2. **Používejte maskování pro zobrazení**
3. **Validujte klíče před použitím**
4. **Poskytněte jasné chybové zprávy**
5. **Používejte environment variables pro výchozí klíče**
