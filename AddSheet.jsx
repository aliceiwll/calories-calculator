/**
 * AddSheet — the three ways in, from the "+".
 *
 * Search stays primary and keeps the full-width button; barcode and
 * photo sit under it as rows. This is the same ranking InputBar makes
 * on Today, and it is made the same way twice on purpose — a user who
 * learns the shape of one has learned the other.
 *
 * Each secondary method says what it is for. "Scan barcode" is obvious
 * once you have used it and opaque before that, and the difference
 * between the two is one line of text.
 */

import { Sheet } from './Sheet';
import { Glyph, ICON } from './Glyph';

export function AddSheet({ open, onClose, onSearch, onBarcode, onPhoto }) {
  const option = (icon, label, hint, onClick) => (
    <button className="option" type="button" onClick={onClick}>
      <span className="option__glyph"><Glyph d={icon} /></span>
      <span className="option__body">
        <span className="option__label">{label}</span>
        <span className="option__hint">{hint}</span>
      </span>
    </button>
  );

  return (
    <Sheet open={open} onClose={onClose} title="Add to today" meta="How do you want to find it?">
      <button className="button" type="button" onClick={onSearch}>Search food</button>

      <div className="option-list">
        {option(ICON.barcode, 'Scan barcode', 'for anything with a label', onBarcode)}
        {option(ICON.camera, 'Analyse a photo', 'for a plate you did not make', onPhoto)}
      </div>
    </Sheet>
  );
}
