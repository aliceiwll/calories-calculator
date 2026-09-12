/**
 * benefits.js — what a meal contains, in a fixed vocabulary.
 *
 * These describe composition. They are not scores, not grades, and not
 * claims about what the food will do to anyone. "Good source of fibre"
 * says there is fibre in it; it does not say the meal is good, and
 * there is deliberately no phrase in this vocabulary for the opposite —
 * nothing here can mark a food as poor, and no recipe is left with a
 * label that reads as a warning.
 *
 * The thresholds follow the pattern EU nutrition labelling already
 * uses: roughly 15% of a reference intake to be a "source of"
 * something, 30% to be "rich in" it. Borrowing an existing, published
 * basis matters — a threshold invented in-house is an opinion about
 * food wearing a number's clothes.
 *
 * Protein and fibre follow the same logic against energy and portion.
 * Omega-3 is stated as a source of EPA and DHA, which is what the fish
 * contains; it says nothing about hearts, brains or inflammation,
 * because this app is in no position to.
 */

const NRV = { iron: 14, vitC: 80 };   /* mg, EU reference intakes */

const RULES = [
  {
    key: 'omega3',
    phrase: 'Omega-3 source',
    /* EPA + DHA in grams. 0.5 g is a serving that meaningfully
       contributes to the 250 mg/day commonly cited for adults. */
    value: (r) => r.nutrients?.omega3 ?? 0,
    threshold: 0.5,
  },
  {
    key: 'protein',
    phrase: 'Higher in protein',
    /* Share of the meal's energy, not grams: 20% is the EU line for
       "high protein". A large meal should not qualify just for being
       large. */
    value: (r) => {
      const m = r.macros ?? {};
      const energy = (m.protein ?? 0) * 4 + (m.carbs ?? 0) * 4 + (m.fat ?? 0) * 9;
      return energy ? ((m.protein ?? 0) * 4) / energy : 0;
    },
    threshold: 0.2,
  },
  {
    key: 'fibre',
    phrase: 'Good source of fibre',
    value: (r) => r.macros?.fibre ?? 0,
    threshold: 6,
  },
  {
    key: 'vitC',
    phrase: 'Rich in vitamin C',
    value: (r) => r.nutrients?.vitC ?? 0,
    threshold: NRV.vitC * 0.3,
  },
  {
    key: 'iron',
    phrase: 'Source of iron',
    value: (r) => r.nutrients?.iron ?? 0,
    threshold: NRV.iron * 0.15,
  },
];

/* Ordered by how far past its threshold each one is, so the benefit a
   recipe leads with is the one that is actually most true of it rather
   than whichever rule happens to sit first in the list. Cards no longer
   carry one — they show the recipe's own label — so this is read only
   by the detail screen, where there is room for all of them. */
export function benefitsFor(recipe) {
  return RULES
    .map((rule) => ({ phrase: rule.phrase, key: rule.key, ratio: rule.value(recipe) / rule.threshold }))
    .filter((b) => b.ratio >= 1)
    .sort((a, b) => b.ratio - a.ratio);
}
