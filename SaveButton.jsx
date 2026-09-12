/**
 * SaveButton — keep a recipe, or stop keeping it.
 *
 * A toggle, and it says which state it is in through aria-pressed
 * rather than by changing its label, so a screen reader is told the
 * same thing the filled bookmark tells everyone else.
 *
 * Sits over the photograph on a card. It cannot sit inside the card's
 * own button — a button may not contain a button — so every card that
 * carries one is a container with two controls in it, the same shape
 * Row settled on when the composition tag became tappable.
 */

import { Glyph, ICON } from './Glyph';

export function SaveButton({ saved, onToggle, className = 'save', title }) {
  return (
    <button
      className={className}
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Saved: ${title}` : `Save ${title}`}
      onClick={onToggle}
    >
      <Glyph d={ICON.bookmark} size={18} filled={saved} />
    </button>
  );
}
