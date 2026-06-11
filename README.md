# Zomi Spelling Guide

A community-driven reference for writing clean, consistent Zomi.

🌐 **Website:** [https://paumkim.github.io/zomi-website/](https://paumkim.github.io/zomi-website/)

---

## What's here

- **`docs/`** — Markdown source files for the website
- **`mkdocs.yml`** — Site configuration (MkDocs + Material theme)
- **`.github/workflows/ci.yml`** — Auto-deploy to GitHub Pages on push

## Local development

```bash
pip install mkdocs mkdocs-material
mkdocs serve
```

Open `http://localhost:8000` to preview.

## Deploy

Push to `main` and the workflow deploys automatically. Or run manually:

```bash
mkdocs gh-deploy --force
```

## Related

- **Zomi Dataset Collector** — `/home/pauk/zomi_dataset/`
- **Normalizer** — `normalize/normalizer.py` (merge rules for spelling)
- **Clean corpus** — `data/zomi_clean.txt`

---

Built for the Zomi community.
