# Three-Frame Thinking

## The Pattern That Changes How You Build

Most people stay stuck in one thinking frame their whole career. The reason most projects fail isn't skill — it's that the builder only ever sees the problem through one lens.

Three-Frame Thinking is a simple rotation: **yourself, your customer, your stakeholder.** You hold two at a time and rotate. That's it.

---

## The Three Frames

### Frame 1: Me (the builder)

The craft frame. This is what you naturally default to:

- Is the code clean?
- Is the architecture right?
- Am I learning something?
- Is this interesting to build?

**Alone, this frame produces:** Over-engineered systems, abandoned side projects, features nobody asked for, and beautiful code that doesn't solve a real problem.

### Frame 2: Customer (the user)

The empathy frame. Harder to hold because it requires imagination:

- Does this actually work for a real person?
- Is this intuitive or does it need instructions?
- What would frustrate me if I were using this?
- Does this solve the pain or just add polish?

**Alone, this frame produces:** Scope creep, gold-plating, never shipping, feature bloat. The customer always wants more.

### Frame 3: Boss (the stakeholder)

The accountability frame. The one most developers resist:

- Does this ship?
- Is this worth the time it costs?
- Does this create future debt?
- Will this hold up under real conditions?

**Alone, this frame produces:** Junk shipped on time, technical debt, burned-out teams, products nobody loves.

---

## The Rotation (The Actual Mechanism)

You can't hold all three at once. That causes decision paralysis. The trick is to **rotate two at a time** depending on what you're doing:

| Activity | Active Frames | Question you're answering |
|----------|---------------|--------------------------|
| Planning | Customer + Boss | What should we build, and is it worth it? |
| Writing code | Me + Customer | Is this clean AND does it serve the user? |
| Reviewing | Me + Boss | Is this sound AND will it ship safely? |
| Debugging | Customer + Boss | Does this block the user AND block shipping? |
| Refactoring | Me + Boss | Does this improve the code AND justify the time? |

---

## Why It Works

The rotation catches blind spots that a single frame never sees:

- **Me → Customer** catches: "I was building this because it's fun, but the user doesn't need it."
- **Customer → Boss** catches: "The user wants this, but it would delay shipping by 3 months."
- **Boss → Me** catches: "Shipping fast is good, but this code is going to collapse next sprint."

Each transition is a **reality check** on the frame you were just in.

---

## Real Example

Building the Pau translation app:

- **Me** wants to build a custom neural network from scratch because it's interesting
- **Customer** wants translations to work, doesn't care how
- **Boss** wants the app to ship this year

**Me + Customer** rotation catches: "I can use an existing model API and still deliver good translations — the user doesn't care about my architecture."

**Customer + Boss** rotation catches: "Offline support matters more than voice input. Ship offline first, voice later."

**Me + Boss** rotation catches: "This quick shared_preferences solution works now but will break at scale. Invest a day in Hive before it becomes an emergency."

---

## The Origin

This framework wasn't read in a book. It was derived from driving and thinking about why things weren't working:

> "I was driving and trying to figure out life really. Of why am I not able to make it or succeed. I realized that I do have to think about my boss and my customers."

The realization was that **success isn't about talent or effort — it's about seeing the full picture.** Each frame is a piece of the picture. Two at a time, rotating, is enough to see the whole thing.

---

## How To Use It

1. **Name your three.** Who is Me, Customer, and Boss in your specific context? Write them down.
2. **Tag your current activity.** Planning? Coding? Reviewing? Each has a default pair.
3. **Check the inactive frame.** Ask: "What would Frame 3 say about this?" as a closing thought before you commit.
4. **When stuck, switch frames.** Decision paralysis usually means you're stuck in one frame. Pick a different pair.

That's the whole system. No app, no template, no subscription. Just three labels and rotation discipline.
