/**
 * SectionHeader — grouping for lists.
 *
 * Three slots, and which one a number goes in decides how loudly it
 * reads:
 *
 *   label — the group's name.
 *   sub   — a figure about the group, set beside the label in the same
 *           quiet type. Group subtotals live here.
 *   note  — a right-aligned label for the column beneath it ("kcal"),
 *           or a small action belonging to the group.
 *
 * Three registers. `label` is the group header the record uses —
 * uppercase, tracked, signal blue, small enough to be structure rather
 * than content. `display` and `minor` are for a browsing screen, where
 * the section name is the content: sentence case, ink, and large enough
 * to be the thing you read first. A list of things to cook is not a
 * list of things you ate, and the two should not be titled the same way.
 *
 * The label is set as a group header — uppercase and tracked — while
 * the subtotal beside it stays in normal case. Numbers do not take
 * uppercase, and "385 KCAL" would read as shouting a figure on a
 * screen whose whole argument is that figures are not the point.
 *
 * Subtotals were originally in `note`, which put them flush right in
 * the same column as the item figures. Two numbers in one column read
 * as one series regardless of their size, so the group total kept
 * competing with the items it was summarising. Moving it to the left,
 * attached to the group it belongs to, leaves the right column to the
 * items alone — which is the only lever left, since the muted ink is
 * already the lightest text the palette allows.
 */

export function SectionHeader({ label, sub, note, variant = 'label', separator = false }) {
  return (
    <div
      className={[
        'section-header',
        variant === 'label' ? '' : `section-header--${variant}`,
        /* The drawing rules a hairline under the results heading — the
           same "Show separator" the Figma component carries. */
        separator ? 'section-header--separator' : '',
      ].filter(Boolean).join(' ')}
    >
      <span className="section-header__label">
        <span className="section-header__name">{label}</span>
        {sub && <span className="section-header__sub">{sub}</span>}
      </span>
      {note && <span className="section-header__note">{note}</span>}
    </div>
  );
}
