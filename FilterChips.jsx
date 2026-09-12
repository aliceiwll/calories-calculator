/**
 * FilterChips — a lens over the list, not a gate on it.
 *
 * Runs to the screen edges by default, because that is where a browsing
 * row belongs; inside a sheet it does not, so the bleed is opt-out.
 *
 * "All" is always present and always reachable in one tap, and the list
 * under these never becomes something the user cannot get back out of.
 * Personalisation here narrows what is shown first; it never decides
 * what exists.
 */

export function FilterChips({ options, value, onChange, label, bleed = true }) {
  return (
    <div className={bleed ? 'chips bleed' : 'chips'} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          className="chip"
          type="button"
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
