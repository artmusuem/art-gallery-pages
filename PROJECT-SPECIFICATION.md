# Art Gallery Pages - Project Specification

## Document Control

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 1.0 | December 22, 2024 | Charles / Claude | Draft |

---

# SECTION 1: PRIMARY GOAL

## 1.1 Project Statement

**Build a Shopify App Store application that allows merchants to create beautiful, fast-loading gallery pages for showcasing art, photography, and visual products.**

## 1.2 Success Criteria

| Criteria | Measurement |
|----------|-------------|
| App approved on Shopify App Store | Yes/No |
| Functions without errors | Zero critical bugs |
| Loads in under 3 seconds | Lighthouse performance score 90+ |
| Demonstrates senior-level code | TypeScript strict mode, proper architecture |

## 1.3 Why This Project?

1. **Portfolio Proof** - Demonstrates React, TypeScript, GraphQL, OAuth, API integration
2. **Built-in Distribution** - Shopify App Store has 2.8M merchants
3. **Real Product** - Not a tutorial project, actual users
4. **Foundation** - Skills transfer to Commerce Hub and future projects

## 1.4 Target User

**Primary:** Shopify merchants who sell art, photography, prints, or visual products

**User Profile:**
- Sells 10-500 products
- Wants professional presentation
- Not highly technical
- Values aesthetics and speed

**User Problem:**
> "My Shopify theme's default product grid doesn't showcase my art well. I want gallery-style pages like a real museum or photography portfolio."

---

# SECTION 2: DEVELOPER OVERVIEW

## 2.1 Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Language | TypeScript (strict) | Type safety, senior-level standard |
| Framework | React 18 | Industry standard, your expertise |
| Routing | React Router | Shopify template default |
| UI Library | Shopify Polaris | Required for embedded apps |
| API | GraphQL (Admin API) | Shopify requirement for new apps |
| Auth | Shopify OAuth | Handled by template |
| Database | Prisma + SQLite (dev) | Session storage |
| Hosting | Vercel | CI/CD, serverless, your expertise |

## 2.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         SHOPIFY ECOSYSTEM                           │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    SHOPIFY ADMIN                              │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │           ART GALLERY PAGES APP (Embedded)             │  │  │
│  │  │                                                        │  │  │
│  │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐  │  │  │
│  │  │  │  Dashboard  │ │   Gallery   │ │     Gallery     │  │  │  │
│  │  │  │   (List)    │ │   Builder   │ │    Settings     │  │  │  │
│  │  │  └─────────────┘ └─────────────┘ └─────────────────┘  │  │  │
│  │  │         │               │                │            │  │  │
│  │  │         └───────────────┼────────────────┘            │  │  │
│  │  │                         │                             │  │  │
│  │  │                   App Bridge                          │  │  │
│  │  │                   (Communication)                     │  │  │
│  │  └─────────────────────────┼─────────────────────────────┘  │  │
│  │                            │                                │  │
│  │                     GraphQL Admin API                       │  │
│  │                            │                                │  │
│  │  ┌─────────────────────────┼─────────────────────────────┐  │  │
│  │  │                   STORE DATA                          │  │  │
│  │  │    Products │ Collections │ Images │ Metafields       │  │  │
│  │  └───────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                 MERCHANT STOREFRONT                          │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │           THEME APP EXTENSION                          │  │  │
│  │  │                                                        │  │  │
│  │  │  ┌──────────────────────────────────────────────────┐  │  │  │
│  │  │  │              GALLERY BLOCK                       │  │  │  │
│  │  │  │    Renders saved gallery on storefront page      │  │  │  │
│  │  │  │    - Fetches config from metafields              │  │  │  │
│  │  │  │    - Displays products in chosen layout          │  │  │  │
│  │  │  │    - Lazy loads images                           │  │  │  │
│  │  │  └──────────────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## 2.3 Data Flow

```
USER ACTION                    APP                         SHOPIFY
───────────────────────────────────────────────────────────────────
1. Open app            →    Load dashboard        ←    Fetch galleries (metafields)
2. Click "New Gallery" →    Show builder UI
3. Select products     →    Product picker        ←    GraphQL: products query
4. Choose layout       →    Preview updates
5. Save gallery        →    Save to metafields    →    GraphQL: metafield mutation
6. View on store       →                          →    Theme extension renders
```

## 2.4 Data Storage Strategy

**Where galleries are stored:** Shopify Metafields (app-owned)

```json
{
  "namespace": "art_gallery_pages",
  "key": "galleries",
  "value": {
    "galleries": [
      {
        "id": "gallery_001",
        "title": "Featured Paintings",
        "layout": "masonry",
        "columns": 3,
        "products": ["gid://shopify/Product/123", "gid://shopify/Product/456"],
        "settings": {
          "showPrice": true,
          "showTitle": true,
          "imageSize": "large"
        }
      }
    ]
  }
}
```

**Why Metafields:**
- No external database needed
- Data stays in merchant's Shopify
- Survives app uninstall/reinstall
- Standard Shopify pattern

## 2.5 Required Shopify API Scopes

```toml
# shopify.app.toml
[access_scopes]
scopes = "read_products,write_products,read_content,write_content"
```

| Scope | Purpose |
|-------|---------|
| read_products | Fetch products for picker |
| write_products | Save gallery config to metafields |
| read_content | Read existing pages |
| write_content | Create gallery pages |

---

# SECTION 3: FEATURE SPECIFICATION

## 3.1 MVP Features (Version 1.0)

### Feature 1: Gallery Dashboard
**User Story:** As a merchant, I want to see all my galleries in one place so I can manage them.

| Requirement | Acceptance Criteria |
|-------------|---------------------|
| List all galleries | Shows title, product count, layout type |
| Create new gallery | Button navigates to builder |
| Edit existing gallery | Click gallery to edit |
| Delete gallery | Confirmation before delete |

### Feature 2: Gallery Builder
**User Story:** As a merchant, I want to create a gallery by selecting products and choosing a layout.

| Requirement | Acceptance Criteria |
|-------------|---------------------|
| Product picker | Multi-select from store products |
| Search products | Filter by title |
| Layout selector | Grid, Masonry, Carousel options |
| Live preview | Updates as selections change |
| Save gallery | Persists to metafields |

### Feature 3: Layout Options
**User Story:** As a merchant, I want to choose how my gallery looks.

| Layout | Description |
|--------|-------------|
| Grid | Equal-sized tiles, responsive columns |
| Masonry | Pinterest-style, varied heights |
| Carousel | Horizontal scroll, one at a time |

### Feature 4: Storefront Display
**User Story:** As a merchant, I want my gallery to appear on my store for customers to see.

| Requirement | Acceptance Criteria |
|-------------|---------------------|
| Theme app extension | Installs as block in theme editor |
| Gallery selection | Merchant chooses which gallery |
| Responsive | Works on mobile and desktop |
| Fast loading | Images lazy load |

## 3.2 NOT in MVP (Future Versions)

- Analytics (views, clicks)
- A/B testing layouts
- Custom CSS
- Animation options
- Multiple galleries per page
- Scheduled galleries
- Password protection

---

# SECTION 4: MILESTONES

## Overview

| Milestone | Description | Duration |
|-----------|-------------|----------|
| M1 | Project Setup & Verification | Day 1 |
| M2 | Dashboard UI | Days 2-3 |
| M3 | Gallery Builder | Days 4-7 |
| M4 | Data Persistence | Days 8-9 |
| M5 | Theme Extension | Days 10-13 |
| M6 | Polish & Testing | Days 14-16 |
| M7 | App Store Submission | Days 17-20 |

---

## MILESTONE 1: Project Setup & Verification

**Goal:** Confirm development environment is correctly configured and understand the codebase.

### Step 1.1: Verify Local Development
```
Checklist:
□ `shopify app dev` runs without errors
□ App loads in dev store admin
□ Hot reload works (edit file, see change)
□ GraphiQL accessible (press 'g')
□ Can query products via GraphQL
```

### Step 1.2: Understand File Structure
```
Checklist:
□ Review app/routes/app._index.tsx (main page)
□ Review app/routes/app.tsx (layout wrapper)
□ Review app/shopify.server.ts (API setup)
□ Review shopify.app.toml (configuration)
□ Document any questions
```

### Step 1.3: Verify GraphQL Access
```
Test Query (in GraphiQL):
query {
  products(first: 5) {
    edges {
      node {
        id
        title
      }
    }
  }
}

Expected: Returns 5 products from dev store
```

### Step 1.4: Verify GitHub Workflow
```
Checklist:
□ Make small change (add comment)
□ Commit with meaningful message
□ Push to GitHub
□ Verify commit appears on GitHub
```

**Milestone 1 Exit Criteria:**
- [ ] All checklists complete
- [ ] No unresolved errors
- [ ] Developer can explain each key file's purpose

---

## MILESTONE 2: Dashboard UI

**Goal:** Replace template content with gallery dashboard.

### Step 2.1: Create Dashboard Component
```
File: app/routes/app._index.tsx

Requirements:
□ Remove template "Congrats" content
□ Add page title "Your Galleries"
□ Add "Create Gallery" button
□ Add empty state (no galleries yet)
```

### Step 2.2: Implement Polaris Components
```
Components to use:
□ Page (layout)
□ Card (gallery list items)
□ Button (create gallery)
□ EmptyState (when no galleries)
```

### Step 2.3: Create Mock Data
```
Temporary hardcoded galleries for UI development:
const mockGalleries = [
  { id: '1', title: 'Featured Art', productCount: 12, layout: 'masonry' },
  { id: '2', title: 'New Arrivals', productCount: 8, layout: 'grid' },
];
```

### Step 2.4: Verification
```
Checklist:
□ Dashboard renders without errors
□ Polaris components styled correctly
□ Responsive on mobile (check dev tools)
□ "Create Gallery" button visible
□ Mock galleries display in list
□ Commit: "feat: add gallery dashboard UI"
```

**Milestone 2 Exit Criteria:**
- [ ] Dashboard replaces template
- [ ] Polaris components render correctly
- [ ] Mobile responsive
- [ ] Code committed and pushed

---

## MILESTONE 3: Gallery Builder

**Goal:** Create the interface for building a gallery.

### Step 3.1: Create Builder Route
```
File: app/routes/app.gallery.new.tsx

Requirements:
□ New route accessible from dashboard
□ Page title "Create Gallery"
□ Form structure in place
```

### Step 3.2: Gallery Title Input
```
Requirements:
□ Text input for gallery name
□ Validation (required, max length)
□ Polaris TextField component
```

### Step 3.3: Product Picker
```
Requirements:
□ Fetch products via GraphQL
□ Display as selectable list
□ Multi-select functionality
□ Search/filter by title
□ Show product image and title
□ Polaris ResourceList or IndexTable
```

### Step 3.4: Layout Selector
```
Requirements:
□ Three options: Grid, Masonry, Carousel
□ Visual preview of each layout
□ Radio or ChoiceList component
```

### Step 3.5: Live Preview Panel
```
Requirements:
□ Shows selected products
□ Arranges in chosen layout
□ Updates as selections change
□ Scaled-down preview
```

### Step 3.6: Verification
```
Checklist:
□ Can navigate from dashboard to builder
□ Title input works with validation
□ Products load from GraphQL
□ Can select/deselect products
□ Layout selector changes preview
□ No console errors
□ Commit: "feat: add gallery builder UI"
```

**Milestone 3 Exit Criteria:**
- [ ] Builder route exists and navigates correctly
- [ ] All form elements functional
- [ ] GraphQL fetches products
- [ ] Live preview updates

---

## MILESTONE 4: Data Persistence

**Goal:** Save and load galleries using Shopify metafields.

### Step 4.1: Define Metafield Structure
```
Namespace: art_gallery_pages
Key: galleries
Type: json
```

### Step 4.2: Create Save Mutation
```graphql
mutation SaveGallery($input: MetafieldsSetInput!) {
  metafieldsSet(metafields: [$input]) {
    metafields {
      id
      namespace
      key
      value
    }
    userErrors {
      field
      message
    }
  }
}
```

### Step 4.3: Create Load Query
```graphql
query LoadGalleries {
  currentAppInstallation {
    metafield(namespace: "art_gallery_pages", key: "galleries") {
      value
    }
  }
}
```

### Step 4.4: Implement Save Action
```
Requirements:
□ Save button in builder
□ Validates required fields
□ Calls save mutation
□ Shows success toast
□ Redirects to dashboard
```

### Step 4.5: Implement Load on Dashboard
```
Requirements:
□ Dashboard fetches galleries on load
□ Displays real data (not mock)
□ Handles empty state
□ Handles loading state
```

### Step 4.6: Implement Edit Flow
```
Requirements:
□ Click gallery to edit
□ Builder loads existing data
□ Save updates (not creates new)
```

### Step 4.7: Implement Delete
```
Requirements:
□ Delete button on gallery
□ Confirmation modal
□ Removes from metafield
□ Updates dashboard
```

### Step 4.8: Verification
```
Checklist:
□ Can create gallery and see on dashboard
□ Can refresh page, gallery persists
□ Can edit existing gallery
□ Can delete gallery
□ Error handling for failed saves
□ Commit: "feat: add gallery persistence with metafields"
```

**Milestone 4 Exit Criteria:**
- [ ] Full CRUD operations work
- [ ] Data persists across sessions
- [ ] Error handling in place

---

## MILESTONE 5: Theme Extension

**Goal:** Display galleries on the merchant's storefront.

### Step 5.1: Generate Extension
```cmd
shopify app generate extension
Select: Theme app extension
Name: gallery-block
```

### Step 5.2: Create Block Schema
```
File: extensions/gallery-block/blocks/gallery.liquid

Requirements:
□ Block schema with settings
□ Gallery selector setting
□ Styling options
```

### Step 5.3: Render Gallery
```
Requirements:
□ Fetch gallery config from metafields
□ Fetch product data
□ Render in selected layout
□ Responsive CSS
```

### Step 5.4: Implement Layouts
```
Layouts to implement:
□ Grid layout (CSS Grid)
□ Masonry layout (CSS Columns or JS)
□ Carousel layout (scroll snap or Swiper)
```

### Step 5.5: Image Optimization
```
Requirements:
□ Lazy loading (loading="lazy")
□ Responsive images (srcset)
□ Placeholder while loading
```

### Step 5.6: Verification
```
Checklist:
□ Extension appears in theme editor
□ Can select gallery in settings
□ Gallery renders on storefront
□ All layouts work correctly
□ Mobile responsive
□ Images lazy load
□ Commit: "feat: add theme extension for storefront display"
```

**Milestone 5 Exit Criteria:**
- [ ] Theme extension functional
- [ ] All layouts implemented
- [ ] Responsive and performant

---

## MILESTONE 6: Polish & Testing

**Goal:** Ensure production quality.

### Step 6.1: Error Handling
```
Requirements:
□ API errors show user-friendly messages
□ Network failures handled gracefully
□ Form validation errors clear
□ No unhandled promise rejections
```

### Step 6.2: Loading States
```
Requirements:
□ Skeleton loading for dashboard
□ Button loading states
□ Product picker loading
□ No layout jumps
```

### Step 6.3: Empty States
```
Requirements:
□ No galleries yet - helpful message
□ No products selected - guidance
□ Search no results - clear feedback
```

### Step 6.4: Accessibility
```
Requirements:
□ Keyboard navigation works
□ Focus states visible
□ Alt text on images
□ Color contrast sufficient
```

### Step 6.5: Performance Testing
```
Tools:
□ Lighthouse audit (score 90+)
□ Network tab (no excessive requests)
□ Console (no errors/warnings)
```

### Step 6.6: Cross-Browser Testing
```
Browsers:
□ Chrome
□ Firefox
□ Safari
□ Edge
```

### Step 6.7: Verification
```
Checklist:
□ All error states handled
□ All loading states implemented
□ Accessibility audit passes
□ Performance score 90+
□ Works in all major browsers
□ Commit: "chore: polish UI and fix edge cases"
```

**Milestone 6 Exit Criteria:**
- [ ] Production quality code
- [ ] No known bugs
- [ ] Performance optimized

---

## MILESTONE 7: App Store Submission

**Goal:** Get app approved on Shopify App Store.

### Step 7.1: Prepare App Listing
```
Requirements:
□ App name (final)
□ App icon (1024x1024 PNG)
□ Short description (80 chars)
□ Detailed description
□ Key benefits (bullet points)
□ Screenshots (5-10, annotated)
□ Demo video (optional but recommended)
```

### Step 7.2: Verify GDPR Compliance
```
Webhooks to implement:
□ customers/data_request
□ customers/redact
□ shop/redact

Test each webhook fires and responds correctly.
```

### Step 7.3: Privacy Policy
```
Requirements:
□ What data is collected
□ How data is used
□ How data is stored
□ Contact information
□ Host on accessible URL
```

### Step 7.4: Deploy to Production
```
Requirements:
□ Set up Vercel project
□ Configure environment variables
□ Update app URLs in Partner Dashboard
□ Test production deployment
```

### Step 7.5: Test as Real Merchant
```
Requirements:
□ Install on fresh dev store
□ Complete full user flow
□ Uninstall and reinstall
□ Verify data handling
```

### Step 7.6: Submit for Review
```
Submission checklist:
□ App listing complete
□ All URLs working
□ Test accounts provided
□ Demo store link
□ Click "Submit for review"
```

### Step 7.7: Address Review Feedback
```
If rejected:
□ Read feedback carefully
□ Fix all issues
□ Document changes
□ Resubmit
```

**Milestone 7 Exit Criteria:**
- [ ] App approved and live
- [ ] Listing complete
- [ ] Production deployment stable

---

# SECTION 5: QUALITY ASSURANCE

## 5.1 Code Standards

| Standard | Enforcement |
|----------|-------------|
| TypeScript strict mode | tsconfig.json |
| ESLint rules | .eslintrc.cjs |
| Prettier formatting | .prettierrc |
| No `any` types | ESLint rule |
| Meaningful variable names | Code review |
| Components under 200 lines | Manual review |

## 5.2 Commit Message Format

```
type: subject

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Examples:
feat: add product picker component
fix: resolve GraphQL error on empty store
docs: update README with setup instructions
```

## 5.3 Git Workflow

```
main (production-ready)
  │
  └── feature/gallery-builder (work in progress)
        │
        └── commit: feat: add layout selector
        └── commit: feat: add product picker
        └── commit: fix: handle empty product list
        │
        └── PR → main (when feature complete)
```

## 5.4 Verification Checklist (Every Commit)

```
Before every commit:
□ Code compiles without errors
□ No console errors in browser
□ Feature works as expected
□ Existing features still work
□ Mobile responsive
```

---

# SECTION 6: RISKS & MITIGATIONS

| Risk | Impact | Mitigation |
|------|--------|------------|
| Shopify API changes | App breaks | Use stable API version, monitor changelog |
| App Store rejection | Delays launch | Follow guidelines strictly, test thoroughly |
| Performance issues | Poor user experience | Lazy loading, optimize queries |
| Complex edge cases | Bugs in production | Comprehensive testing, error boundaries |

---

# SECTION 7: RESOURCES

## Documentation
- Shopify App Development: https://shopify.dev/docs/apps
- Polaris Components: https://polaris.shopify.com/
- GraphQL Admin API: https://shopify.dev/docs/api/admin-graphql
- App Bridge: https://shopify.dev/docs/api/app-bridge
- Theme Extensions: https://shopify.dev/docs/apps/build/online-store/theme-app-extensions

## Tools
- GraphiQL: localhost:3457/graphiql (during dev)
- React DevTools: Browser extension
- Shopify DevTools: Browser extension

---

# SECTION 8: SIGN-OFF

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | Charles | | |
| Technical Lead | Claude | December 22, 2024 | ✓ |

---

*This document is the source of truth for the Art Gallery Pages project. All development should align with this specification.*
