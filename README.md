# Rick and Morty Components Library

Una librería de componentes React reutilizables basada en Material-UI, diseñada para aplicaciones que utilizan la temática de Rick and Morty.

## 📦 Características

- ✅ Componentes totalmente tipados con TypeScript
- ✅ Basados en Material-UI (MUI)
- ✅ Tema personalizado incluido
- ✅ Cobertura de tests con Vitest (100%)
- ✅ Soporte para React 18 y 19
- ✅ ESM y CommonJS
- ✅ Documentación y ejemplos incluidos

## 🚀 Instalación

### Instalación Global (NPM)

```bash
npm install rick-morty-components-lib
# o con yarn
yarn add rick-morty-components-lib
# o con pnpm
pnpm add rick-morty-components-lib
```

### Instalación Local con Yalc

Para desarrollar y probar la librería localmente en otros proyectos, utiliza [Yalc](https://github.com/whitecolor/yalc).

**En el repositorio de la librería:**

```bash
# Instalar yalc globalmente (si no lo tienes)
npm install -g yalc

# Construir y publicar localmente
pnpm build:publish

# O manualmente
pnpm build
yalc publish
```

**En tu proyecto que quiere usar la librería:**

```bash
# Instalar desde yalc
yalc add rick-morty-components-lib

# O instalar directamente desde la carpeta local
npm install /ruta/absoluta/rick-morty-components-lib
```

**Para actualizar cambios en desarrollo:**

```bash
# En la carpeta de la librería
yalc push

# En el proyecto que usa la librería
yalc update
```

## 🛠️ Desarrollo

### Instalación de Dependencias

```bash
pnpm install
```

### Ejecutar en Modo Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver los componentes.

### Compilar para Producción

```bash
pnpm build
```

Genera los archivos compilados en la carpeta `dist/` en formatos ESM y CommonJS.

### Testing

```bash
# Ejecutar tests en modo watch
pnpm test

# Ver la UI de tests
pnpm test:ui

# Ejecutar tests una sola vez
pnpm test:run

# Generar reporte de cobertura
pnpm test:coverage
```

### Linting

```bash
pnpm lint
```

## 📚 Componentes Exportados

### 1. **Tarjeta** (CardComponent)
Componente para mostrar información de personajes.

```typescript
import { Tarjeta } from 'rick-morty-components-lib';
import type { CardStatus, CardGender, CardVariant } from 'rick-morty-components-lib';

export default function App() {
  const handleFavorite = (id: number, isFavorite: boolean) => {
    console.log(`Personaje ${id} favorito: ${isFavorite}`);
  };

  return (
    <Tarjeta
      id={1}
      name="Rick Sanchez"
      species="Human"
      status="Alive"
      gender="Male"
      location="Earth (C-137)"
      image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
      variant="vertical-normal"
      onFavoriteChange={handleFavorite}
    />
  );
}
```

**Props:**
- `id: number` - ID del personaje
- `name: string` - Nombre del personaje
- `species: string` - Especie del personaje
- `status: CardStatus` - Estado ("Alive", "Dead", "unknown")
- `gender: CardGender` - Género ("Male", "Female", "Genderless", "unknown")
- `location: string` - Última ubicación conocida
- `image: string` - URL de la imagen del personaje
- `variant?: CardVariant` - Variante de diseño ("vertical-normal", "horizontal-normal")
- `onFavoriteChange?: (id: number, isFavorite: boolean) => void` - Callback al cambiar favorito

**Tipos:**
```typescript
type CardStatus = 'Alive' | 'Dead' | 'unknown';
type CardGender = 'Male' | 'Female' | 'Genderless' | 'unknown';
type CardVariant = 'vertical-normal' | 'horizontal-normal';
```

---

### 2. **Button**
Botón personalizado con tema Rick and Morty.

```typescript
import { Button } from 'rick-morty-components-lib';

export default function App() {
  return (
    <Button
      variant="contained"
      onClick={() => console.log('Clicked!')}
    >
      Click Me
    </Button>
  );
}
```

---

### 3. **InputSearch**
Input de búsqueda con debounce incorporado.

```typescript
import { InputSearch } from 'rick-morty-components-lib';

export default function App() {
  const handleSearch = (value: string) => {
    console.log('Buscando:', value);
  };

  return (
    <InputSearch
      placeholder="Buscar personaje por nombre"
      onChange={handleSearch}
      debounceTime={500}
      maxWidth="600px"
    />
  );
}
```

**Props:**
- `placeholder?: string` - Texto del placeholder
- `onChange?: (value: string) => void` - Callback con el valor buscado
- `debounceTime?: number` - Tiempo de espera en ms (default: 500)
- `maxWidth?: string | number` - Ancho máximo del input

---

### 4. **SegmentedButton**
Botón segmentado para seleccionar opciones.

```typescript
import { SegmentedButton } from 'rick-morty-components-lib';

export default function App() {
  const [status, setStatus] = React.useState('all');

  return (
    <SegmentedButton
      tabs={[
        { label: 'All', value: 'all' },
        { label: 'Alive', value: 'alive' },
        { label: 'Dead', value: 'dead' },
      ]}
      value={status}
      onChange={setStatus}
      centered
    />
  );
}
```

**Props:**
- `tabs: SegmentedItem[]` - Array de opciones
- `value?: string | number` - Valor seleccionado
- `onChange: (value: string | number) => void` - Callback de cambio
- `centered?: boolean` - Centrar el contenido (default: true)

**Tipos:**
```typescript
interface SegmentedItem {
  label: string;
  value: string | number;
}
```

---

## 🎨 Tema

Accede al tema personalizado de Rick and Morty:

```typescript
import { theme } from 'rick-morty-components-lib';
import { ThemeProvider } from '@mui/material/styles';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourComponents />
    </ThemeProvider>
  );
}
```

## 📋 Requisitos Previos

- Node.js 20+ (se recomienda usar nvm)
- pnpm, npm o yarn
- React 18 o 19
- React-DOM 18 o 19

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Compila la librería para producción |
| `pnpm build:publish` | Compila y publica localmente con yalc |
| `pnpm preview` | Visualiza el build de producción |
| `pnpm test` | Ejecuta tests en modo watch |
| `pnpm test:ui` | Abre la UI de tests en navegador |
| `pnpm test:run` | Ejecuta tests una sola vez |
| `pnpm test:coverage` | Genera reporte de cobertura (100%) |
| `pnpm lint` | Ejecuta ESLint |

## 📦 Distribución

La librería se exporta en dos formatos:

- **ESM** (ECMAScript Modules): `dist/rick-morty-components-lib.es.js`
- **CommonJS**: `dist/rick-morty-components-lib.cjs.js`
- **TypeScript Definitions**: `dist/index.d.ts`

## 📄 Licencia

MIT

## 👤 Autor

Cristian González - [@cristianmgb](https://github.com/cristianmgb)

## 🔗 Enlaces

- [Repositorio](https://github.com/cristianmgb/rick-morty-components-lib)
- [Material-UI Docs](https://mui.com/)
- [Vite Docs](https://vite.dev/)
- [Vitest Docs](https://vitest.dev/)

---

¡Disfruta usando la Rick and Morty Components Library! 🚀
