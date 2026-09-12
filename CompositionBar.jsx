/**
 * CompositionBar — what the day was made of.
 *
 * Length is composition, never progress: there is no track, no maximum
 * and no fill percentage, so the bar cannot be full or short of full.
 * It answers "what was this made of", which is an observation, where a
 * progress bar answers "how much of your allowance is left", which is a
 * score. The tokens (--bar-a/b/c, --bar-height, --bar-cap) exist for
 * exactly this and admit only three neutral colours — no green, no red.
 *
 * Segments carry their own legend. A bar whose colours have to be
 * decoded from memory is decoration; a bar with its figures printed
 * underneath is a second reading of the same fact.
 */

export function CompositionBar({ segments }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (!total) return null;

  return (
    <div className="bar-group">
      <div className="bar" role="img" aria-label={segments.map((s) => `${s.label} ${s.value} ${s.unit}`).join(', ')}>
        {segments.map((s) => (
          <span
            key={s.label}
            className="bar__segment"
            style={{ flex: s.value, background: `var(${s.token})` }}
          />
        ))}
      </div>

      <div className="bar__legend" aria-hidden="true">
        {segments.map((s) => (
          <span className="bar__key" key={s.label}>
            <span className="bar__swatch" style={{ background: `var(${s.token})` }} />
            {s.label}
            <span className="bar__value">{s.value} {s.unit}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
