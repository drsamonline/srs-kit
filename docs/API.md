# srs-kit — API reference

**Version 1.0.0.** **Spaced repetition (SM-2).** Zero dependencies. One file. SM-2 scheduling for flashcards — the shared logic extracted from the drsamonline apps that repeat it.

Generated from the source in this repository: every name, argument and
note below is read out of the kit file, so it cannot describe a function
that is not there.

```js
<script src="srs-kit.js"></script>
Srs.DEFAULTS(...)
// or: const Srs = require('./srs-kit.js')
```

## The surface (6 entries)

| Name | Arguments | What it does |
|---|---|---|
| `Srs.DEFAULTS` | `()` | — |
| `Srs.newCard` | `(extra)` | — |
| `Srs.review` | `(card, quality, now, opts)` | — |
| `Srs.isDue` | `(card, now)` | — |
| `Srs.dueCards` | `(cards, now, opts)` | — |
| `Srs.stats` | `(cards, now)` | — |

## Notes

- Zero dependencies, one file, no build step: it works from `file://`, from a
  `<script>` tag and from Node.
- The version above is the `VERSION` file in this repository; a pinned copy is
  what an app vendors.
