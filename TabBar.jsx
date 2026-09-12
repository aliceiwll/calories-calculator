/**
 * TabBar — the three places, and the one action.
 *
 * Today, Recipes and Profile are places you can be; adding food is not
 * a place, so it is not a tab. It is a raised disc sitting in the same
 * row because that is where a thumb already is, and because every one
 * of the three input methods behind it ends in the same record.
 *
 * There is no Search tab. Search is how you use Today, not somewhere
 * you go — it is already the widest control on that screen, and giving
 * it a second home would split one action across two places.
 */

import { Glyph, ICON } from './Glyph';

const TABS = [
  { id: 'today', label: 'Today', icon: ICON.today },
  { id: 'recipes', label: 'Recipes', icon: ICON.recipes },
  { id: 'saved', label: 'Saved', icon: ICON.bookmark },
  { id: 'profile', label: 'Profile', icon: ICON.profile },
];

export function TabBar({ tab, onTab, onAdd, addOpen = false }) {
  /* Two destinations, the action, then two more: the disc sits in
     the middle of the bar rather than at the head of it. */
  const [first, second, ...rest] = TABS;

  const button = (t) => (
    <button
      key={t.id}
      className="tab"
      type="button"
      aria-current={tab === t.id ? 'page' : undefined}
      onClick={() => onTab(t.id)}
    >
      <Glyph d={t.icon} />
      <span className="tab__label">{t.label}</span>
    </button>
  );

  return (
    <nav className="tabbar" aria-label="Main">
      {button(first)}
      {button(second)}

      {/* The disc cannot stretch to a fifth of the bar without becoming
          an oval, so it sits in a slot that can. */}
      <span className="tabbar__slot">
        {/* One glyph, turned: a plus rotated an eighth of a turn is a
            cross, so opening the sheet does not swap the icon for a
            different one, it turns the one that is already there. */}
        <button
          className={addOpen ? 'tabbar__add tabbar__add--open' : 'tabbar__add'}
          type="button"
          onClick={onAdd}
          aria-expanded={addOpen}
          aria-label={addOpen ? 'Close' : 'Add to today'}
        >
          <Glyph d={ICON.plus} size={24} />
        </button>
      </span>

      {rest.map(button)}
    </nav>
  );
}
