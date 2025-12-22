# @real-token/mcp

Serveur MCP (Model Context Protocol) pour exposer la documentation du SDK @real-token aux assistants IA.

## Installation

```bash
pnpm install
pnpm build
```

## Utilisation

### Avec Claude Desktop

Ajoute cette configuration dans ton fichier Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json` sur macOS) :

```json
{
  "mcpServers": {
    "real-token": {
      "command": "node",
      "args": ["/chemin/vers/realt-commons/packages/@real-token/mcp/dist/index.js"]
    }
  }
}
```

### Avec npx (après publication)

```bash
npx @real-token/mcp
```

## Outils MCP disponibles

| Outil | Description |
|-------|-------------|
| `list_packages` | Liste tous les packages @real-token disponibles |
| `list_docs` | Liste les fichiers de documentation d'un package |
| `get_documentation` | Lit le contenu d'un fichier de documentation |
| `get_jsdoc` | Extrait les commentaires JSDoc d'un package |
| `search_docs` | Recherche dans toute la documentation |

## Structure de la documentation

Pour que le serveur MCP trouve ta documentation, crée un dossier `docs/` dans chaque package :

```
packages/@real-token/web3/
├── docs/
│   ├── index.md           # Vue d'ensemble
│   ├── hooks.md           # Documentation des hooks
│   └── components.md      # Documentation des composants
└── src/
    └── ...                # Code avec commentaires JSDoc
```

## Commentaires JSDoc

Le serveur extrait automatiquement les commentaires JSDoc de tes fichiers source :

```typescript
/**
 * Hook pour envoyer une transaction
 * @param options - Options de la transaction
 * @returns Résultat de la transaction
 * @example
 * const { sendTransaction } = useSendTransaction();
 */
export function useSendTransaction(options: Options) {
  // ...
}
```

## Développement

```bash
# Build
pnpm build

# Lancer le serveur (pour tests)
pnpm start
```
