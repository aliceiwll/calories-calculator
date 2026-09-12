/**
 * InputBar — the three entry points, as one group.
 *
 * Search stays primary and keeps the width. Barcode and photo sit
 * beside it at equal height and radius so the three read as siblings
 * rather than as a crowded field.
 *
 * Rejected alternative: collapsing both into a single "+" menu. It
 * tidies the row but hides both secondary methods behind a tap, which
 * defeats the point of surfacing them.
 */

import { SearchField } from './SearchField';
import { IconButton } from './IconButton';
import { ICON } from './Glyph';

export function InputBar({ value, onChange, onFocus, onPhoto, onBarcode }) {
  return (
    <div className="input-bar">
      <SearchField value={value} onChange={onChange} onFocus={onFocus} />
      <IconButton label="Scan barcode" path={ICON.barcode} onClick={onBarcode} />
      <IconButton label="Add by photo" path={ICON.camera} onClick={onPhoto} />
    </div>
  );
}
