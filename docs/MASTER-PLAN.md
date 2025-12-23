# Art Gallery Pages - Master Development Plan

## Executive Summary

**Project:** Art Gallery Pages - Shopify App Store Application
**Goal:** Ship production-ready app demonstrating senior Shopify developer expertise
**Timeline:** Complete by end of December 2025
**Status:** Core functionality built, theme extension needs verification, documentation in progress

---

## The Three-Node Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DEVELOPMENT PIPELINE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐       │
│  │   CLAUDE.AI      │    │   CURSOR AI      │    │   CHARLES        │       │
│  │   (Architect)    │───▶│   (Executor)     │───▶│   (Verifier)     │       │
│  ├──────────────────┤    ├──────────────────┤    ├──────────────────┤       │
│  │ • Strategy       │    │ • GitHub MCP     │    │ • Browser test   │       │
│  │ • Architecture   │    │ • Shopify MCP    │    │ • Visual confirm │       │
│  │ • Code design    │    │ • File read/write│    │ • Error report   │       │
│  │ • Documentation  │    │ • Git operations │    │ • Screenshots    │       │
│  │ • Education      │    │ • Command exec   │    │ • Feedback loop  │       │
│  │ • Code review    │    │ • Deployment     │    │ • Decision input │       │
│  └──────────────────┘    └──────────────────┘    └──────────────────┘       │
│           │                       │                       │                  │
│           └───────────────────────┴───────────────────────┘                  │
│                            FEEDBACK LOOP                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Node Responsibilities

#### Claude.ai (Architect/Teacher)
- **Decides:** What to build, why, in what order
- **Designs:** Architecture, data flow, component structure
- **Documents:** Creates specs, handoffs, learnings
- **Educates:** Explains WHY patterns work, not just HOW
- **Reviews:** Validates code quality, Shopify best practices
- **Never:** Asks Charles to copy/paste code manually

#### Cursor AI (Executor)
- **Reads:** Current codebase via GitHub MCP
- **Writes:** Code changes, commits, pushes
- **Queries:** Shopify docs via Dev MCP
- **Validates:** Liquid templates via Theme Check
- **Runs:** Git commands, npm scripts
- **Reports:** Success/failure back to Charles

#### Charles (Verifier/Commander)
- **Tests:** Browser verification, visual confirmation
- **Reports:** Screenshots, error messages, console output
- **Decides:** Approves direction, requests changes
- **Commands:** Tells Cursor AI what Claude.ai designed
- **Learns:** Absorbs patterns while executing

---

## Communication Protocol

### Claude.ai → Charles → Cursor AI

**Format for Cursor AI instructions:**

```
TASK: [Brief description]

FILES TO MODIFY:
- path/to/file.tsx

CHANGES:
[Exact code or description]

COMMIT MESSAGE:
"type: description"

VERIFY:
[What to check after]
```

### Charles → Claude.ai

**Report Format:**

```
RESULT: [Success/Failure/Partial]

SCREENSHOT: [If visual]

CONSOLE OUTPUT:
[Any errors or logs]

QUESTION: [If unclear]
```

---

## Project Milestones

### Phase 1: Foundation ✅ COMPLETE
- [x] Shopify app template scaffolded
- [x] Partner Dashboard connected
- [x] Dev store configured
- [x] MCP tools configured (Shopify Dev + GitHub)
- [x] Basic app runs locally

### Phase 2: Core App ✅ COMPLETE
- [x] Dashboard UI (gallery list, empty state)
- [x] Gallery Builder (product picker, layout selector)
- [x] Data Persistence (metafields save/load)
- [x] GraphQL queries working

### Phase 3: Theme Extension 🔄 IN PROGRESS
- [x] Extension structure created
- [x] Liquid templates written
- [x] CSS for layouts (grid/masonry/carousel)
- [ ] Fix Theme Check errors (img width/height)
- [ ] Verify block appears in theme editor
- [ ] Test gallery rendering on storefront
- [ ] Test all three layouts

### Phase 4: Polish & Edge Cases ⏳ PENDING
- [ ] Loading states
- [ ] Error handling
- [ ] Empty states
- [ ] Delete gallery functionality
- [ ] Reorder products in gallery
- [ ] Pagination for large product lists

### Phase 5: Production Ready ⏳ PENDING
- [ ] GDPR webhooks verified
- [ ] App scopes minimized
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Mobile responsive verification

### Phase 6: App Store Submission ⏳ PENDING
- [ ] App icon (1024x1024)
- [ ] Screenshots (annotated)
- [ ] App description
- [ ] Privacy policy
- [ ] Support URL
- [ ] Submit for review

---

## Educational Modules

### Module 1: Shopify Platform Architecture
**Objective:** Understand how Shopify's ecosystem works
**Duration:** 2-3 hours
**Topics:**
- Embedded apps vs standalone
- Admin vs Storefront
- App Bridge and iframe communication
- Partner Dashboard structure

**Deliverable:** Mental model document
**Verification:** Can explain architecture without reference

### Module 2: Authentication & Session
**Objective:** Understand OAuth and session management
**Duration:** 2-3 hours
**Topics:**
- OAuth 2.0 flow
- Session tokens
- App Bridge authentication
- Prisma session storage

**Deliverable:** Auth flow diagram
**Verification:** Can trace auth in browser dev tools

### Module 3: GraphQL Admin API
**Objective:** Master querying and mutations
**Duration:** 3-4 hours
**Topics:**
- Query vs Mutation syntax
- Connections and edges (pagination)
- Metafield operations
- Error handling

**Deliverable:** Query library for common operations
**Verification:** Can write queries from scratch in GraphiQL

### Module 4: Polaris UI Components
**Objective:** Build Shopify-native interfaces
**Duration:** 2-3 hours
**Topics:**
- Polaris design system
- Web Components (s-page, s-button, etc.)
- App Bridge components
- Patterns (loading, empty, error states)

**Deliverable:** Component reference sheet
**Verification:** Can identify correct component for any UI need

### Module 5: Metafields & Data Storage
**Objective:** Persist app data correctly
**Duration:** 2-3 hours
**Topics:**
- Metafield ownership (shop vs app vs product)
- JSON metafield type
- Access control
- CRUD operations

**Deliverable:** Data schema documentation
**Verification:** Can manually CRUD metafields in GraphiQL

### Module 6: Theme App Extensions
**Objective:** Render content on storefront
**Duration:** 4-5 hours
**Topics:**
- App blocks vs App embeds
- Liquid templating basics
- Schema configuration
- Asset loading (CSS/JS)
- Accessing metafields from Liquid
- Theme Check validation

**Deliverable:** Working theme extension
**Verification:** Block appears in theme editor, renders on storefront

### Module 7: Deployment & App Store
**Objective:** Ship to production
**Duration:** 2-3 hours
**Topics:**
- Vercel deployment
- Environment variables
- GDPR compliance
- App Store requirements
- Review process

**Deliverable:** Submitted app
**Verification:** App approved and live

---

## Current Session Focus

### Immediate Tasks (This Session)

1. **Fix Theme Check Error**
   - Add width/height to img tag in gallery.liquid
   - Verify error clears in terminal

2. **Verify Theme Extension in Editor**
   - Open theme customizer
   - Add Art Gallery block to a page
   - Confirm it appears

3. **Test Gallery Rendering**
   - Create test gallery with products
   - View on storefront
   - Verify products display correctly

### Next Session Tasks

4. **Complete Module 1 Education**
   - Study platform architecture
   - Create mental model document

5. **Review & Refine Code**
   - Apply learnings to existing code
   - Improve patterns where needed

---

## Repository Structure

```
art-gallery-pages/
├── .cursor/
│   └── mcp.json              # MCP configuration (local only, gitignored)
├── .shopify/                 # Shopify CLI state
├── app/
│   ├── routes/
│   │   ├── app._index.tsx    # Dashboard - gallery list
│   │   ├── app.gallery.$id.tsx # Builder - create/edit gallery
│   │   ├── app.tsx           # Authenticated layout wrapper
│   │   └── webhooks.*.tsx    # GDPR webhook handlers
│   └── shopify.server.ts     # Auth & API configuration
├── extensions/
│   └── art-gallery-block/
│       ├── blocks/
│       │   ├── gallery.liquid     # Section block
│       │   └── app-embed.liquid   # App embed (global)
│       ├── assets/
│       │   └── gallery.css        # Styles
│       ├── locales/
│       │   └── en.default.json    # Translations
│       └── shopify.extension.toml # Extension config
├── prisma/
│   └── schema.prisma         # Session storage schema
├── docs/
│   └── MASTER-PLAN.md        # This document
├── ART-GALLERY-PAGES-HANDOFF.md
├── PROJECT-SPECIFICATION.md
├── SHOPIFY-LEARNING-STRATEGY.md
└── package.json
```

---

## Quality Standards

### Code Quality
- TypeScript strict mode
- No `any` types without justification
- Meaningful variable names
- Comments for non-obvious logic

### Shopify Standards
- Use Polaris components, not custom UI
- Follow Shopify UX patterns
- Respect rate limits
- Minimal required scopes

### Git Standards
- Meaningful commit messages
- Format: `type: description`
- Types: feat, fix, docs, refactor, test
- One logical change per commit

### Documentation Standards
- Update handoff after significant changes
- Document WHY, not just WHAT
- Include verification steps
- Keep current with actual state

---

## Success Metrics

### Technical
- [ ] App loads in < 2 seconds
- [ ] Theme extension renders correctly
- [ ] No console errors
- [ ] Theme Check passes
- [ ] All GDPR webhooks respond correctly

### Educational
- [ ] Can explain Shopify architecture without reference
- [ ] Can write GraphQL queries from memory
- [ ] Can build new features independently
- [ ] Can debug issues systematically

### Business
- [ ] App approved for App Store
- [ ] Documentation complete for portfolio
- [ ] Reusable patterns documented

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Theme extension doesn't appear | Study official examples, verify schema |
| Metafield access issues | Test in GraphiQL first, check ownership |
| App Store rejection | Follow requirements checklist exactly |
| Scope creep | Stick to MVP, defer nice-to-haves |

---

## Contact Points

| System | URL |
|--------|-----|
| Partner Dashboard | https://partners.shopify.com |
| Dev Store Admin | https://admin.shopify.com/store/dev-store-749237498237498787 |
| App in Store | https://admin.shopify.com/store/dev-store-749237498237498787/apps/art-gallery-pages |
| Theme Editor | https://dev-store-749237498237498787.myshopify.com/admin/themes |
| GitHub Repo | https://github.com/artmusuem/art-gallery-pages |
| GraphiQL (local) | http://localhost:3457/graphiql |

---

*Document Created: December 23, 2024*
*Version: 1.0*
*Status: Active Development*
