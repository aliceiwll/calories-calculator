/**
 * BarcodeScreen — the scanner, and only the scanner.
 *
 * Barcode used to open the food search with a query typed into it,
 * which meant two of the three ways in were the same screen wearing
 * different labels. They are separate methods for separate situations —
 * a packet has a code, a plate does not — and collapsing one into
 * another taught the wrong thing about both.
 *
 * No camera API, and no route from here into the photo flow. Closing
 * returns where you came from with nothing written down.
 *
 * The read is simulated on a timer. What matters for review is the
 * shape of the thing: aim, read, confirm the portion, add.
 */

import { useEffect, useState } from 'react';
import { PortionSheet } from './PortionSheet';
import { Glyph, ICON } from './Glyph';

const READ_MS = 1900;

export function BarcodeScreen({ product, defaultMeal, onClose, onAdd }) {
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (found) return undefined;
    const t = setTimeout(() => setFound(true), READ_MS);
    return () => clearTimeout(t);
  }, [found]);

  return (
    <div className="camera">
      <div className="camera__view camera__view--scan">
        <div className="scan__window" aria-hidden="true">
          <span className="scan__line" />
        </div>

        <button className="camera__close" type="button" aria-label="Close scanner" onClick={onClose}>
          <Glyph d={ICON.close} />
        </button>

        <p className="camera__hint" role="status">
          {found ? `Found ${product.name}` : 'Line the barcode up inside the frame.'}
        </p>
      </div>

      <div className="camera__bar">
        <span className="camera__spacer" aria-hidden="true" />
        <span className="scan__code" aria-hidden="true"><Glyph d={ICON.barcode} size={24} /></span>
        <span className="camera__spacer" aria-hidden="true" />
      </div>

      <PortionSheet
        mode="add"
        open={found}
        food={product}
        meal={defaultMeal}
        onClose={onClose}
        onSubmit={(draft) => onAdd(product, draft)}
      />
    </div>
  );
}
