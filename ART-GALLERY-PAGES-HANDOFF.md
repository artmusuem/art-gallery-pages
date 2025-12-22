# Art Gallery Pages - Shopify App

## Quick Start for New Chat Sessions

**First message to Claude:**
```
I'm continuing work on Art Gallery Pages Shopify app. Please read:
1. /mnt/project/ART-GALLERY-PAGES-HANDOFF.md (this file)
2. Fetch from repo: app/routes/app._index.tsx (main app page)
3. Fetch from repo: shopify.app.toml (app config)
```

---

## Project Overview

**What This App Does:**
Adds beautiful, fast-loading gallery pages to Shopify stores. Target users: artists, photographers, makers who want professional portfolio-style pages.

**Why It Exists:**
1. Portfolio piece demonstrating senior-level React/TypeScript skills
2. Real app on Shopify App Store (built-in distribution)
3. Foundation for future e-commerce tools

**Differentiator:**
- Fast (React, lazy-loaded images)
- Focused on artists (niche positioning)
- Simple (not bloated like competitors)

---

## Repository

| Item | Value |
|------|-------|
| GitHub | https://github.com/artmusuem/art-gallery-pages |
| Local Path | C:\xampp\htdocs\art-gallery-pages |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI components |
| TypeScript | Type safety |
| React Router | App routing (Shopify's template choice) |
| Shopify App Bridge | Iframe communication with Shopify admin |
| Shopify Polaris | UI component library |
| GraphQL | Shopify Admin API |
| Prisma | Database (sessions) |
| SQLite | Local dev database |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SHOPIFY ADMIN                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              YOUR APP (iframe)                        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │   Gallery   │  │   Product   │  │   Layout    │   │  │
│  │  │   Builder   │  │   Picker    │  │  Selector   │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  │                         │                             │  │
│  │                    App Bridge                         │  │
│  └─────────────────────────┼─────────────────────────────┘  │
│                            │                                │
│                      GraphQL API                            │
│                            │                                │
│  ┌─────────────────────────┼─────────────────────────────┐  │
│  │                    STORE DATA                         │  │
│  │         Products, Images, Collections                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

                            │
                            ▼
                   MERCHANT STOREFRONT
              (Gallery displays on pages)
```

---

## Key Files

```
art-gallery-pages/
├── app/
│   ├── routes/
│   │   ├── app._index.tsx      # Main app page (customize this)
│   │   ├── app.additional.tsx  # Example additional page
│   │   ├── app.tsx             # App layout wrapper
│   │   ├── auth.$.tsx          # OAuth callback
│   │   └── webhooks.*.tsx      # GDPR webhooks
│   ├── shopify.server.ts       # Shopify API setup
│   └── db.server.ts            # Prisma database
├── extensions/                  # Theme extensions (storefront)
├── prisma/
│   └── schema.prisma           # Database schema
├── shopify.app.toml            # App configuration
└── package.json
```

---

## Shopify Partner Dashboard

**Dashboard:** https://partners.shopify.com/
**Organization:** aiged INC (197127977)
**App:** art-gallery-pages
**Dev Store:** dev-store-749237498237498787.myshopify.com

---

## Development Workflow

### Starting Development

```cmd
cd C:\xampp\htdocs\art-gallery-pages
shopify app dev
```

Then press `p` to preview in browser.

### Making Changes

1. Edit files in `app/routes/` or `app/components/`
2. Save - hot reload updates the preview
3. Test in browser
4. When working:
   ```cmd
   git add .
   git commit -m "feat: description of change"
   git push origin main
   ```

### Rules

- **ONE feature at a time** - Don't batch changes
- **STOP on errors** - Diagnose before fixing
- **Verify in browser** - Test before committing
- **Meaningful commits** - Not "fix" "fix2" "fix3"

---

## Deployment

### Development (Current)
- `shopify app dev` creates a tunnel (trycloudflare.com)
- Only works while terminal is running
- Good for development/testing

### Production (Future)
- Deploy to Vercel or other hosting
- Update URLs in Partner Dashboard
- Submit for app review

---

## Milestones

### Phase 1: Foundation ✅ COMPLETE
- [x] Shopify Partner account
- [x] Development store
- [x] App scaffolded with CLI
- [x] GitHub repo created
- [x] Running locally

### Phase 2: Core Feature (CURRENT)
- [ ] Remove template "Congrats" page
- [ ] Create gallery builder UI
- [ ] Product picker (select products for gallery)
- [ ] Layout selector (grid, masonry, carousel)
- [ ] Save gallery configuration

### Phase 3: Storefront Display
- [ ] Create theme app extension
- [ ] Gallery renders on merchant's store
- [ ] Responsive design
- [ ] Fast image loading

### Phase 4: Polish & Submit
- [ ] Error handling
- [ ] Loading states
- [ ] GDPR webhook testing
- [ ] App Store listing (icon, screenshots, description)
- [ ] Submit for review

### Phase 5: Post-Launch
- [ ] Monitor reviews
- [ ] Bug fixes
- [ ] Feature requests
- [ ] Marketing

---

## GraphQL Examples

### Fetch Products
```graphql
query GetProducts {
  products(first: 50) {
    edges {
      node {
        id
        title
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
      }
    }
  }
}
```

### Fetch Collections
```graphql
query GetCollections {
  collections(first: 20) {
    edges {
      node {
        id
        title
        image {
          url
        }
      }
    }
  }
}
```

---

## Common Commands

```cmd
# Start development
shopify app dev

# Generate a new extension
shopify app generate extension

# Check app info
shopify app info

# Deploy to Shopify (when ready)
shopify app deploy

# View logs
shopify app logs
```

---

## Troubleshooting

### "App not loading in admin"
- Make sure `shopify app dev` is running
- Check terminal for errors
- Try pressing `p` again to reopen preview

### "OAuth error"
- Run `shopify app dev --reset` to reconfigure

### "GraphQL errors"
- Check scopes in `shopify.app.toml`
- Verify query syntax in GraphiQL (press `g` in dev mode)

### "Changes not showing"
- Check terminal for build errors
- Hard refresh browser (Ctrl+Shift+R)
- Restart `shopify app dev`

---

## Reference Links

- Shopify App Development: https://shopify.dev/docs/apps
- App Bridge: https://shopify.dev/docs/api/app-bridge
- Polaris Components: https://polaris.shopify.com/
- GraphQL Admin API: https://shopify.dev/docs/api/admin-graphql
- Theme App Extensions: https://shopify.dev/docs/apps/build/online-store/theme-app-extensions

---

*Last Updated: December 22, 2024*
*Status: Phase 1 Complete - Foundation Ready*
