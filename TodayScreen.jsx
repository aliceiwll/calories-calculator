/**
 * TodayScreen — Screen 1, the home of the product.
 *
 * The record is the screen. What you ate is the content; the number is
 * an attribute of it. That ordering decides every layout question here:
 * the list gets the space and the top of the screen, the day total gets
 * a single quiet line at the bottom.
 *
 * Four things, in this order:
 *   1. Search, pinned. The primary action stays reachable at any scroll
 *      position, because the most common intent on this screen is "add
 *      the thing I just ate", not "review what I already logged".
 *   2. The day's entries, dense, grouped by part of day.
 *   2a. One contextual recipe card, at the top of the record rather
 *      than after it — below the fold is the same as absent for the
 *      only thing on the screen that looks forward.
 *   3. The day total, as a fact.
 *
 * Why the total sits at the bottom and not the top: a figure placed
 * above the record is a headline, and a headline invites comparison to
 * something. Placed under the record it reads as a sum of the lines
 * above it — a receipt total. It is pinned rather than scrolled away
 * because it is genuinely useful, but it is set at --size-400, below
 * the display sizes, so it never becomes the thing you open the app to
 * look at.
 *
 * Deliberately absent: goal, remaining, streak, percentage, ring, any
 * over/under colouring. No token exists for any of them — see the notes
 * in tokens.css.
 *
 * Composition is described per item rather than summed for the day.
 * A day-level bar answers "what was today made of", which is a question
 * about a number; a tag under a row answers "what is this", which is a
 * question about a food, and the food is what the screen is for. It
 * also survives the honest case where only some entries carry macros —
 * a bar with half the day missing is wrong, a row with no tag is just
 * a row. CompositionBar is parked, not deleted, in case a day-level
 * summary earns its place back.
 *
 * Voice on this screen: the record and its total are stated in the past
 * tense as facts ("So far today", "Nothing written down yet today");
 * the only forward-looking line is the suggestion, and it is phrased as
 * an option with its reason attached. Nothing here tells the user what
 * to do, notes what they have not done, or congratulates them — there
 * is no "you haven't logged lunch", no streak, no "great job". The
 * absence of an entry is shown by the absence of a row.
 *
 * Grouping is by part of day (Morning / Midday / Evening / Later)
 * rather than by meal name. "Breakfast" empty at 3pm reads as a missed
 * obligation; "Morning" with nothing under it is simply not shown.
 *
 * Row gained a `note` slot for the composition tag; the phrasing rule
 * lives in composition.js. Entries are wrapped in SwipeRow, which is a
 * second route to the two actions the sheet already offers — never the
 * only route to either.
 */

import { useMemo, useState } from 'react';
import { InputBar } from './InputBar';
import { Row } from './Row';
import { SectionHeader } from './SectionHeader';
import { PortionSheet } from './PortionSheet';
import { describeComposition } from './composition';
import { CompositionDetail } from './CompositionDetail';
import { SwipeRow } from './SwipeRow';
import { SuggestionCard } from './SuggestionCard';
import { Glyph, ICON } from './Glyph';

/* The order and the words come from data.js, so the record and the
   recipes cannot disagree about what a meal is called. They were
   Morning / Midday / Evening / Later, which described the clock rather
   than the meal. An empty category is still not shown, so "Breakfast"
   never sits blank at three in the afternoon. */

const sum = (list, pick) => list.reduce((total, item) => total + (pick(item) ?? 0), 0);
const fmt = (n, locale) => Math.round(n).toLocaleString(locale);

/* Locale is a prop rather than the machine's: the date and the
   thousands separator are part of the copy, and a screen that mixes an
   English record with a locally formatted date reads as half-finished.
   Defaults to the user's own when nothing is passed. */
const dayLabel = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });

export function TodayScreen({
  date = new Date(),
  isToday = true,
  locale,
  entries,
  suggestion,          // { title, question, reason, meta, onOpen, onDismiss }
  query = '',
  onQueryChange,
  onSearch,
  onPhoto,
  onBarcode,
  onOpenCalendar,
  onBackToToday,
  onChangeEntry,
  onRemoveEntry,
  lastAdded,
  onEmptyAction,
}) {
  const [editing, setEditing] = useState(null);


  /* Which row has its actions uncovered, held here rather than in each
     row, so that opening one closes the last. */
  const [swiped, setSwiped] = useState(null);

  /* Fixed order, empty parts omitted. A part of the day with nothing in
     it is not a gap to be filled. */
  const groups = useMemo(
    () =>
      MEALS.map((meal) => ({ meal, items: entries.filter((e) => e.meal === meal) }))
        .filter((g) => g.items.length > 0),
    [entries],
  );

  const total = sum(entries, (e) => e.kcal);

  return (
    <div className="screen screen--warm">
      <div className="screen__head">
        <div className="today__head">
          <h1 className="today__title">{isToday ? 'Hello, Alisa!' : dayLabel(date, locale)}</h1>

          {/* The date is the way into the calendar. It is already the
              thing on screen that says which day you are looking at, so
              making it the control means there is one date, not a date
              and a button that also means date. */}
          <button
            className="today__date"
            type="button"
            aria-label="Choose a day"
            onClick={onOpenCalendar}
          >
            <Glyph d={ICON.calendar} size={16} />
            {/* Only on today. A past day already spells itself out in
                the title beside this, and repeating it here pushed both
                onto two lines each. */}
            {isToday && dayLabel(date, locale)}
          </button>
        </div>

        {isToday ? (
          <InputBar
            value={query}
            onChange={onQueryChange}
            onFocus={onSearch}
            onPhoto={onPhoto}
            onBarcode={onBarcode}
          />
        ) : (
          /* A past day is a record, not a workspace. Nothing is added
             to a day that has already happened, so the entry points are
             replaced by the way back to the one that has not. */
          <button className="today__back" type="button" onClick={onBackToToday}>
            Back to today
          </button>
        )}
      </div>

      <div className="screen__body">
        {suggestion && isToday && entries.length > 0 && (
          <SuggestionCard
            title={suggestion.title}
            question={suggestion.question}
            reason={suggestion.reason}
            meta={suggestion.meta}
            photo={suggestion.photo}
            onOpen={suggestion.onOpen}
            onDismiss={suggestion.onDismiss}
          />
        )}

        {entries.length === 0 ? (
          <div className="empty">
            <p className="empty__text">
              {isToday ? 'Nothing written down yet today.' : 'Nothing was written down on this day.'}
            </p>
            {isToday && (
              <button className="button empty__cta" type="button" onClick={onEmptyAction}>
                Add the first thing
              </button>
            )}
          </div>
        ) : (
          groups.map(({ meal, items }) => (
            <div className="today__group" key={meal}>
              <SectionHeader
                key={sum(items, (i) => i.kcal)}
                label={meal}
                sub={`${fmt(sum(items, (i) => i.kcal), locale)} kcal`}
              />
              <div className="list">
                {items.map((item) => (
                <SwipeRow
                  key={item.id}
                  isNew={item.id === lastAdded}
                  open={swiped === item.id}
                  onOpenChange={(next) => setSwiped(next ? item.id : null)}
                  onEdit={() => setEditing(item)}
                  onRemove={() => onRemoveEntry?.(item.id)}
                >
                  <Row
                    variant="entry"
                    name={item.name}
                    meta={item.portion}
                    note={describeComposition(item)}
                    noteDetail={<CompositionDetail entry={item} />}
                    figure={fmt(item.kcal, locale)}
                    onSelect={() => setEditing(item)}
                  />
                  </SwipeRow>
                ))}
              </div>
            </div>
          ))
        )}

      </div>

      {entries.length > 0 && (
        <div className="screen__foot today__foot">
          <div className="today__total">
            <span className="today__total-label">{isToday ? 'So far today' : 'That day'}</span>
            {/* Keyed on the figure so a change remounts it and the
                cross-fade runs. It never counts up — see below. */}
            <span className="today__total-figure" key={total}>
              {fmt(total, locale)}<span className="figure__unit">kcal</span>
            </span>
          </div>
        </div>
      )}

      <PortionSheet
        mode="edit"
        open={!!editing}
        food={editing}
        meal={editing?.meal}
        onClose={() => setEditing(null)}
        onSubmit={(draft) => { onChangeEntry?.(editing.id, draft); setEditing(null); }}
        onRemove={() => { onRemoveEntry?.(editing.id); setEditing(null); }}
      />
    </div>
  );
}
