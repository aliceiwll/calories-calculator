/**
 * SearchField — the primary action of the product.
 *
 * Photo and barcode used to live inside this field. They were moved out
 * to InputBar: three targets in one 44px trailing zone is a mis-tap
 * generator, and burying alternative input inside the search control
 * made it look subordinate to search rather than parallel to it.
 *
 * The field now owns one trailing action — clear — which appears only
 * when there is something to clear.
 */

const Glyph = ({ d }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SEARCH = 'M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12ZM17 17l-3.8-3.8';
const CLEAR = 'M6 6l8 8M14 6l-8 8';

export function SearchField({
  value,
  onChange,
  onFocus,
  loading = false,
  placeholder = 'Search food or dish',
}) {
  const filled = value.length > 0;

  return (
    <div className="search">
      <span className="search__glyph"><Glyph d={SEARCH} /></span>

      <input
        className="search__input"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        autoComplete="off"
      />

      {loading && <span className="search__status">searching</span>}

      {filled && (
        <button className="search__action" type="button" onClick={() => onChange('')} aria-label="Clear search">
          <Glyph d={CLEAR} />
        </button>
      )}
    </div>
  );
}
