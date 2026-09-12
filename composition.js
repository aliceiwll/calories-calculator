/**
 * describeComposition — one plain phrase for what an entry is mostly
 * made of, or null when there is nothing worth saying.
 *
 * Derived, never authored. A hand-written tag per food is a place for
 * an opinion to hide: whoever fills the field decides which foods are
 * worth remarking on, and that decision is invisible in the data. A
 * rule is arguable in public — you can read these thresholds and
 * disagree with them.
 *
 * The thresholds are deliberately not symmetric. Protein rarely
 * dominates a mixed dish by energy, so a third of it is already the
 * notable thing about that food. Carbohydrate dominates most ordinary
 * meals, so it takes more of it to be worth remarking on.
 *
 * The carbohydrate threshold was 0.75 and the floor was 120 kcal, which
 * described three rows out of seven and left the record looking
 * patchy — a tag on some things and not others reads as a judgment
 * about which foods deserve comment. At 0.60 and 50 kcal most of a
 * normal day carries a description, and the rows that stay bare are
 * bare for a reason you can state: they are too small to matter, or
 * genuinely mixed.
 *
 * Below MIN_KCAL nothing is described at all. A 45 kcal side is
 * mostly-anything and it does not matter which; tagging it spends a
 * line of the record on noise and makes the tags that do matter harder
 * to notice.
 *
 * The phrases describe, they do not rank. There is no threshold that
 * produces praise or warning, no phrase that is better to see than
 * another, and nothing here reaches the colour tokens — the tag is set
 * in the same quiet type as the portion beside it.
 */

const KCAL_PER_G = { protein: 4, carbs: 4, fat: 9 };

const MIN_KCAL = 50;

const RULES = [
  { macro: 'protein', share: 0.35, phrase: 'high protein' },
  { macro: 'fat',     share: 0.55, phrase: 'mostly fat' },
  { macro: 'carbs',   share: 0.60, phrase: 'mostly carbs' },
];

export function describeComposition(entry) {
  const macros = entry?.macros;
  if (!macros || entry.kcal < MIN_KCAL) return null;

  const energy = {};
  let total = 0;
  for (const macro of Object.keys(KCAL_PER_G)) {
    energy[macro] = (macros[macro] ?? 0) * KCAL_PER_G[macro];
    total += energy[macro];
  }
  if (!total) return null;

  /* Shares come from the macros' own energy rather than entry.kcal:
     the two rarely agree exactly, and dividing by the larger of them
     would quietly move every threshold. */
  const rule = RULES.find((r) => energy[r.macro] / total >= r.share);
  return rule ? rule.phrase : null;
}


/* The numbers behind the phrase, for the disclosure under the tag.
   Shares are shares of energy, which is the thing the tag is derived
   from — grams alone would make fat look like the smallest part of
   almost everything.

   Fibre is listed with a weight and no share. It is already counted
   inside the carbohydrate figure, so giving it a percentage would make
   the four rows add up to more than the whole and invite the reader to
   do arithmetic that does not work. */
export function breakdown(entry) {
  const macros = entry?.macros;
  if (!macros) return null;

  let total = 0;
  for (const macro of Object.keys(KCAL_PER_G)) {
    total += (macros[macro] ?? 0) * KCAL_PER_G[macro];
  }
  if (!total) return null;

  const rows = [
    { label: 'Protein', grams: macros.protein ?? 0, share: ((macros.protein ?? 0) * KCAL_PER_G.protein) / total },
    { label: 'Carbs',   grams: macros.carbs ?? 0,   share: ((macros.carbs ?? 0) * KCAL_PER_G.carbs) / total },
    { label: 'Fat',     grams: macros.fat ?? 0,     share: ((macros.fat ?? 0) * KCAL_PER_G.fat) / total },
  ];

  if (macros.fibre != null) rows.push({ label: 'Fibre', grams: macros.fibre, share: null });

  return rows;
}
