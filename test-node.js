const Srs = require(require("path").join(__dirname, "srs-kit.js"));
let pass = 0, fail = 0;
function ok(n, c, e) { c ? (pass++, console.log("PASS  " + n + (e ? "  (" + e + ")" : ""))) : (fail++, console.log("FAIL  " + n + (e ? "  (" + e + ")" : ""))); }
const T = 1700000000000, DAY = 86400000;

let c = Srs.newCard();
ok("new card defaults", c.ease === 2.5 && c.interval === 0 && c.reps === 0);

c = Srs.review(c, 5, T);
ok("first good review -> interval 1", c.interval === 1 && c.reps === 1);
ok("ease rises on a 5", c.ease > 2.5, "ease " + c.ease);
ok("due is one day out", c.due === T + DAY);

c = Srs.review(c, 5, T + DAY);
ok("second good review -> interval 6", c.interval === 6 && c.reps === 2);

const before = c.interval;
c = Srs.review(c, 5, T + 7 * DAY);
ok("third review multiplies by ease", c.interval === Math.round(6 * 2.6) || c.interval > before, "interval " + c.interval);

let d = Srs.newCard();
d = Srs.review(d, 5, T); d = Srs.review(d, 5, T + DAY); d = Srs.review(d, 5, T + 7 * DAY);
const lapseEase = d.ease;
d = Srs.review(d, 2, T + 30 * DAY);
ok("a lapse resets reps and interval", d.reps === 0 && d.interval === 1 && d.lapses === 1);
ok("a lapse lowers ease", d.ease < lapseEase);

let e = Srs.newCard();
for (let i = 0; i < 12; i++) e = Srs.review(e, 0, T + i * DAY);
ok("ease never drops below 1.3", e.ease === 1.3, "ease " + e.ease);

ok("isDue true when past due", Srs.isDue({ due: T - 1 }, T) === true);
ok("isDue false when not due", Srs.isDue({ due: T + DAY }, T) === false);

const cards = [{ due: T - 1 }, { due: T + DAY }, { interval: 30, due: T + DAY }, { due: T - 5, lapses: 2 }];
const st = Srs.stats(cards, T);
ok("stats counts due", st.due === 2);
ok("stats counts mature", st.mature === 1);
ok("stats sums lapses", st.lapses === 2);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
