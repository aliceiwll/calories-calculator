/**
 * PortionSheet — how much, which meal, and what happens next.
 *
 * One sheet for both jobs. Adding a food and editing one already in the
 * record ask the same two questions, so they use the same control; what
 * differs is what the buttons promise, and that is the whole of the
 * difference:
 *
 *   add   → "Add to today", and no way to remove something that is not
 *           there yet.
 *   edit  → "Save changes", with "Remove from today" underneath.
 *
 * Before this existed the two flows had grown separate copies of the
 * same sheet, which is how one of them ended up offering to remove a
 * food that had never been added.
 *
 * The meal is asked in both. When adding it is a suggestion from the
 * clock and says so; when editing it is simply what the entry is, and
 * needs no explanation.
 */

import { useEffect, useMemo, useState } from 'react';
import { Sheet } from './Sheet';
import { PortionControl } from './PortionControl';
import { FilterChips } from './FilterChips';
import { MEALS } from './data';

export function PortionSheet({
  mode = 'add',            // 'add' | 'edit'
  open,
  food,                    // { name, units, kcalPer100 }
  meal,
  onClose,
  onSubmit,
  onRemove,
}) {
  const [draft, setDraft] = useState(null);
  const [chosen, setChosen] = useState(meal);

  /* Only the meal is reset here. The amount resets by itself, because
     PortionControl is keyed on the food and remounts with it — and
     clearing the draft from this effect actively broke the flow: child
     effects run before parent ones, so this wiped the initial reading
     the control had just emitted and every add fell back to 100 g. */
  useEffect(() => { setChosen(meal); }, [meal, food?.name]);

  const adding = mode === 'add';

  /* An entry records how much was eaten only as a sentence — "2 pieces"
     — so there is nothing structured to reopen on unless a previous
     draft left one. Failing that, reconstruct the count from the figure
     the entry already carries: the unit's own weight says what one of
     them costs, and the entry's kcal says how many there were. */
  const initial = useMemo(() => {
    if (adding || !food) return undefined;
    if (food.amount) return food.amount;
    const first = food.units?.[0];
    const one = first && food.kcalPer100 ? (food.kcalPer100 * first.grams) / 100 : 0;
    if (!one || food.kcal == null) return undefined;
    return { count: Math.max(1, Math.round(food.kcal / one)), unitLabel: first.label };
  }, [adding, food]);

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={food?.name}
      meta={adding ? 'How much of it?' : 'How much was it?'}
      footer={
        <>
          <button
            className="button"
            type="button"
            onClick={() => onSubmit({ ...(draft ?? {}), meal: chosen })}
          >
            {adding ? 'Add to today' : 'Save changes'}
          </button>

          {!adding && onRemove && (
            <button className="today__minor" type="button" onClick={onRemove}>
              Remove from today
            </button>
          )}
        </>
      }
    >
      {food && (
        <>
          <PortionControl
            key={food.name}
            units={food.units}
            kcalPer100={food.kcalPer100}
            initial={initial}
            onChange={setDraft}
          />

          <div className="mealpick">
            <span className="mealpick__label">{adding ? 'Adding to' : 'Meal'}</span>
            <FilterChips label="Meal" options={MEALS} value={chosen} onChange={setChosen} bleed={false} />
            {adding && <p className="mealpick__hint">Suggested from the time of day.</p>}
          </div>
        </>
      )}
    </Sheet>
  );
}
