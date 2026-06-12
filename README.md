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

- **Zomi Dataset** — [github.com/paumkim/zomi-dataset](https://github.com/paumkim/zomi-dataset) — 3M+ sentences, the largest Zomi corpus ever assembled
- **Zomi Dataset Collector** — `/zomi_dataset/`
- **Normalizer** — `normalize/normalizer.py` (merge rules for spelling)
- **Clean corpus** — `data/zomi_clean.txt`
- **AI Training Guide** — [cloud_training_guide.md](https://github.com/paumkim/zomi-dataset/blob/main/docs/cloud_training_guide.md) — Train an AI to speak Zomi

---

Built for the Zomi community.
Dammaw! 🔥
# Trigger deploy
