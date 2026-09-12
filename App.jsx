/**
 * App — the shell, and the only place navigation lives.
 *
 * Three tabs and one stack. A pushed screen (search, a recipe, the
 * photo branch) covers the tab bar rather than sitting inside it,
 * because each of them is a task with an end: you finish it and you are
 * returned, and a tab bar underneath would offer a way to abandon it
 * halfway that leaves nothing written down.
 *
 * Everything that adds food ends in the same place — one entry, on one
 * day, in the record. Search, barcode, photo and a recipe are four
 * doors into that, not four kinds of thing.
 *
 * State is deliberately flat and in memory. This is a prototype; there
 * is no persistence, and pretending otherwise would mean building the
 * part of the product that is not being reviewed.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { TabBar } from './TabBar';
import { TodayScreen } from './TodayScreen';
import { RecipesScreen } from './RecipesScreen';
import { ProfileScreen } from './ProfileScreen';
import { SavedScreen } from './SavedScreen';
import { ManifestoScreen } from './ManifestoScreen';
import { SearchScreen } from './SearchScreen';
import { RecipeDetailScreen } from './RecipeDetailScreen';
import { PhotoReviewScreen } from './PhotoReviewScreen';
import { CameraScreen } from './CameraScreen';
import { BarcodeScreen } from './BarcodeScreen';
import { HelpScreen } from './HelpScreen';
import { AddSheet } from './AddSheet';
import { CalendarSheet } from './CalendarSheet';
import { DAYS, FOODS, recipeById, mealForHour } from './data';
import { recommend } from './recommend';

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const daysBetween = (a, b) => Math.round((startOfDay(a) - startOfDay(b)) / 86400000);

let seq = 0;
const nextId = () => `n${++seq}`;

/* What the portion control was showing, kept on the entry so that
   reopening it later starts where the entry actually is rather than at
   one unit. Without this an edit sheet opened to change the meal would
   quietly rewrite the amount. */
const amountOf = (draft) => (draft?.unit
  ? { count: draft.count, unitLabel: draft.unit.label, grams: draft.grams, manual: !!draft.unit.manual }
  : undefined);

export function App({ today = new Date(), locale = 'en-GB' }) {
  const [tab, setTab] = useState('today');

  /* The manifesto is the way in, and it does not cut to the record — the
     two overlap. 'crossing' renders both: the record mounts and begins
     arriving underneath while the manifesto is still resolving on top
     of it, so the shapes carry across a screen that is already there
     rather than across nothing. Only at 'done' is the manifesto taken
     out of the tree.

     Declared with the other state so the hook order never changes. */
  const [entry, setEntry] = useState('manifesto');
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const beginEntry = () => {
    if (entry !== 'manifesto') return;
    setEntry('crossing');
    timers.current.push(setTimeout(() => setEntry('done'), 940));
  };

  /* One pushed screen at a time: { name, id }. A prototype does not
     need a stack deeper than the flows it is demonstrating. */
  const [pushed, setPushed] = useState(null);
  const [sheet, setSheet] = useState(null);

  const [viewing, setViewing] = useState(startOfDay(today));
  const [days, setDays] = useState(DAYS);
  const [query, setQuery] = useState('');
  const [dismissed, setDismissed] = useState(false);

  /* The entry written most recently, so the record can introduce it
     rather than have it appear already in place. */
  const [lastAdded, setLastAdded] = useState(null);

  /* Saved recipes, and the Recipes tab's own dismissal, both live here
     because a card and a detail screen have to agree about them. There
     is no Saved list to browse — the state is the bookmark itself. */
  const [saved, setSaved] = useState(() => new Set());
  const [contextDismissed, setContextDismissed] = useState(false);

  const toggleSave = (id) => setSaved((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const offset = daysBetween(today, viewing);
  const isToday = offset === 0;
  const entries = days[offset] ?? [];

  const suggestion = useMemo(() => recommend(days[0] ?? []), [days]);

  const addEntry = (partial) => {
    const item = {
      id: nextId(),
      meal: partial.meal ?? mealForHour(today.getHours()),
      ...partial,
    };
    setDays((d) => ({ ...d, 0: [...(d[0] ?? []), item] }));
    setLastAdded(item.id);
    setViewing(startOfDay(today));
    setPushed(null);
    setSheet(null);
    setTab('today');
    setQuery('');
  };

  const logRecipe = (recipe, servings = 1) => addEntry({
    name: recipe.title,
    portion: `${servings} serving${servings === 1 ? '' : 's'}`,
    kcal: recipe.kcal * servings,
    /* Not rounded: a serving is a nominal 400 g, and rounding the
       density here put the figure back a few kcal every time the entry
       was reopened. */
    kcalPer100: (recipe.kcal / 400) * 100,
    units: [{ label: 'serving', grams: 400 }, { label: 'half', grams: 200 }],
    amount: { count: servings, unitLabel: 'serving', grams: servings * 400, manual: false },
    macros: Object.fromEntries(
      Object.entries(recipe.macros).map(([k, v]) => [k, v * servings]),
    ),
  });

  const changeEntry = (id, draft) =>
    setDays((d) => ({
      ...d,
      [offset]: (d[offset] ?? []).map((e) =>
        e.id === id ? {
          ...e,
          /* A draft may carry only the meal — the portion sheet lets
             someone change the category without touching the amount. */
          kcal: draft.kcal ?? e.kcal,
          meal: draft.meal ?? e.meal,
          amount: amountOf(draft) ?? e.amount,
          portion: draft.unit
            ? (draft.unit.manual ? `${draft.grams} g` : `${draft.count} × ${draft.unit.label}`)
            : e.portion,
        } : e),
    }));

  const removeEntry = (id) =>
    setDays((d) => ({ ...d, [offset]: (d[offset] ?? []).filter((e) => e.id !== id) }));

  if (entry === 'manifesto') {
    return <ManifestoScreen key="manifesto" onContinue={beginEntry} />;
  }

  if (pushed?.name === 'search') {
    return (
      <SearchScreen
        initialQuery={pushed.query ?? ''}
        defaultMeal={mealForHour(today.getHours())}
        onBack={() => setPushed(null)}
        onAdd={addEntry}
      />
    );
  }

  if (pushed?.name === 'recipe') {
    return (
      <RecipeDetailScreen
        recipe={recipeById(pushed.id)}
        saved={saved.has(pushed.id)}
        onToggleSave={toggleSave}
        onBack={() => setPushed(null)}
        onLog={logRecipe}
      />
    );
  }

  if (pushed?.name === 'barcode') {
    return (
      <BarcodeScreen
        product={SCANNED}
        defaultMeal={mealForHour(today.getHours())}
        onClose={() => setPushed(null)}
        onAdd={(product, draft) => addEntry({
          name: product.name,
          portion: draft.unit?.manual ? `${draft.grams} g` : `${draft.count} × ${draft.unit.label}`,
          kcal: draft.kcal,
          kcalPer100: product.kcalPer100,
          units: product.units,
          meal: draft.meal,
          amount: amountOf(draft),
          macros: product.macros,
        })}
      />
    );
  }

  if (pushed?.name === 'help') {
    return <HelpScreen onBack={() => setPushed(null)} />;
  }

  if (pushed?.name === 'camera') {
    return (
      <CameraScreen
        photo={PLATE_PHOTO}
        onClose={() => setPushed(null)}
        onAnalysed={() => setPushed({ name: 'photo' })}
      />
    );
  }

  if (pushed?.name === 'photo') {
    return (
      <PhotoReviewScreen
        photo={PLATE_PHOTO}
        detected={PLATE}
        onBack={() => setPushed(null)}
        onAdd={(items) => {
          items.forEach((item) => addEntry({
            name: item.name,
            portion: item.portion,
            kcal: item.kcal,
            kcalPer100: item.kcalPer100,
            units: item.units,
            macros: item.macros,
          }));
        }}
      />
    );
  }

  return (
    <>
      <div className="app app--entered" key="record">
      <div className="app__screen">
        {tab === 'today' && (
          <TodayScreen
            date={viewing}
            isToday={isToday}
            locale={locale}
            entries={entries}
            query={query}
            onQueryChange={setQuery}
            onSearch={() => setPushed({ name: 'search', query })}
            onPhoto={() => setPushed({ name: 'camera' })}
            onBarcode={() => setPushed({ name: 'barcode' })}
            onOpenCalendar={() => setSheet('calendar')}
            onBackToToday={() => setViewing(startOfDay(today))}
            lastAdded={lastAdded}
            onChangeEntry={changeEntry}
            onRemoveEntry={removeEntry}
            onEmptyAction={() => setSheet('add')}
            suggestion={suggestion && !dismissed ? {
              title: suggestion.recipe.title,
              question: suggestion.question,
              reason: suggestion.reason,
              meta: `${suggestion.recipe.minutes} min · ${suggestion.recipe.kcal} kcal`,
              photo: suggestion.recipe.photo,
              onOpen: () => setPushed({ name: 'recipe', id: suggestion.recipe.id }),
              onDismiss: () => setDismissed(true),
            } : null}
          />
        )}

        {tab === 'recipes' && (
          <RecipesScreen
            suggestion={suggestion}
            entries={days[0] ?? []}
            saved={saved}
            onToggleSave={toggleSave}
            contextDismissed={contextDismissed}
            onDismissContext={() => setContextDismissed(true)}
            onOpen={(id) => setPushed({ name: 'recipe', id })}
          />
        )}

        {tab === 'saved' && (
          <SavedScreen
            saved={saved}
            onToggleSave={toggleSave}
            onOpen={(id) => setPushed({ name: 'recipe', id })}
            onBrowse={() => setTab('recipes')}
          />
        )}

        {tab === 'profile' && (
          <ProfileScreen locale={locale} onHelp={() => setPushed({ name: 'help' })} />
        )}
      </div>

      <TabBar
        tab={tab}
        onTab={setTab}
        addOpen={sheet === 'add'}
        onAdd={() => setSheet(sheet === 'add' ? null : 'add')}
      />

      <AddSheet
        open={sheet === 'add'}
        onClose={() => setSheet(null)}
        onSearch={() => { setSheet(null); setPushed({ name: 'search' }); }}
        onBarcode={() => { setSheet(null); setPushed({ name: 'barcode' }); }}
        onPhoto={() => { setSheet(null); setPushed({ name: 'camera' }); }}
      />

      <CalendarSheet
        open={sheet === 'calendar'}
        onClose={() => setSheet(null)}
        selected={viewing}
        today={today}
        locale={locale}
        onSelect={(date) => setViewing(startOfDay(date))}
      />
    </div>

      {/* Still on top while it resolves, and transparent to the finger
          so the record underneath is usable the moment it appears. */}
      {entry === 'crossing' && (
        <ManifestoScreen key="manifesto" leaving onContinue={() => {}} />
      )}
    </>
  );
}

/* The plate the prototype photographs, and what it "recognises" on it.
   Fixed, because a prototype cannot look at anything — but the picture
   and the list agree with each other, which is the part that has to be
   true for the flow to be worth reviewing. */
const PLATE_PHOTO = '../assets/recipes/chicken-buckwheat-salad.jpg.jpeg';

/* What the scanner "reads". A packeted product, because that is what
   has a barcode on it — the method and the food it suits go together. */
const SCANNED = FOODS[0];

const PLATE = [
  { id: 'p1', name: 'Grilled chicken thigh', portion: '2 pieces', kcal: 260, kcalPer100: 209,
    units: [{ label: 'piece', grams: 62 }, { label: 'palm', grams: 100 }, { label: 'plate', grams: 250 }],
    macros: { protein: 38, carbs: 0, fat: 12, fibre: 0 } },
  { id: 'p2', name: 'Buckwheat, cooked', portion: 'about a cup', kcal: 180, kcalPer100: 110,
    units: [{ label: 'cup', grams: 164 }, { label: 'bowl', grams: 240 }, { label: 'plate', grams: 320 }],
    macros: { protein: 6, carbs: 34, fat: 1, fibre: 4 } },
  { id: 'p3', name: 'Cucumber and tomato salad, no dressing', portion: 'side', kcal: 45, kcalPer100: 18,
    units: [{ label: 'side', grams: 120 }, { label: 'bowl', grams: 220 }],
    macros: { protein: 1, carbs: 4, fat: 2, fibre: 2 } },
];
