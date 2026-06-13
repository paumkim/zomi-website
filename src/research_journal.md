# Research Journal — Building the First Zomi AI

*A live log of discoveries, decisions, failures, and breakthroughs.*

---

## Entry 1: June 12, 2026 — The Training Pipeline

### What We Learned

**The golden setup for low-cost language model training:**
- GPU: A100 SXM4-80GB ($1.50/hr on RunPod)
- Template: RunPod PyTorch 2.8.0 (native CUDA 12.8, no compatibility layer)
- Container disk: 100 GB (50 GB minimum)
- Model: Qwen 2.5 3B with QLoRA rank 128
- Dataset: 3M+ lines packed into 53,896 chunks (~4000 chars each)
- Speed: ~17-20s per step on A100 with native CUDA
- Total steps: ~8,000 (5 epochs)
- Cost: ~$60 for full run

### Real Costs Incurred (6 Pods)

| Pod | GPU | Time | Cost | Result |
|-----|-----|------|------|--------|
| 1 | A100 SXM | ~1 hr | ~$1.49 | First pod, ran but slow |
| 2 | A40 48GB | ~1.5 hr | ~$0.66 | CUDA mismatch, 85s/step |
| 3 | A100 PCIe | Brief | ~$0 | OOM on 20GB disk |
| 4 | A40 48GB | ~2 hr | ~$0.88 | Trained but 28s/step, disk full |
| 5 | A100 SXM | ~3 hr | ~$4.47 | Various torch experiments |
| 6 | A100 SXM | ~2 hr | ~$2.98 | Tested 7B at 29s/step, killed |
| **Total** | | | **~$10-12** | **Bridge + Agent + Docs** |

### Errors We Hit & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| CUDA out of memory | Pre-tokenizing 3M lines | Pack lines into chunks first |
| Subprocess died during map | Memory spike with 4 workers | Use `num_proc=1` or char-based packing |
| `dtype` not recognized | Wrong transformers version | `torch_dtype=` for 4.x, `dtype=` for 5.x |
| `remove_unused_columns` | Trainer drops text column | Add `remove_unused_columns=False` |
| I/O error (Errno 5) | Transient disk failure on pod | Watchdog auto-resumes from checkpoint |
| Model too slow | CUDA 11.8 PyTorch on A100 | Use PyTorch 2.8.0+cu128 (native CUDA 12.8) |
| HF token rejected by GitHub | Token in source code | Use env vars: `export HF_TOKEN=...` |

### Key Decisions

1. **3B over 7B** — 3B is sufficient for conversational Zomi, trains in 1/3 the time, runs on laptops
2. **Rank 128 over 64** — More adapter capacity for learning a new language from scratch
3. **Packed chunks over per-line** — 53k steps instead of 453k (15x faster)
4. **Base model over instruct** — Pure language engine, no chat fluff contamination
5. **Native CUDA 12.8 over compat layer** — 2.4x speed improvement

### Quick Start (Copy-Paste Ready)

```bash
# 1. Deploy: A100 SXM, 100GB disk, SSH key pre-set, RunPod PyTorch 2.8.0

# 2. Copy files
scp -P <port> zomi_clean_p*.txt root@<ip>:/workspace/data/

# 3. Download and customize script
ssh -p <port> root@<ip> "curl -L https://raw.githubusercontent.com/paumkim/zomi-dataset/main/cloud_train.py -o /workspace/cloud_train.py"
ssh -p <port> root@<ip> "sed -i 's/2.5-7B/2.5-3B/' /workspace/cloud_train.py"

# 4. Login and run
ssh -p <port> root@<ip> "hf auth login --token YOUR_TOKEN && cd /workspace && nohup python cloud_train.py > training.log 2>&1 &"

# 5. Deploy watchdog for auto-recovery
scp scripts/watchdog.sh root@<ip>:/workspace/
ssh -p <port> root@<ip> "chmod +x /workspace/watchdog.sh && nohup bash /workspace/watchdog.sh &"
```

### Infrastructure Built

| Tool | Purpose | Location |
|------|---------|----------|
| Bridge server | Direct agent access to laptop | `~/.bridge_server.py` on port 9876 |
| Personal agent | Local AI assistant with memory | `~/.paumkim_agent.py` |
| Training watchdog | Auto-restarts on crash | `scripts/watchdog.sh` |
| Checkpoint auto-resume | Resumes from last save | Built into `cloud_train.py` |
| Model auto-upload | Pushes to HF after training | Built into `cloud_train.py` |

---

## Entry 2: June 12, 2026 — The Pure Language Engine Philosophy

**Core insight:** A language model doesn't need to know dates, facts, or world knowledge to speak a language well. By stripping away everything except language patterns, we can train smaller, faster, cheaper models that outperform general models at their single task.

**The architecture:**
- Frozen base model (Qwen) → provides language machinery
- Specialized adapter (LoRA) → learns target language
- Swappable adapters → one brain, many skills

**The upgrade path:**
- Dataset is the permanent asset (never gets replaced)
- Adapter is temporary (retrained when base model improves)
- Base model is upgradable (swap and retrain for ~$60)

---

## Entry 3: June 12, 2026 — App Concept: Pau

**Name:** Pau — means "voice" in Zomi, also the creator's name.
**Logo:** Three-peak hill silhouette (Chin Hills) in deep red to gold gradient.
**Strategy:** Belonging first, AI second.

**App structure:**
1. 📖 Laisiangtho — Tedim Bible (offline, first thing they see)
2. 🎵 La — Worship lyrics with chords (offline)
3. 📚 Sinna — Golden textbooks K-4 (offline)
4. 🤖 AI Kammal — Zomi AI chat (cloud by default, offline optional)

**AI availability:**
- Cloud AI: works on first launch, ~30 MB app
- Offline model: optional ~1.8 GB download in Settings
- Bible + Lyrics + Textbooks: fully offline from install

**Core principle:** A grandmother with a $50 phone gets the same belonging feeling as a youth with the latest Samsung.

---

## Entry 4: June 12, 2026 — Disaster Recovery

After an I/O error killed training at step 2000/8005, we built a self-healing pipeline:

1. Checkpoints save every 200 steps
2. `cloud_train.py` auto-detects and resumes from latest checkpoint
3. `watchdog.sh` checks every 60 seconds if training is alive
4. If dead, restarts from latest checkpoint automatically

**Result:** Training crashed, recovered within 60 seconds, resumed from step 2000 with zero manual intervention.

---

## Entry 5: June 12, 2026 — Agent Architecture

Building tools that AI agents can discover and use without documentation:

**The bridge server pattern:**
```
GET  /ping    → health check
POST /exec    → run command
POST /read    → read file
POST /write   → write file
```

**Principles for agent-friendly design:**
1. Self-describing interfaces (endpoints tell the agent what they do)
2. Consistent verbs (same pattern everywhere)
3. Discoverable endpoints (agent can explore without docs)
4. Predictable error handling (structured errors, not HTML)
5. Stateless design (each request carries everything needed)

---

*This journal is a living document. Each training session, experiment, and breakthrough gets recorded here.*
