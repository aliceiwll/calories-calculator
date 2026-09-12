/**
 * PhotoReviewScreen — flow A, photo branch.
 *
 * The estimate arrives as a draft, not an answer. Everything on this
 * screen is editable, nothing is committed until the user says so, and
 * the total is a range rather than a false-precision single figure.
 *
 * Why a range: photo estimation genuinely cannot resolve a plate to
 * ±5 kcal, and printing "551 kcal" claims accuracy the method doesn't
 * have. Showing 480–620 is both more honest and — usefully — reads as
 * an observation rather than a score, which keeps the photo branch
 * consistent with the rest of the product.
 *
 * No per-item confidence badges. They add noise, and a low-confidence
 * marker on a food is one design revision away from looking like
 * disapproval of that food. Editability covers the same need.
 *
 * Needed no new components: Row (entry variant), Sheet, PortionControl,
 * SectionHeader and Button all carried over unchanged.
 *
 * There was an "Add something it missed" button here that was wired to
 * nothing. A control that does not do what it says is worse than the
 * gap it was covering, so it is gone rather than guessed at.
 */

import { useState } from 'react';
import { Row } from './Row';
import { Sheet } from './Sheet';
import { PortionControl } from './PortionControl';
import { SectionHeader } from './SectionHeader';
import { ScreenHead } from './ScreenHead';

const round10 = (n) => Math.round(n / 10) * 10;

export function PhotoReviewScreen({ photo, detected, onAdd, onBack }) {
  const [items, setItems] = useState(detected);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(null);

  const mid = items.reduce((sum, i) => sum + i.kcal, 0);
  const low = round10(mid * 0.85);
  const high = round10(mid * 1.15);

  const replace = (id, kcal) =>
    setItems(items.map((i) => (i.id === id ? { ...i, kcal } : i)));

  return (
    <div className="screen screen--estimate">
      {/* A way out that writes nothing. The estimate screen used to have
          none: once you were here the only control that led anywhere was
          "Add to today". */}
      <div className="screen__head">
        <ScreenHead title="From the photo" onBack={onBack} />
      </div>

      <div className="screen__body">
        <div className="estimate__photo" style={photo ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover' } : undefined} />

        <p style={{
          fontFamily: 'var(--voice-family)',
          fontSize: 'var(--voice-size)',
          lineHeight: 'var(--voice-leading)',
          color: 'var(--voice-color)',
          margin: '0 0 var(--space-2)',
        }}>
          Estimated from the photo. Change anything that’s off.
        </p>

        <SectionHeader label="On the plate" note="kcal" />

        <div className="list">
          {items.map((item) => (
            <Row
              key={item.id}
              variant="entry"
              name={item.name}
              meta={item.portion}
              figure={item.kcal}
              onSelect={() => setEditing(item)}
            />
          ))}
        </div>

        <div className="estimate__total">
          <span style={{ fontFamily: 'var(--family-record)', fontSize: 'var(--size-200)', color: 'var(--text-muted)' }}>
            Roughly
          </span>
          <span className="estimate__range">{low}–{high}<span className="figure__unit">kcal</span></span>
        </div>

        <button className="button" type="button" onClick={() => onAdd(items)}>
          Add to today
        </button>
      </div>

      <Sheet
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.name}
        meta="How much was it?"
        footer={
          <button
            className="button"
            type="button"
            onClick={() => {
              replace(editing.id, draft?.kcal ?? editing.kcal);
              setEditing(null);
            }}
          >
            Save
          </button>
        }
      >
        {editing && (
          <PortionControl
            units={editing.units}
            kcalPer100={editing.kcalPer100}
            onChange={setDraft}
          />
        )}
      </Sheet>
    </div>
  );
}
