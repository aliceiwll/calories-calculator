/**
 * RecipesScreen — one composed screen, not a stack of blocks.
 *
 * Read top to bottom it is: what this is, what kind of meal you are
 * after, one sentence about today, then the food. The two browsing
 * decisions come first and take almost no height; everything after
 * them is photography.
 *
 * Browsing is by meal category, because "what am I looking for" is the
 * question people arrive with. What a recipe is like — more filling,
 * lighter, higher in protein — is only useful once you are looking at
 * one, so it stays on the card and out of the filter row. Putting both
 * in the same row of chips was what made neither of them read clearly.
 *
 * Three sections, sized by how much they matter:
 *
 *   Based on today — a note, inset, one sentence and a thumbnail.
 *   For you        — the body of the screen. Large photographs, sideways,
 *                    each saying which of your own foods it is built from.
 *   Quick ideas    — a quieter list, but with pictures big enough to scan.
 *
 * All recipes closes it, so nothing is ever more than one screen away
 * from everything.
 *
 * Saved is a state of this screen rather than a fourth tab: it is the
 * bookmark already on every card, given somewhere to be read back.
 */

import { useMemo, useState } from 'react';
import { SearchField } from './SearchField';
import { SectionHeader } from './SectionHeader';
import { FilterChips } from './FilterChips';
import { RecipeCard } from './RecipeCard';
import { QuickIdea } from './QuickIdea';
import { ContextCard } from './ContextCard';
import { ScreenHead } from './ScreenHead';
import { Glyph, ICON } from './Glyph';
import { RECIPES, MEALS } from './data';
import { forYou, reasonFor } from './forYou';

const ALL = 'All';
const QUICK_MINUTES = 20;

export function RecipesScreen({
  suggestion,
  entries = [],
  saved,
  onToggleSave,
  onOpen,
  contextDismissed,
  onDismissContext,
}) {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const [meal, setMeal] = useState(ALL);

  const q = query.trim().toLowerCase();

  const matches = useMemo(
    () => forYou(entries, RECIPES).filter((m) => m.recipe.id !== suggestion?.recipe?.id),
    [entries, suggestion],
  );

  const quick = RECIPES.filter((r) => r.minutes <= QUICK_MINUTES);

  const filtered = RECIPES
    .filter((r) => (meal === ALL ? true : r.meals.includes(meal)))
    .filter((r) => (q ? `${r.title} ${r.label} ${r.description}`.toLowerCase().includes(q) : true));

  const narrowed = meal !== ALL || !!q;
  const showAll = () => { setQuery(''); setMeal(ALL); setSearching(false); };

  const card = (recipe, wide) => (
    <RecipeCard
      key={recipe.id}
      recipe={recipe}
      wide={wide}
      onOpen={onOpen}
      saved={saved.has(recipe.id)}
      onToggleSave={onToggleSave}
    />
  );

  return (
    <div className="screen screen--warm">
      <div className="screen__head">
        {searching ? (
          <>
            <ScreenHead title="Search recipes" onBack={() => { setSearching(false); setQuery(''); }} />
            <SearchField value={query} onChange={setQuery} placeholder="Search recipes" />
          </>
        ) : (
          <>
            <div className="recipes__head">
              <div className="recipes__heading">
                <h1 className="today__title">Recipes</h1>
                <p className="recipes__lede">Good food fits your life.</p>
              </div>

              <div className="recipes__actions">
                {/* Saved used to be a bookmark toggle here. It is a
                    destination in the bar now, so keeping a second way
                    in would leave the same list behind two doors. */}
                <button
                  className="recipes__action"
                  type="button"
                  aria-label="Search recipes"
                  onClick={() => setSearching(true)}
                >
                  <Glyph d={ICON.search} />
                </button>
              </div>
            </div>

            <FilterChips
              label="Meal"
              options={[ALL, ...MEALS]}
              value={meal}
              onChange={setMeal}
            />
          </>
        )}
      </div>

      <div className="screen__body">
        {narrowed ? (
          <>
            <SectionHeader
              variant="minor"
              label={q ? 'Results' : meal}
              sub={`${filtered.length} of ${RECIPES.length}`}
              note={<button className="section-header__action" type="button" onClick={showAll}>Show all</button>}
            />

            {filtered.length === 0 ? (
              <div className="empty">
                <p className="empty__text">Nothing here matches that.</p>
                <button className="button empty__cta" type="button" onClick={showAll}>
                  View all {RECIPES.length} recipes
                </button>
              </div>
            ) : (
              <div className="rcards">{filtered.map((r) => card(r, true))}</div>
            )}
          </>
        ) : (
          <>
            {!contextDismissed && suggestion && (
              <ContextCard
                recipe={suggestion.recipe}
                guidance={suggestion.guidance}
                onOpen={onOpen}
                onDismiss={onDismissContext}
              />
            )}

            {matches.length > 0 && (
              <section className="recipes__section">
                <SectionHeader variant="display" label="For you" />
                <p className="recipes__because">Built from things you write down often.</p>

                <div className="shelf bleed">
                  {matches.map(({ recipe, hits }) => (
                    <div className="shelf__item" key={recipe.id}>
                      {card(recipe, true)}
                      <p className="shelf__reason">uses {reasonFor(hits)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Guarded like every other section. A heading with nothing
                under it is the one failure this screen can produce on
                its own — every block here is conditional on content
                existing, and Quick ideas was the block that was not. */}
            {quick.length > 0 && (
            <section className="recipes__section">
              <SectionHeader variant="minor" label="Quick ideas" sub={`under ${QUICK_MINUTES} min`} />
              <div className="quicks">
                {quick.map((r) => (
                  <QuickIdea
                    key={r.id}
                    recipe={r}
                    onOpen={onOpen}
                    saved={saved.has(r.id)}
                    onToggleSave={onToggleSave}
                  />
                ))}
              </div>
            </section>
            )}

            <section className="recipes__section">
              {/* Says what it is: everything, counted. The sections above
                  are all a selection of one kind or another, so the one
                  that is not has to say so. */}
              <SectionHeader variant="minor" label="All recipes" sub={`all ${RECIPES.length}`} />
              <div className="rcards">{RECIPES.map((r) => card(r, true))}</div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
