/* srs-kit — spaced repetition (SM-2). Zero dependencies.
 *
 * The shared scheduling behind every study/companion app: given a card and how
 * well it was recalled, decide when to show it again.
 *
 *   var c = Srs.newCard();
 *   c = Srs.review(c, 5, Date.now());   // recalled easily
 *   c = Srs.review(c, 2, Date.now());   // forgot -> resets
 *
 * MIT License. (c) 2026 Dr Sohil Momin.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Srs = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  var S = { version: "0.2.0" };
  var DAY = 86400000;

  /* The two numbers SM-2 hardcodes are 1 and 6 - but a scheduler that cannot
     change them is wrong for anyone whose cadence is not "tomorrow, then in six
     days". conqueror-os had made all of these configurable; folded back here, and
     every one is OPT-IN so an existing caller keeps the old behaviour exactly. */
  S.DEFAULTS = { firstInterval: 1, secondInterval: 6, lapseInterval: 1, dailyCap: 0 };

  function pick(a, b, d) { return a == null ? (b == null ? d : b) : a; }

  S.newCard = function (extra) {
    var c = { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: 0, last: 0 };
    if (extra) for (var k in extra) c[k] = extra[k];
    return c;
  };

  /* quality 0..5 (SM-2). <3 is a lapse and resets the interval.
     opts (all optional): firstInterval, secondInterval, lapseInterval. Each may
     also live on the card, so a deck can carry its own cadence. */
  S.review = function (card, quality, now, opts) {
    now = now == null ? Date.now() : now;
    opts = opts || {};
    var first = Math.max(1, pick(opts.firstInterval, card.firstInterval, S.DEFAULTS.firstInterval));
    var second = Math.max(1, pick(opts.secondInterval, card.secondInterval, S.DEFAULTS.secondInterval));
    var lapseIvl = Math.max(0, pick(opts.lapseInterval, card.lapseInterval, S.DEFAULTS.lapseInterval));
    var q = Math.max(0, Math.min(5, quality | 0));
    var ease = card.ease || 2.5;
    var interval = card.interval || 0;
    var reps = card.reps || 0;
    var lapses = card.lapses || 0;

    if (q < 3) {
      reps = 0;
      lapses += 1;
      interval = lapseIvl;                // default 1: see it again tomorrow
    } else {
      reps += 1;
      interval = reps === 1 ? first : reps === 2 ? second : Math.round(interval * ease);
    }
    ease = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (ease < 1.3) ease = 1.3;

    return { ease: Math.round(ease * 1000) / 1000, interval: interval, reps: reps, lapses: lapses,
             last: now, due: now + interval * DAY };
  };

  S.isDue = function (card, now) { now = now == null ? Date.now() : now; return (card.due || 0) <= now; };
  /* The due queue, optionally CAPPED for the day (opts.cap, 0 = no cap). A cap is
     what stops a backlog turning a daily review into a wall. (From conqueror-os.) */
  S.dueCards = function (cards, now, opts) {
    var due = (cards || []).filter(function (c) { return S.isDue(c, now); });
    var cap = pick(opts && opts.cap, null, S.DEFAULTS.dailyCap);
    return cap > 0 ? due.slice(0, cap) : due;
  };

  S.stats = function (cards, now) {
    now = now == null ? Date.now() : now;
    var out = { total: (cards || []).length, due: 0, young: 0, mature: 0, lapses: 0 };
    (cards || []).forEach(function (c) {
      if (S.isDue(c, now)) out.due++;
      if ((c.interval || 0) >= 21) out.mature++; else out.young++;
      out.lapses += c.lapses || 0;
    });
    return out;
  };

  return S;
});
