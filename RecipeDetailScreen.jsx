/**
 * RecipeDetailScreen — something you can actually cook.
 *
 * The old screen listed ingredients and a macro table and called it a
 * recipe, which meant the one thing the user came for — how to make it
 * — was the one thing missing. Order now runs:
 *
 *   the food → the recipe → why it matters → what is in it →
 *   how to make it → add it
 *
 * Nutrition supports that order rather than leading it. The whole
 * summary is one line of four figures; the benefit labels say what the
 * meal contains, and the note explains where those come from. None of
 * it claims anything about what the food will do to anyone — this app
 * knows what is on the plate and nothing about the person eating it.
 *
 * The photograph is the screen's ground rather than a band across the
 * top of it. A band ends in a straight edge, which is the shape of a
 * thumbnail; a ground the content rides over is the shape of a page
 * about food. One asymmetric corner is where the two meet, and it is
 * the only place on the screen the interlock appears — repeated lower
 * down it stops being a transition and becomes wallpaper.
 *
 * Back and save sit together over the photograph, same size, same
 * treatment, one at each edge. The save used to sit on the title,
 * where it read as punctuation after the recipe's name; paired with
 * back it reads as what it is, one of the two things you can do to
 * this screen from outside its content.
 *
 * Servings are chosen here, next to the button, using the same
 * PortionControl the record uses for a portion of food — and changing
 * them changes the recipe, not just the label. Ingredient quantities and
 * the nutrition line both scale, because a serving control that moves
 * only the number it is attached to is a control that lies about what
 * it does. Instructions is the one tab without the stepper: a step is
 * not a quantity. The control is hidden there rather than unmounted,
 * so the count you chose on Overview is still the count you come back
 * to — one serving state for the whole screen.
 */

/* Weights round to the nearest 5, counts to the nearest half. Halving a
   recipe should not produce "1.5 eggs to 1 decimal place". */
const scaleQty = (qty, unit, factor) => {
  const value = qty * factor;
  if (unit === 'g' || unit === 'ml') return String(Math.max(5, Math.round(value / 5) * 5));
  const half = Math.round(value * 2) / 2;
  return Number.isInteger(half) ? String(half) : half.toFixed(1);
};

const ingredientLine = (item, factor) =>
  item.qty == null
    ? item.name
    : `${item.name}, ${scaleQty(item.qty, item.unit, factor)}${item.unit ? ` ${item.unit}` : ''}`;

const TABS = ['Overview', 'Ingredients', 'Instructions'];

import { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { Row } from './Row';
import { RecipePhoto } from './RecipePhoto';
import { SaveButton } from './SaveButton';
import { PortionControl } from './PortionControl';
import { Glyph, ICON } from './Glyph';
import { benefitsFor } from './benefits';

export function RecipeDetailScreen({ recipe, saved, onToggleSave, onBack, onLog }) {
  const [portion, setPortion] = useState(null);
  const [tab, setTab] = useState('Overview');
  const benefits = benefitsFor(recipe);
  const servings = portion?.count ?? 1;

  /* The ingredient list is written for the recipe's own yield, so
     everything scales from there rather than from one serving. */
  const factor = servings / recipe.servings;
  const totals = {
    kcal: Math.round(recipe.kcal * servings),
    protein: Math.round(recipe.macros.protein * servings),
    carbs: Math.round(recipe.macros.carbs * servings),
    fat: Math.round(recipe.macros.fat * servings),
  };
  const plural = servings === 1 ? '' : 's';

  /* Per-serving grams are only needed so the stepper has something to
     multiply; the recipe's own figures are already per serving. */
  const perServing = [{ label: 'serving', grams: 100 }];

  return (
    <div className="screen screen--recipe">
      <RecipePhoto src={recipe.photo} alt={recipe.title} className="recipe__photo" />

      <div className="recipe__actions">
        <button className="recipe__action" type="button" aria-label="Back" onClick={onBack}>
          <Glyph d={ICON.back} size={18} />
        </button>

        <SaveButton
          className="recipe__action"
          title={recipe.title}
          saved={saved}
          onToggle={() => onToggleSave(recipe.id)}
        />
      </div>

      <div className="screen__body screen__body--flush">
        <div className="recipe">
          <h1 className="recipe__title">{recipe.title}</h1>

          <div className="recipe__facts">
            <span className="recipe__fact">
              <Glyph d={ICON.clock} size={16} />
              {recipe.minutes} min
            </span>
            <span className="recipe__fact">
              Makes {recipe.servings}
            </span>
            <span className="label">{recipe.label}</span>
          </div>

          <div className="rtabs" role="tablist" aria-label="Recipe">
            {TABS.map((name) => (
              <button
                key={name}
                className="rtab"
                type="button"
                role="tab"
                aria-selected={name === tab}
                onClick={() => setTab(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {tab === 'Overview' && (
            <div className="recipe__section" key={tab} role="tabpanel" aria-label="Overview">
              <p className="recipe__description">{recipe.description}</p>

              {/* One line, four figures. A chart here would make calorie
                  tracking the subject of a page about cooking. */}
              <p className="nutri">
                <span className="nutri__kcal">{totals.kcal} kcal</span>
                <span className="nutri__sep" aria-hidden="true">·</span>
                {totals.protein}g protein
                <span className="nutri__sep" aria-hidden="true">·</span>
                {totals.carbs}g carbs
                <span className="nutri__sep" aria-hidden="true">·</span>
                {totals.fat}g fat
                <span className="nutri__for">{servings === 1 ? 'per serving' : `for ${servings} servings`}</span>
              </p>

              {benefits.length > 0 && (
                <div className="benefits">
                  {benefits.map((b) => <span className="benefit" key={b.key}>{b.phrase}</span>)}
                </div>
              )}

              <div className="note">
                <span className="note__label">What this meal brings</span>
                <p className="note__text">{recipe.note}</p>
              </div>
            </div>
          )}

          {tab === 'Ingredients' && (
            <div className="recipe__section" key={tab} role="tabpanel" aria-label="Ingredients">
              <SectionHeader label="Ingredients" sub={`for ${servings} serving${plural}`} note="kcal" />
              <div className="list">
                {recipe.ingredients.map((item) => (
                  <Row
                    key={item.name}
                    variant="ingredient"
                    name={ingredientLine(item, factor)}
                    figure={Math.round(item.kcal * factor)}
                  />
                ))}
              </div>
            </div>
          )}

          {tab === 'Instructions' && (
            <div className="recipe__section" key={tab} role="tabpanel" aria-label="Instructions">
              <SectionHeader label="How to make it" sub={`${recipe.steps.length} steps`} />
              <ol className="steps">
                {recipe.steps.map((step, i) => (
                  <li className="steps__item" key={i}>
                    <span className="steps__n" aria-hidden="true">{i + 1}</span>
                    <span className="steps__text">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      <div className="screen__foot">
        {/* Hidden, not unmounted: PortionControl keeps the count in its
            own state, and a control that remounts comes back at 1. */}
        <div className="servings" hidden={tab === 'Instructions'}>
          <span className="servings__label">Add</span>
          <PortionControl
            units={perServing}
            kcalPer100={recipe.kcal}
            allowGrams={false}
            format={(n) => `${n} serving${n === 1 ? '' : 's'}`}
            onChange={setPortion}
          />
        </div>

        <button
          className="button"
          type="button"
          onClick={() => onLog(recipe, servings)}
        >
          Add {servings} serving{plural} to today
        </button>
      </div>
    </div>
  );
}
