/**
 * Row — the list primitive.
 *
 * One component, three variants. Entry rows on Today, result rows in
 * Search, ingredient rows on Recipe detail are structurally identical:
 * name left, figure right, subtext under, hairline below. Building them
 * once is what keeps density consistent across both flows.
 *
 * The row used to be a single <button>. It stopped being one when the
 * composition tag became tappable: a button cannot contain a button,
 * and the two actions here are genuinely different questions — "change
 * this portion" and "what is this made of". So the name-and-figure line
 * is the button, and the subtext line beneath it carries the tag as a
 * control of its own.
 *
 * The tag is not blue. Blue means touchable in this system, but the
 * converse was never true — the row itself, the portion chips and the
 * sheet grabber are all touchable and none of them are blue. A dotted
 * underline marks it as something that opens without pulling the eye
 * to it, which is the whole point of a tag that most people will never
 * tap.
 *
 * meta and note share one subtext line. They are different kinds of
 * fact — how much of it there was, and what it is made of — but both
 * are secondary to the name, and giving each its own line would double
 * the height of every row to say so.
 *
 * The name wraps to two lines; the figure never shrinks.
 */

import { useState } from 'react';

export function Row({
  variant = 'entry',   // 'entry' | 'result' | 'ingredient'
  name,
  meta,                // portion, brand or source
  note,                // a short description of the food itself
  noteDetail,          // what the note is derived from, revealed on tap
  figure,
  unit = '',
  onSelect,
}) {
  const [open, setOpen] = useState(false);

  const interactive = variant !== 'ingredient';
  const Main = interactive ? 'button' : 'div';
  const disclosable = !!(note && noteDetail);

  return (
    <div className={`row row--${variant}`}>
      <Main
        className="row__main"
        type={interactive ? 'button' : undefined}
        onClick={interactive ? onSelect : undefined}
      >
        <span className="row__name">{name}</span>

        {figure != null && (
          <span className="row__figure">
            {figure}{unit && <span className="figure__unit">{unit}</span>}
          </span>
        )}
      </Main>

      {(meta || note) && variant !== 'ingredient' && (
        <div className="row__meta">
          {meta}
          {meta && note && <span className="row__meta-sep" aria-hidden="true">·</span>}

          {note && (disclosable ? (
            <button
              className="row__note row__note--more"
              type="button"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {note}
            </button>
          ) : (
            <span className="row__note">{note}</span>
          ))}
        </div>
      )}

      {disclosable && open && <div className="row__detail">{noteDetail}</div>}
    </div>
  );
}
