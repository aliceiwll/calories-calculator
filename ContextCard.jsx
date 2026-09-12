/**
 * ContextCard — "based on today", on the Recipes tab.
 *
 * The same rule that speaks on Today, in a different register. Today
 * asks a question about one dish; this states what would go with the
 * day, in one tight sentence, and shows the dish it means.
 *
 * Deliberately small. It is the third thing on the screen and the least
 * of the three — a recommendation earns a sentence, not a banner, and
 * the photography below it is what the screen is for. It is inset from
 * the right so it reads as a note against the column rather than a
 * block spanning it.
 *
 * Butter rather than ink. Today's card is the dark one, and repeating
 * that treatment here was what made the two screens read as one
 * announcement shown twice.
 */

import { RecipePhoto } from './RecipePhoto';
import { Glyph, ICON } from './Glyph';

export function ContextCard({ recipe, guidance, onOpen, onDismiss }) {
  if (!recipe || !guidance) return null;

  return (
    <div className="context">
      {/* The drawing nests the label inside the text column, so the
          photograph is a sibling of that whole column and takes the
          card's full height beside it. Lifting the label out into a row
          of its own — which is what this used to do — caps the picture
          at whatever height is left, and the card reads short. */}
      <button className="context__open" type="button" onClick={() => onOpen(recipe.id)}>
        <span className="context__copy">
          <span className="context__label">Based on today</span>

          <span className="context__body">
            <span className="context__guidance">{guidance}</span>
            <span className="context__arrow" aria-hidden="true">
              <Glyph d={ICON.forward} size={20} />
            </span>
          </span>
        </span>

        <RecipePhoto src={recipe.photo} alt={recipe.title} className="context__photo" />
      </button>

      {onDismiss && (
        <button className="context__dismiss" type="button" aria-label="Dismiss suggestion" onClick={onDismiss}>
          <Glyph d={ICON.close} size={16} />
        </button>
      )}
    </div>
  );
}
