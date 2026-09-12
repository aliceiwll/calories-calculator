/**
 * QuickIdea — a recipe when the question is "what, quickly".
 *
 * A row, not a card, so the section stays quieter than For you — but a
 * row with a picture big enough to be worth looking at. At thumbnail
 * size the photographs were decoration; at this size they are the
 * reason to scan the list.
 *
 * Time and nothing else. What makes one of these quick is the only
 * number that belongs here.
 */

import { RecipePhoto } from './RecipePhoto';
import { SaveButton } from './SaveButton';

export function QuickIdea({ recipe, onOpen, saved, onToggleSave, wide = false }) {
  return (
    <div className={wide ? 'quick quick--wide' : 'quick'}>
      <button className="quick__open" type="button" onClick={() => onOpen(recipe.id)}>
        <RecipePhoto src={recipe.photo} alt={recipe.title} className="quick__photo" />

        <span className="quick__body">
          <span className="quick__title">{recipe.title}</span>
          {/* On the saved list the label earns its place: it is what the
              filter above the list sorts by. */}
          <span className="quick__meta">
            {recipe.minutes} min{wide && recipe.label ? ` · ${recipe.label}` : ''}
          </span>
        </span>
      </button>

      <SaveButton
        className="quick__save"
        title={recipe.title}
        saved={saved}
        onToggle={() => onToggleSave(recipe.id)}
      />
    </div>
  );
}
