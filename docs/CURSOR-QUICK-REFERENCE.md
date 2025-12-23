# Cursor AI Quick Reference

## Giving Instructions to Cursor AI

### Template for Code Changes

```
TASK: [What needs to be done]

FILE: [path/to/file.ext]

CHANGE: [Description or exact code]

COMMIT: "[type]: [description]"
```

### Example Instructions

**Simple Fix:**
```
TASK: Fix img width/height error in theme extension

FILE: extensions/art-gallery-block/blocks/gallery.liquid

CHANGE: Add width="400" height="400" attributes to the img tag around line 37

COMMIT: "fix: add width/height to img for theme check compliance"
```

**New Feature:**
```
TASK: Add delete gallery functionality

FILES: 
- app/routes/app._index.tsx (add delete button)
- app/routes/app.gallery.$id.tsx (add delete action)

CHANGE: Add delete button to each gallery card, create DELETE action handler

COMMIT: "feat: add delete gallery functionality"
```

**Git Operations:**
```
TASK: Pull latest and push changes

COMMANDS:
1. git pull origin main
2. git add -A
3. git commit -m "docs: update readme"
4. git push origin main
```

---

## Commit Message Types

| Type | Use For |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change that doesn't fix bug or add feature |
| `test` | Adding tests |
| `chore` | Maintenance tasks |

---

## Common Cursor AI Commands

### Read a File
```
Read the file app/routes/app._index.tsx
```

### Search Shopify Docs
```
Using Shopify Dev MCP, search for "metafield mutations"
```

### Make a Change and Commit
```
Update [file] with [change], then commit with message "[type]: [description]"
```

### Run Terminal Command
```
Run: shopify app dev
```

---

## Verification Checklist

After Cursor AI makes changes:

- [ ] Terminal shows no errors
- [ ] Browser loads correctly
- [ ] Feature works as expected
- [ ] Report result to Claude.ai

---

## When to Ask Claude.ai

- Strategy decisions
- "Should I use X or Y approach?"
- Understanding WHY something works
- Code review
- Architecture questions
- When Cursor AI gives wrong answers

## When to Use Cursor AI

- Executing code changes
- Git operations
- Reading current file state
- Running commands
- Quick Shopify docs lookup
