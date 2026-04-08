# ArchForge

Un generador de proyectos Yeoman para crear aplicaciones web modernas con React, Tauri y TailwindCSS.

## 🚀 Características

- **App Web**: Aplicaciones de escritorio multiplataforma con React + Tauri
- **Frontend**: Aplicaciones web modernas con diversos frameworks
- **Backend**: APIs RESTful con diferentes stacks tecnológicos

## 📦 Instalación

```bash
npm install -g generator-archforge
```

O usando bun:
```bash
bun add -g generator-archforge
```

## 🛠️ Uso

### Crear un nuevo proyecto

```bash
yo archforge
```

Sigue las instrucciones interactivas para configurar tu proyecto.

### Crear un proyecto con nombre específico

```bash
yo archforge mi-proyecto
```

## 🌐 App Web Feature

La característica **App Web** genera aplicaciones de escritorio modernas combinando lo mejor del desarrollo web y nativo.

### Stack Tecnológico

- **Frontend**: React 18 con TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Desktop**: Tauri (Rust backend)
- **Routing**: React Router
- **Linting**: ESLint con configuración moderna

### Estructura del Proyecto

```
mi-proyecto/
├── src/
│   ├── app/
│   │   ├── main.tsx          # Punto de entrada
│   │   ├── App.tsx           # Componente principal
│   │   ├── Router.tsx        # Configuración de rutas
│   │   └── App.css           # Estilos globales
│   ├── components/           # Componentes reutilizables
│   ├── constants/            # Constantes de la aplicación
│   ├── features/             # Feature-based modules
│   ├── pages/                # Páginas de la aplicación
│   ├── context/              # React Context providers
│   └── lib/                  # Utilidades y helpers
├── src-tauri/                # Configuración de Tauri
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

### Características Opcionales

#### 🗄️ SQL Database
- Integración con `@tauri-apps/plugin-sql`
- Configuración automática de migraciones
- Estructura de carpetas para database:
  ```
  src/
  └── database/
      ├── db.ts       # Configuración de la base de datos
      └── index.ts    # Exportaciones y utilidades
  ```

#### 🎨 shadcn/ui
- Sistema de componentes UI modernos
- Configuración automática de path aliases (`@/*`)
- Componentes pre-configurados:
  - Radix UI primitives
  - Lucide React icons
  - TailwindCSS utilities
  - Class Variance Authority

### Comandos Disponibles

```bash
# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun dev

# Build para desarrollo
bun build:dev

# Build para producción
bun build

# Ejecutar aplicación Tauri
bun tauri dev

# Build aplicación Tauri
bun tauri build
```

### Configuración Automática

El generador configura automáticamente:

- **TypeScript**: Configuración estricta con path aliases
- **Vite**: Optimizado para React con HMR
- **TailwindCSS**: Configuración completa con autoprefixer
- **ESLint**: Reglas modernas para React y TypeScript
- **Git**: Repositorio inicializado con `.gitignore`
- **Tauri**: Proyecto Rust backend configurado

### Dependencias Principales

#### Runtime
- `react` & `react-dom`
- `react-router`
- `@tauri-apps/api`

#### Development
- `vite`
- `typescript`
- `@vitejs/plugin-react`
- `tailwindcss` & `@tailwindcss/vite`
- `eslint` y plugins relacionados

#### Opcionales
- `shadcn/ui`: Sistema de componentes
- `@tauri-apps/plugin-sql`: Base de datos SQL

## 🤝 Contribución

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la branch (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

ISC License - ver archivo [LICENSE](LICENSE) para detalles.

## 🔗 Enlaces

- [Yeoman](http://yeoman.io/)
- [React](https://reactjs.org/)
- [Tauri](https://tauri.app/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
