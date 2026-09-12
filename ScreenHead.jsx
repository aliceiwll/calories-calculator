/**
 * ScreenHead — back, title, and one optional action.
 *
 * Every pushed screen needs the same three things in the same places.
 * Building it once is what stops the back arrow moving a few pixels
 * between Search and Recipe detail.
 */

import { Glyph, ICON } from './Glyph';

export function ScreenHead({ title, onBack, action }) {
  return (
    <div className="screen__nav">
      {onBack && (
        <button className="screen__back" type="button" aria-label="Back" onClick={onBack}>
          <Glyph d={ICON.back} />
        </button>
      )}
      {title && <h1 className="screen__title">{title}</h1>}
      {action}
    </div>
  );
}
