# Shopify Expert Learning Path - New Chat Instructions

## Context

I'm Charles, transitioning from construction to freelance development. I have 10+ years intermittent coding experience and built Commerce Hub (multi-channel e-commerce admin) using React, TypeScript, Supabase, and Vercel. I learn best by studying code structures, documentation, and understanding how systems interplay - similar to how I learned WordPress through the Codex, studying plugins/themes, and reading source code.

## What's Already Built

**Art Gallery Pages** - Shopify embedded app (incomplete)
- Repository: https://github.com/artmusuem/art-gallery-pages
- Local: C:\xampp\htdocs\art-gallery-pages
- Partner Org: aiged INC (197127977)
- Dev Store: dev-store-749237498237498787.myshopify.com

**Working:**
- ✅ Shopify app running locally (`shopify app dev`)
- ✅ Dashboard UI showing galleries
- ✅ Gallery builder with product picker (GraphQL)
- ✅ Data persistence to shop metafields
- ✅ OAuth/authentication

**Not Working:**
- ❌ Theme App Extension - couldn't get blocks to appear in theme editor
- Files exist in `extensions/art-gallery-block/` but structure is wrong

## Learning Goal

Become expert-level in Shopify app development, specifically:
1. Theme App Extensions (blocks, app embeds, how they integrate with themes)
2. Liquid templating language
3. GraphQL Admin API
4. Metafields as data storage
5. App distribution via Shopify App Store

## Study Strategy

### Phase 1: Foundation (Study, Don't Build)

**Study these repos by reading every file:**

1. **Theme Extension Boilerplate**
   ```
   git clone https://github.com/Shopify/theme-extension-getting-started
   ```
   - Map every file and folder
   - Understand what each Liquid file does
   - Note the schema structure in each block
   - Document how assets are referenced

2. **Product Reviews Sample App** (complete working app with theme extension)
   ```
   git clone https://github.com/Shopify/product-reviews-sample-app
   ```
   - Study `/theme-app-extension/` folder structure
   - See how blocks connect to metafield data
   - Understand the full data flow: App → Metafields → Theme Extension → Storefront

3. **Dawn Theme** (official Shopify theme)
   ```
   git clone https://github.com/Shopify/dawn
   ```
   - Study how sections and blocks work
   - Understand JSON templates
   - See how apps integrate via app blocks

### Phase 2: Documentation Deep Dive

**Read in order:**

1. **Theme App Extensions Overview**
   https://shopify.dev/docs/apps/build/online-store/theme-app-extensions
   
2. **Extension Configuration (file structure)**
   https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration
   
3. **App Blocks vs App Embeds**
   https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/extensions-framework
   
4. **Liquid Reference**
   https://shopify.dev/docs/api/liquid
   
5. **Metafields**
   https://shopify.dev/docs/apps/build/custom-data/metafields

### Phase 3: Hands-On Learning

After studying, rebuild the theme extension from scratch:

1. Delete current `extensions/` folder
2. Run `shopify app generate extension` and select "Theme app extension"
3. Study the generated files before changing anything
4. Make small changes, test each one
5. Document what works and what breaks

## Key Questions to Answer

Before building, I should be able to answer:

1. What's the difference between an **app block** and an **app embed**?
2. When does a block use `block.settings` vs `section.settings`?
3. What goes in `shopify.extension.toml` and what's the correct format?
4. How do I access metafields from Liquid in a theme extension?
5. What schema properties are required vs optional?
6. How does `target` work in the schema?
7. Why do some blocks appear in "Add section" vs "Add block"?

## File Structure Reference

**What I think it should look like (verify against official repos):**
```
extensions/
└── my-extension/
    ├── shopify.extension.toml    # Extension config
    ├── locales/
    │   └── en.default.json       # Translations
    ├── blocks/
    │   └── my-block.liquid       # App blocks
    ├── assets/
    │   └── styles.css            # Static assets
    └── snippets/
        └── helper.liquid         # Reusable snippets
```

## Resources

**Documentation:**
- https://shopify.dev/docs - Main hub
- https://shopify.dev/docs/apps/build/online-store/theme-app-extensions - Theme extensions
- https://shopify.dev/docs/api/liquid - Liquid reference
- https://shopify.dev/docs/api/admin-graphql - GraphQL API

**GitHub Repos:**
- https://github.com/Shopify/theme-extension-getting-started
- https://github.com/Shopify/product-reviews-sample-app
- https://github.com/Shopify/dawn
- https://github.com/Shopify/extensions-templates

**Community:**
- https://community.shopify.com/c/shopify-developers/ct-p/Shopify-Developers
- https://discord.gg/shopifydevs

## WordPress → Shopify Mental Model

| WordPress | Shopify |
|-----------|---------|
| PHP | Liquid |
| Hooks/Actions | Webhooks |
| wp_options | Metafields |
| REST API | GraphQL Admin API |
| Customizer | Theme Editor |
| Plugins | Apps |
| Widgets | App Blocks |
| Shortcodes | Liquid snippets |
| Child themes | Theme app extensions |
| Theme Customizer controls | Schema settings |

## For Claude in New Chat

**Approach:**
- Don't guess at file structures - reference official repos
- When I ask about theme extensions, pull from the actual Shopify docs
- If unsure about syntax/structure, say so and point me to the right doc
- Help me understand concepts before writing code
- When we do build, verify against working examples first

**My style:**
- Senior developer approach - no hand-holding explanations
- I learn by understanding the "why" not just the "how"
- Prefer to study source code and official docs
- One thing at a time, verify before moving on

## Session Goals

**First session:** Study the theme-extension-getting-started repo together. Map every file. Understand what each piece does.

**Second session:** Study product-reviews-sample-app theme extension. See how a real app uses blocks and metafields.

**Third session:** Fix the Art Gallery Pages extension based on what we learned.

---

*Created: December 22, 2024*
*Project: Art Gallery Pages (Shopify App)*
