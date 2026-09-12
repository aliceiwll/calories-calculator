/**
 * RecipeCard — a recipe in the collection.
 *
 * Photograph, name, and one label. The time sits on the picture as a
 * pill, where it is legible without spending a line; the calories have
 * gone. A grid of kcal figures made a page about cooking look like the
 * record it is supposed to be a break from — the number is on the
 * detail screen, where someone who wants it is already looking.
 *
 * The bookmark is off the photograph and down in the label row. Over
 * the image it was a piece of interface sitting on top of the one thing
 * on this screen that is not interface.
 */

import { RecipePhoto } from './RecipePhoto';
import { SaveButton } from './SaveButton';

export function RecipeCard({ recipe, onOpen, saved, onToggleSave, wide = false }) {
  return (
    <div className={wide ? 'rcard rcard--wide' : 'rcard'}>
      <button className="rcard__open" type="button" onClick={() => onOpen(recipe.id)}>
        <span className="rcard__photo">
          <RecipePhoto src={recipe.photo} alt={recipe.title} className="rcard__img" />
          <span className="rcard__time">{recipe.minutes} min</span>
        </span>

        <span className="rcard__body">
          <span className="rcard__title">{recipe.title}</span>
          <span className="label">{recipe.label}</span>
        </span>
      </button>

      <SaveButton
        className="rcard__save"
        title={recipe.title}
        saved={saved}
        onToggle={() => onToggleSave(recipe.id)}
      />
    </div>
  );
}
