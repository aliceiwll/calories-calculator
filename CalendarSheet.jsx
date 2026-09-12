/**
 * CalendarSheet — pick a day to look back at.
 *
 * A way to reach a past record, and nothing else. The grid carries no
 * dots, no totals and no marks for days with entries: a column of dots
 * across a month is a streak whatever it is called, and this app does
 * not tell anyone how consistent they have been. Days you did not write
 * anything down look exactly like days you did, because that is not
 * information this screen is willing to rank.
 *
 * Future days are disabled rather than hidden — the month is a real
 * month, and a calendar that ends on today reads as a countdown.
 */

import { useState } from 'react';
import { Sheet } from './Sheet';
import { Glyph, ICON } from './Glyph';

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a, b) => startOfDay(a).getTime() === startOfDay(b).getTime();

export function CalendarSheet({ open, onClose, selected, today, locale, onSelect }) {
  const [month, setMonth] = useState(new Date(selected.getFullYear(), selected.getMonth(), 1));

  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  /* Monday-first, which is what the rest of the copy assumes. */
  const lead = (first.getDay() + 6) % 7;

  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 1 + i).toLocaleDateString(locale, { weekday: 'narrow' }));

  const canGoForward = month.getFullYear() < today.getFullYear()
    || (month.getFullYear() === today.getFullYear() && month.getMonth() < today.getMonth());

  return (
    <Sheet open={open} onClose={onClose} title="Look back">
      <div className="cal__head">
        <button
          className="cal__step"
          type="button"
          aria-label="Previous month"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
        >
          <Glyph d={ICON.back} />
        </button>

        <span className="cal__month">
          {month.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
        </span>

        <button
          className="cal__step"
          type="button"
          aria-label="Next month"
          disabled={!canGoForward}
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
        >
          <span className="cal__forward"><Glyph d={ICON.back} /></span>
        </button>
      </div>

      <div className="cal__grid" role="grid">
        {weekdays.map((w, i) => (
          <span className="cal__weekday" key={i}>{w}</span>
        ))}

        {Array.from({ length: lead }, (_, i) => <span key={`lead-${i}`} />)}

        {Array.from({ length: days }, (_, i) => {
          const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
          const future = startOfDay(date) > startOfDay(today);
          return (
            <button
              key={i}
              className="cal__day"
              type="button"
              disabled={future}
              aria-current={sameDay(date, today) ? 'date' : undefined}
              aria-pressed={sameDay(date, selected)}
              onClick={() => { onSelect(date); onClose(); }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </Sheet>
  );
}
