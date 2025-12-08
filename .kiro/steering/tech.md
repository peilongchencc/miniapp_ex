# Technology Stack

## Framework & Platform

- **Platform**: WeChat Mini Program (微信小程序)
- **Component Framework**: Glass Easel
- **Renderer**: Skyline rendering engine enabled
- **Mini Program API Version**: 2.32.3

## Languages & Preprocessors

- **TypeScript**: Strict mode enabled with ES2020 target
- **SCSS**: For styling (compiled via WeChat DevTools)
- **WXML**: WeChat Markup Language for templates

## TypeScript Configuration

Strict TypeScript settings enforced:
- `strictNullChecks`, `noImplicitAny`, `noImplicitThis`
- `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters`
- `strictPropertyInitialization`

## Development Tools

- **WeChat DevTools**: Primary IDE for development and debugging
- **Compiler Plugins**: TypeScript and SASS compilation built into WeChat DevTools
- **Type Definitions**: `miniprogram-api-typings` for WeChat API types

## Build & Compilation

The project uses WeChat DevTools' built-in compilation system. No separate build commands needed - compilation happens automatically in the IDE.

### Editor Settings
- Tab size: 2 spaces
- Indentation: spaces (not tabs)

## Key Features Enabled

- Lazy code loading with `requiredComponents`
- Source map upload for debugging
- Minification for WXSS and WXML in production
- Enhanced compilation mode
