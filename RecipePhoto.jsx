/**
 * RecipePhoto — the picture, and the space it holds.
 *
 * Every recipe in the prototype has a real photograph; this exists so
 * that a recipe without one still occupies the right amount of the
 * layout instead of collapsing it. The butter ground behind the image
 * is what shows while it loads and what stays if it never arrives.
 *
 * The photographs live in assets/recipes and are the project's own.
 * The recipes were written to them rather than the other way round: a
 * card headed one dish over a picture of another is worse than a card
 * with no picture at all.
 */

export function RecipePhoto({ src, alt = '', className = 'photo' }) {
  return (
    <span className={className}>
      {src && <img className="photo__img" src={src} alt={alt} loading="lazy" decoding="async" />}
    </span>
  );
}
