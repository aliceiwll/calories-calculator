/**
 * PortionControl — how much of it.
 *
 * Household units first, grams last but always present. People know
 * they ate a bowl; they do not know it was 240 g, and making them
 * convert is the step where logging gets abandoned — so the chips carry
 * the conversion. But a scale is not an estimate, and someone who has
 * weighed their food should not have to express 137 g as "about one
 * cup". The grams chip is the escape from the household units, not a
 * separate mode of the component: it sits in the same row, and picking
 * it swaps the stepper for a field you can type into.
 *
 * Switching to grams keeps the weight you already had rather than
 * resetting — you arrive at the field with the estimate you were about
 * to correct, which is usually a small edit rather than a fresh entry.
 * Switching back to a household unit resets to one of them, because
 * "1 bowl" is a claim about a bowl and not about the grams that were
 * on screen a moment ago.
 *
 * Each chip carries its own weight, stacked under the unit name.
 * Without it the chips are a guess you can only check after committing
 * to it — you pick "bowl", read the grams underneath, and go back. The
 * weight is the whole basis of the estimate, so it belongs on the thing
 * you choose, not in the result of having chosen.
 *
 * The figure cross-fades on change (see .portion__figure). It never
 * counts up: a rising number makes a total feel earned.
 */

import { useEffect, useState } from 'react';

const GRAMS = { label: 'grams', grams: 1, manual: true };

const round = (n) => Math.round(n);
const digits = (value) => value.replace(/\D/g, '').slice(0, 4);

export function PortionControl({
  units = [],              // [{ label, grams }]
  kcalPer100,
  onChange,
  allowGrams = true,       // off where a typed weight makes no sense
  format,                  // (count, unit) => string, for the count line
  initial,                 // { count, unitLabel, grams, manual } — where to open
}) {
  /* Servings of a recipe have no gram entry: nobody weighs out 240 g of
     a stew, and offering the field implies the recipe knows a density
     it does not have. Off by default nowhere — every existing caller
     is a food, where weighing is exactly the point. */
  const options = allowGrams ? [...units, GRAMS] : [...units];

  /* Opening at one unit is right for a new entry and wrong for an
     existing one: the sheet is also how you change an entry's meal, and
     an amount that resets on open rewrites the record for anyone who
     came to change something else. */
  const start = initial?.manual
    ? options.find((o) => o.manual)
    : options.find((o) => o.label === initial?.unitLabel);

  const [unit, setUnit] = useState(start ?? options[0]);
  const [amount, setAmount] = useState(
    initial?.manual ? String(initial.grams ?? 100) : String(initial?.count ?? 1),
  );

  /* One field, two meanings: a count of household units, or a weight in
     grams. They never coexist, and keeping them in one place is what
     lets the stepper stay the same control in both. */
  const n = Number(amount) || 0;
  const manual = !!unit.manual;
  const step = manual ? 10 : 1;

  const grams = manual ? n : round(unit.grams * n);
  const kcal = round((kcalPer100 * grams) / 100);

  const choose = (next) => {
    setAmount(next.manual ? String(grams || Math.round(unit.grams)) : '1');
    setUnit(next);
  };

  useEffect(() => {
    onChange?.({ unit, count: n, grams, kcal });
  }, [unit, amount]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="portion">
      {options.length > 1 && (
        <div className="portion__units">
          {options.map((u) => (
            <button
              key={u.label}
              className="portion__unit"
              type="button"
              aria-pressed={u.label === unit.label}
              aria-label={u.manual ? 'Grams, typed' : `${u.label}, about ${u.grams} grams`}
              onClick={() => choose(u)}
            >
              <span className="portion__unit-label">{u.label}</span>
              <span className="portion__unit-grams" aria-hidden="true">
                {u.manual ? 'exact' : `~${u.grams} g`}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="portion__amount">
        <button
          className="portion__step"
          type="button"
          aria-label="Less"
          disabled={n <= step}
          onClick={() => setAmount(String(Math.max(step, n - step)))}
        >
          −
        </button>

        <span className="portion__count">
          {manual ? (
            <>
              <input
                className="portion__input"
                type="text"
                inputMode="numeric"
                value={amount}
                aria-label="Weight in grams"
                onChange={(e) => setAmount(digits(e.target.value))}
              />
              <span className="portion__count-unit">g</span>
            </>
          ) : (
            <span aria-live="polite">
              {format ? format(n, unit) : `${n} × ${unit.label}`}
            </span>
          )}
        </span>

        <button
          className="portion__step"
          type="button"
          aria-label="More"
          onClick={() => setAmount(String(n + step))}
        >
          +
        </button>
      </div>

      <div className="portion__result">
        {/* In grams mode the weight is the thing being typed, so
            repeating it here would be an echo rather than a result. */}
        <span className="portion__grams">{manual ? `${kcalPer100} kcal / 100 g` : `${grams} g`}</span>
        <span className="portion__figure" key={kcal}>{kcal}<span className="figure__unit">kcal</span></span>
      </div>
    </div>
  );
}
