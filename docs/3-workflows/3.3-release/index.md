# Create a Release

**Triggers:** Push of a version tag matching `v*.*.*`

## Steps

1. Checkout and build
2. Zip `dist/` as `planner-<tag>.zip`
3. Create a GitHub Release with auto-generated release notes and the zip attached

## Usage

```bash
git tag v1.0.0
git push origin v1.0.0
```
