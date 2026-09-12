/**
 * IconButton — compact secondary entry point.
 *
 * Only ever used inside InputBar. Icon-only is acceptable here because
 * the buttons sit adjacent to a labelled field and both glyphs (camera,
 * barcode) are established conventions; each still carries an accessible
 * label for anyone not going by sight.
 */

/* Draws through Glyph like every other icon in the product. It used to
   carry its own two hand-drawn paths — a five-bar barcode with no
   scanner framing, and a camera of its own — which is why these two
   were the last glyphs still not matching the drawing. */
import { Glyph } from './Glyph';

export function IconButton({ label, path, onClick }) {
  return (
    <button className="icon-button" type="button" onClick={onClick} aria-label={label}>
      <Glyph d={path} size={20} />
    </button>
  );
}
