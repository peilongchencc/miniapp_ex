# Project Structure

## Root Configuration

- `project.config.json` - WeChat Mini Program project configuration
- `tsconfig.json` - TypeScript compiler configuration
- `package.json` - Node dependencies (mainly type definitions)

## Miniprogram Directory (`miniprogram/`)

All Mini Program source code lives in the `miniprogram/` directory.

### Application Entry

- `app.ts` - Application lifecycle and global data
- `app.json` - Application configuration (pages, window, tabBar)
- `app.scss` - Global styles
- `sitemap.json` - Search engine indexing configuration

### Pages (`pages/`)

Each page follows the standard Mini Program structure with 4 files:
- `.ts` - Page logic (TypeScript)
- `.wxml` - Page template (markup)
- `.scss` - Page styles
- `.json` - Page configuration

**Current Pages:**
- `home/` - Home page
- `category/` - Product categories
- `cart/` - Shopping cart
- `mine/` - User profile
- `logs/` - Activity logs

### Components (`components/`)

Reusable custom components following the same 4-file structure as pages.

**Current Components:**
- `navigation-bar/` - Custom navigation bar component

### Static Assets (`images/`)

All image assets for icons, placeholders, and UI elements.

### Utilities (`utils/`)

Shared utility functions and helpers.

## Code Conventions

### Page/Component Structure

Pages use the `Component()` constructor (Component-based page pattern):
```typescript
Component({
  data: { /* reactive data */ },
  methods: { /* event handlers */ }
})
```

### Component Registration

Components are registered in page JSON files:
```json
{
  "usingComponents": {
    "component-name": "/components/component-name/component-name"
  }
}
```

### File Naming

- Use kebab-case for directories and files
- Match component/page name across all 4 files (e.g., `home.ts`, `home.wxml`, `home.scss`, `home.json`)

### Imports

- Use absolute paths from miniprogram root: `/components/...`, `/utils/...`
- TypeScript module system: CommonJS with ES2020 target
