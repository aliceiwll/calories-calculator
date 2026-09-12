/**
 * CompositionDetail — the numbers behind a composition tag.
 *
 * Shown only on request. The tag is the whole story for most people
 * most of the time; this is for the moment someone wants to check it,
 * and it is set quietly enough that opening one does not turn the row
 * into a panel.
 *
 * Deliberately a list and not a bar. A bar here would be the day-level
 * graphic coming back one row at a time, and at this size it would be
 * decoration — four short lines of figures answer the question faster
 * than four coloured segments do.
 */

import { breakdown } from './composition';

export function CompositionDetail({ entry }) {
  const rows = breakdown(entry);
  if (!rows) return null;

  return (
    <dl className="detail">
      {rows.map((row) => (
        <div className="detail__row" key={row.label}>
          <dt className="detail__label">{row.label}</dt>
          <dd className="detail__value">
            <span className="detail__grams">{row.grams} g</span>
            {/* Always rendered, even for fibre, which has no share. An
                omitted cell lets the weight slide into the percentage
                column and the figures stop lining up. */}
            <span className="detail__share">
              {row.share == null ? '' : `${Math.round(row.share * 100)}%`}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
