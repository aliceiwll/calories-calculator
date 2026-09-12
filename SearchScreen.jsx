/**
 * SearchScreen — find a food, say how much, done.
 *
 * Reached from the search field on Today and from the "+" sheet. Both
 * arrive here rather than at two different searches.
 *
 * The meal is chosen here too, defaulted from the clock and changeable
 * before anything is written down.
 *
 * Results are the `result` variant of Row: two-line names, because what
 * distinguishes one cottage cheese from another is at the end of the
 * name. Choosing one opens the same portion sheet the record uses to
 * edit an entry — the same control, so the amount is expressed the same
 * way whether the food is new or already written down.
 */

import { useState } from 'react';
import { SearchField } from './SearchField';
import { ScreenHead } from './ScreenHead';
import { SectionHeader } from './SectionHeader';
import { Row } from './Row';
import { PortionSheet } from './PortionSheet';
import { FOODS } from './data';

export function SearchScreen({ initialQuery = '', defaultMeal, onBack, onAdd }) {
  const [query, setQuery] = useState(initialQuery);
  const [chosen, setChosen] = useState(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? FOODS.filter((f) => `${f.name} ${f.brand}`.toLowerCase().includes(q))
    : [];

  return (
    <div className="screen screen--search">
      {/* Interlock marks, cropped by the screen's edges. They carry no
          information — they are the brand's own shape, and the drawing
          places one at each opposite corner. */}
      <span className="mark mark--head" aria-hidden="true" />
      <span className="mark mark--foot" aria-hidden="true" />

      <div className="screen__head">
        <ScreenHead title="Search" onBack={onBack} />

        {/* The one place the app says why a record is worth keeping. */}
        <p className="search__statement">Every meal<br />is part of your day</p>

        <SearchField value={query} onChange={setQuery} />
      </div>

      <div className="screen__body">
        {!q && (
          <div className="empty">
            <p className="empty__text">
              Type a food or a dish. Brand names work too, if it came in a packet.
            </p>
          </div>
        )}

        {q && results.length === 0 && (
          <div className="empty">
            <p className="empty__text">Nothing matches “{query}”.</p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <SectionHeader label="Results" note="kcal / 100 g" separator />
            <div className="list">
              {results.map((food) => (
                <Row
                  key={food.id}
                  variant="result"
                  name={food.name}
                  meta={food.brand}
                  figure={food.kcalPer100}
                  onSelect={() => setChosen(food)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <PortionSheet
        mode="add"
        open={!!chosen}
        food={chosen}
        meal={defaultMeal}
        onClose={() => setChosen(null)}
        onSubmit={(draft) => {
          onAdd({
            name: chosen.name,
            portion: portionLabel(draft),
            kcal: draft.kcal ?? Math.round(chosen.kcalPer100),
            kcalPer100: chosen.kcalPer100,
            units: chosen.units,
            meal: draft.meal,
            amount: draft.unit
              ? { count: draft.count, unitLabel: draft.unit.label, grams: draft.grams, manual: !!draft.unit.manual }
              : undefined,
            macros: scaleMacros(chosen.macros, draft.grams ?? 100),
          });
          setChosen(null);
        }}
      />
    </div>
  );
}

const portionLabel = (draft) =>
  !draft.unit ? '1 portion'
    : draft.unit.manual ? `${draft.grams} g`
    : `${draft.count} × ${draft.unit.label}`;

/* Food tables are per 100 g; the record stores what was actually eaten. */
const scaleMacros = (macros, grams) => {
  if (!macros) return undefined;
  const factor = grams / 100;
  return Object.fromEntries(
    Object.entries(macros).map(([key, value]) => [key, Math.round(value * factor)]),
  );
};
