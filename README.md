# srs-kit

[![live](https://img.shields.io/badge/live-online-22c55e)](https://drsamonline.github.io/srs-kit/)
[![test](https://github.com/drsamonline/srs-kit/actions/workflows/test.yml/badge.svg)](https://github.com/drsamonline/srs-kit/actions/workflows/test.yml)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**Spaced repetition (SM-2).** Zero dependencies. One file. SM-2 scheduling for flashcards — the shared logic
extracted from the drsamonline apps that repeat it.

## Use it

See `srs-kit.js` for the full API and `test-node.js` for worked examples.

## What it does

- SM-2 scheduling
- ease / interval / reps
- lapses reset the interval
- due cards + stats
- **a configurable cadence** — first interval, second interval and lapse interval
  (each may live on the card, so a deck carries its own)
- **a daily cap** on the due queue, so a backlog does not become a wall

The cadence and the cap were reverse-imported from `conqueror-os`, whose scheduler
had them while this kit hardcoded 1 and 6. Both are **opt-in**, so an existing
caller keeps the old behaviour exactly.

## Verified

```
node test-node.js
23 passed, 0 failed
```

## Consumers

mnemosyne-companion, unstoppable-mind-companion, the-symphony-companion, read-live-transform-app

## Licence

MIT. (c) 2026 Dr Sohil Momin. Part of the Forge system — kits open, orchestrator licensed.
