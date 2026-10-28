---
name: humanizer
description: |
  Rewrite AI-sounding text so it reads like the writer without changing what it says.
  Use when editing or reviewing prose for AI tells: not-X-but-Y contrasts, one-line
  closers, staged openers, forced triads, dashes everywhere, inflated claims, sales
  language, stock AI words, bold labels, or filler. Based on Wikipedia's "Signs of AI writing."
license: MIT
metadata:
  author: blader
  source: https://github.com/blader/humanizer
  version: "3.1.0"
---

# Humanizer: remove AI writing patterns

Rewrite AI-sounding text so it reads like a person wrote it, without changing what it says. Keep factual claims accurate. Never hallucinate facts or fluff.

## The 26 Signs of AI Writing (Wikipedia Benchmark)

### 1. Not X but Y (Banned Formula)
- **Avoid:** "It's not just a wallpaper, it's a statement.", "This isn't about pixels, it's about emotion."
- **Fix:** State the actual fact or claim directly without fake contrast staging.

### 2. One-line Closers & Dramatic Fragments
- **Avoid:** "Let that sink in.", "Read that again.", "That is the real win.", "Every. Single. Pixel."
- **Fix:** Remove repetitive summarizing punchlines. Every sentence must deliver concrete new data.

### 3. Sayings that Sound Deep
- **Avoid:** "At its core...", "In reality, what really matters is...", "X is the currency of Y."
- **Fix:** Replace hollow aphorisms with specific, verifiable engineering facts.

### 4. Staged Run-ups
- **Avoid:** "Let's dive in", "Let's explore", "Here's the thing", "Without further ado", "Honestly?"
- **Fix:** Cut the announcer run-up and start directly with the core answer.

### 5. Arguing with No One
- **Avoid:** "I'm not saying X doesn't matter, but...", "You might think 4K is overkill, but..."
- **Fix:** Remove defensive disclaimers unless addressing a genuine documented user objection.

### 6. Forced Triads
- **Avoid:** Grouping ideas into sets of three just for rhythmic symmetry ("clarity, contrast, and color").
- **Fix:** Use only the exact number of points that the factual reality demands (two, four, or one).

### 7. Repeated Sentence Openings & Robotic Cadence
- **Fix:** Alternate between punchy short sentences and technical compound sentences. Mix active voice and passive voice organically.

### 8. Em-Dash Overuse
- **Avoid:** Sprinkling `—` dashes in every sentence. Use standard commas, colons, or clean periods.

### 9. Inflated Claims & Stock AI Adjectives
- **Avoid:** "Revolutionary", "Game-changing", "Testament", "Tapestry", "Beacon", "Pivotal", "Crucial", "Paramount".
- **Fix:** Use precise technical vocabulary (e.g., "3840×2160 native resolution", "10-bit color depth", "DCI-P3 99% coverage").

### 10. Generic Summary Conclusions
- **Avoid:** "In conclusion...", "To sum up...", "Whether you're a gamer or a creator..."
- **Fix:** Provide a concrete, actionable next step or reference a specific tool (`/tool/cropper`).
