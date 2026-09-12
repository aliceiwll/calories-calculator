/**
 * SuggestionCard — one recipe, offered with its reason.
 *
 * Shared by Today and the Recipes tab so the two cannot disagree about
 * what today has looked like. The reason is required: the card renders
 * nothing without one, because an unexplained suggestion is
 * indistinguishable from an ad.
 *
 * Dismissable, and dismissing means gone. A suggestion that reappears
 * after being refused is not a suggestion.
 *
 * Not a button — it holds two, and a button cannot contain a button.
 */

import { Glyph, ICON } from './Glyph';
import { RecipePhoto } from './RecipePhoto';

export function SuggestionCard({ title, question, reason, meta, photo, action = 'View recipe', onOpen, onDismiss }) {
  if (!reason) return null;

  return (
    <div className="suggestion">
      <div className="suggestion__head">
        <h2 className="suggestion__title">{title}</h2>
        {onDismiss && (
          <button className="suggestion__dismiss" type="button" aria-label="Dismiss suggestion" onClick={onDismiss}>
            <Glyph d={ICON.close} size={16} />
          </button>
        )}
      </div>

      {/* Picture beside the line, not above it: the card is one
          sentence with the dish next to it. */}
      <div className="suggestion__body">
        {photo && <RecipePhoto src={photo} alt={title} className="suggestion__photo" />}
        <div className="suggestion__copy">
          <p className="suggestion__reason">{question} {reason}.</p>
          {meta && <span className="suggestion__meta">{meta}</span>}
        </div>
      </div>

      <button className="suggestion__action" type="button" onClick={onOpen}>{action}</button>
    </div>
  );
}
