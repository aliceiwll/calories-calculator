/**
 * SavedScreen — the bookmarks, given somewhere to be read back.
 *
 * A compact list, not a wall of cards. A recipe you have already chosen
 * does not need to be sold to you again, so the row is the same shape
 * the Quick ideas list uses: a small photograph, the name, what it costs
 * in time and energy, and the bookmark that put it here. Unsaving from
 * this list removes the row from under your finger — the honest result
 * of the only action on it.
 *
 * The filter is a lens over what is already kept, built from the labels
 * the saved recipes themselves carry. It never removes a recipe from
 * the list, only from the view, and "All" is always one tap away.
 */

import { useState } from 'react';
import { QuickIdea } from './QuickIdea';
import { FilterChips } from './FilterChips';
import { RECIPES } from './data';

const ALL = 'All';

export function SavedScreen({ saved, onToggleSave, onOpen, onBrowse }) {
  const [lens, setLens] = useState(ALL);

  /* Ordered by the catalogue rather than by when it was saved: the
     order a list arrives in should not change under you. */
  const list = RECIPES.filter((r) => saved.has(r.id));
  const empty = list.length === 0;

  /* Only the labels actually present in what is kept. A filter offering
     a category with nothing behind it is a dead end. */
  const labels = [...new Set(list.map((r) => r.label).filter(Boolean))];
  const shown = lens === ALL ? list : list.filter((r) => r.label === lens);

  return (
    <div className="screen screen--warm">
      <div className="screen__head">
        <div className="recipes__head">
          <div className="recipes__heading">
            <h1 className="today__title">Saved</h1>
            <p className="recipes__lede">
              {empty ? 'Nothing here yet.' : 'Recipes you wanted to come back to.'}
            </p>
          </div>
        </div>
      </div>

      <div className="screen__body">
        {empty ? (
          <div className="empty">
            <p className="empty__voice">Save the recipes you want to come back to.</p>
            <p className="empty__text">The bookmark on any recipe keeps it here.</p>
            <button className="button empty__cta" type="button" onClick={onBrowse}>
              Browse all recipes
            </button>
          </div>
        ) : (
          <>
            {labels.length > 1 && (
              <div className="saved__filter">
                <span className="saved__filter-label">Filter</span>
                <FilterChips
                  label="Filter saved recipes"
                  options={[ALL, ...labels]}
                  value={lens}
                  onChange={setLens}
                  bleed={false}
                />
              </div>
            )}

            <div className="quicks">
              {shown.map((recipe) => (
                <QuickIdea
                  key={recipe.id}
                  recipe={recipe}
                  wide
                  onOpen={onOpen}
                  saved={saved.has(recipe.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>

            {shown.length === 0 && (
              <div className="empty">
                <p className="empty__text">Nothing saved under that.</p>
                <button className="button empty__cta" type="button" onClick={() => setLens(ALL)}>
                  Show all {list.length}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
