# Git Workflow

## Branch Strategy

We use a **trunk-based development** model with short-lived feature branches.

```
main                 ← Production-ready code only
  └── staging        ← Pre-production validation
        └── develop  ← Integration branch
              ├── feature/catalogue-module
              ├── feature/rental-lifecycle
              └── fix/rental-status-bug
```

## Branch Naming

```
feature/<module>-<description>    feature/catalogue-spec-system
fix/<description>                 fix/rental-status-transition
hotfix/<description>              hotfix/payment-webhook-crash
chore/<description>               chore/update-dependencies
docs/<description>                docs/api-catalogue-endpoints
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <short description>

feat(catalogue): add polymorphic specification system
fix(rental): correct status transition from RETURNED to INSPECTED
chore(deps): upgrade Prisma to 5.16
docs(api): document rental lifecycle endpoints
test(auth): add integration tests for refresh token flow
refactor(utils): simplify slug generation
```

### Types

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Non-functional change (deps, config) |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `refactor` | Code restructuring without behaviour change |
| `perf` | Performance improvement |
| `ci` | CI/CD changes |

## Pull Request Rules

- Every PR targets `develop` (not `main` directly)
- Every PR must have at least one reviewer
- All tests must pass
- No console.log statements in production code
- PR title must follow the commit convention format
