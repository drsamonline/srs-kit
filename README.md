# srs-kit

[![live](https://img.shields.io/badge/live-online-22c55e)](https://drsamonline.github.io/srs-kit/)
[![test](https://github.com/drsamonline/srs-kit/actions/workflows/test.yml/badge.svg)](https://github.com/drsamonline/srs-kit/actions/workflows/test.yml)
[![License: PolyForm Noncommercial 1.0.0](https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue)](LICENSE)

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

## Support

<img src="docs/assets/support-portrait.jpg" width="72" height="72" alt="Dr. Sohil Momin" align="left" style="border-radius:50%;margin-right:1rem">

Free, offline, accountless — and staying that way. If it earned its keep:

| | |
|---|---|
| UPI (India) | `drsohilboi@ybl` — payee Dr. Sohil Momin, open amount, or scan [the QR](docs/assets/upi-qr.svg) |
| Ko-fi | [ko-fi.com/matneo](https://ko-fi.com/matneo) |
| PayPal | [paypal.me/drsohilmomin](https://paypal.me/drsohilmomin?locale.x=en_GB&country.x=IN) |
| My books | [Amazon author store](https://www.amazon.com/stores/author/B08ZT331LY/allbooks?ccs_id=aed72b9f-71d9-41dc-adee-e9368a317acc) |
| More apps | [drsamonline.github.io](https://drsamonline.github.io/) |
| Email | [sohilmomin2000@gmail.com](mailto:sohilmomin2000@gmail.com) |

Nothing is gated behind it: no accounts, no tracking, no network requests.

## Licence

MIT. (c) 2026 Dr Sohil Momin. Part of the Forge system — kits open, orchestrator licensed.
