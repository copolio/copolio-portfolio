---
name: commit
description: Create a git commit by reviewing changes, drafting a message, and committing.
disable-model-invocation: true
---

# Git Commit

## Steps

1. Run these in parallel to understand current state:
   - `git status` (never use `-uall` flag)
   - `git diff` and `git diff --staged` to see all changes
   - `git log --oneline -5` to match existing commit message style

2. Analyze all changes and draft a commit message:
   - Use conventional commits: `type: description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Keep the first line concise (under 72 chars), focus on "why" not "what"
   - Do not commit files that may contain secrets (.env, credentials, etc.)

3. Stage relevant files by name (avoid `git add -A` or `git add .`), then commit:

   ```
   git commit -m "$(cat <<'EOF'
   type: message
   EOF
   )"
   ```

4. Run `git status` after commit to verify success.

## Rules

- NEVER amend existing commits unless explicitly asked
- NEVER push to remote unless explicitly asked
- NEVER use `--no-verify` or skip hooks
- NEVER use interactive flags (`-i`)
- If pre-commit hook fails, fix the issue and create a NEW commit
- If there are no changes to commit, inform the user instead of creating an empty commit
