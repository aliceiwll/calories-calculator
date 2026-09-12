/**
 * recommend.js — which recipe to offer, and the reason for offering it.
 *
 * One rule, used by both Today and the Recipes tab, so the two never
 * disagree about what today has looked like. It is derived from the
 * record and nothing else: no time of day, no history, no goal, because
 * none of those are things the user has told this app.
 *
 * Every branch returns a reason, and a reason is a past-tense statement
 * of something already written down. There is deliberately no branch
 * that produces encouragement, and no field a "you should" could go in.
 * A recommendation with nothing true to say returns null and the card
 * does not appear.
 */

import { RECIPES } from './data';

const KCAL = { protein: 4, carbs: 4, fat: 9 };

/* A day's worth of food, roughly, for a person this app knows nothing
   about. Used only to decide whether "light so far" is a fair thing to
   say — never shown, never compared against, never a target. */
const ORDINARY_DAY = 2000;

export function recommend(entries) {
  if (!entries?.length) return null;

  const kcal = entries.reduce((t, e) => t + e.kcal, 0);
  const macros = entries.reduce(
    (t, e) => ({
      protein: t.protein + (e.macros?.protein ?? 0),
      carbs: t.carbs + (e.macros?.carbs ?? 0),
      fat: t.fat + (e.macros?.fat ?? 0),
    }),
    { protein: 0, carbs: 0, fat: 0 },
  );

  const energy = macros.protein * KCAL.protein + macros.carbs * KCAL.carbs + macros.fat * KCAL.fat;
  const proteinShare = energy ? (macros.protein * KCAL.protein) / energy : 0;

  let label;
  let question;
  let reason;
  let guidance;

  if (kcal < ORDINARY_DAY * 0.45) {
    label = 'More filling';
    question = 'Feeling like something more filling?';
    reason = 'Today has been light so far';
    guidance = 'A little more filling could balance today.';
  } else if (proteinShare < 0.2) {
    label = 'Higher in protein';
    question = 'Something with more protein in it?';
    reason = 'Today has been mostly carbohydrate so far';
    guidance = 'Something with more protein could round today out.';
  } else if (kcal > ORDINARY_DAY * 0.8) {
    label = 'Light option';
    question = 'Something lighter to finish on?';
    reason = 'Most of an ordinary day is already written down';
    guidance = 'Something lighter would sit well with the rest of today.';
  } else {
    return null;
  }

  const pick = RECIPES.find((r) => r.label === label);
  if (!pick) return null;

  /* `guidance` is the same judgement said as one sentence, for the
     Recipes tab; `question` + `reason` is the two-part form Today uses.
     Same rule, same day, two registers — never two conclusions. */
  return { recipe: pick, label, question, reason, guidance };
}
