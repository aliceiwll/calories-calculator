/**
 * forYou.js — recipes built from things already in the record.
 *
 * "For you" here means one specific, checkable thing: this recipe uses
 * ingredients you have written down before. Not a taste model, not a
 * profile, not an inference about who you are — a word match against
 * your own entries, which is why the section can state its reason out
 * loud ("uses chicken and rice") without sounding like it knows more
 * than it does.
 *
 * That honesty is the point. Personalisation that cannot explain itself
 * in one clause is personalisation the user has no way to disagree
 * with.
 */

/* Words that appear in food names without identifying a food. */
const NOISE = new Set([
  'with', 'and', 'the', 'of', 'a', 'in', 'no', 'half', 'large', 'small', 'medium',
  'g', 'ml', 'tbsp', 'tsp', 'tin', 'pack', 'slice', 'slices', 'bunch', 'piece', 'pieces',
  'cooked', 'boiled', 'baked', 'grilled', 'roasted', 'fresh', 'dry', 'dried',
  'thigh', 'breast', 'fillet', 'fillets', 'bowl', 'plate', 'cup',
  'oil', 'olive', 'salt', 'pepper', 'sauce', 'water', 'stock', 'seasoning',
  /* Real foods, but minor ones wherever they appear in a recipe. "Uses
     milk" is true of a mash and useless as a reason to cook it — the
     match has to be something the dish is actually made of, or the
     section is just showing that it can find words. */
  'milk', 'honey', 'cream', 'soured', 'butter', 'paste', 'lemon', 'juice',
  'herb', 'herbs', 'spice', 'spices', 'seed', 'seeds', 'sugar',
]);

/* Crude, and crude on purpose: "tomatoes" and "tomato" are the same
   ingredient to a person reading the card, and a stemmer that knew
   better would not change a single result across a list this size. */
const stem = (word) => word.replace(/(es|s)$/, '');

const words = (text) =>
  text.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/)
    .filter((w) => w.length > 2 && !NOISE.has(w))
    .map(stem);

export function forYou(entries, recipes) {
  const logged = new Set(entries.flatMap((e) => words(e.name)));
  if (!logged.size) return [];

  return recipes
    .map((recipe) => {
      const hits = [...new Set(
        recipe.ingredients.flatMap((i) => words(i.name)).filter((w) => logged.has(w)),
      )];
      return { recipe, hits };
    })
    .filter((match) => match.hits.length > 0)
    .sort((a, b) => b.hits.length - a.hits.length);
}

/* "chicken and rice" — the clause the section shows under a card. */
/* Two at most. A list of five matched words is a machine showing its
   working, not a person's reason for cooking something. */
export const reasonFor = (hits) => {
  const top = hits.slice(0, 2);
  return top.length === 1 ? top[0] : `${top[0]} and ${top[1]}`;
};
