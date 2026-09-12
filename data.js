/**
 * data.js — the prototype's mock content.
 *
 * One place for it, so screens stay about layout and behaviour. Values
 * are plausible rather than sourced; this is a prototype and nothing
 * here should be mistaken for a food database.
 */

const entry = (id, meal, name, portion, kcal, kcalPer100, units, macros) => ({
  id, meal, name, portion, kcal, kcalPer100, units, macros,
});

/* Three days, so the calendar has something to look back at. Older days
   are shorter and less tidy than today's, because real records are. */
export const DAYS = {
  0: [
    entry('a1', 'Breakfast', 'Porridge with milk and honey', '1 bowl', 340, 116,
      [{ label: 'bowl', grams: 293 }, { label: 'cup', grams: 200 }, { label: 'plate', grams: 350 }],
      { protein: 12, carbs: 58, fat: 7, fibre: 6 }),
    entry('a2', 'Breakfast', 'Coffee with milk', '200 ml', 45, 22,
      [{ label: 'cup', grams: 200 }, { label: 'mug', grams: 330 }],
      { protein: 2, carbs: 4, fat: 2, fibre: 0 }),
    entry('a3', 'Lunch', 'Grilled chicken thigh', '2 pieces', 260, 209,
      [{ label: 'piece', grams: 62 }, { label: 'palm', grams: 100 }, { label: 'plate', grams: 250 }],
      { protein: 38, carbs: 0, fat: 12, fibre: 0 }),
    entry('a4', 'Lunch', 'Rice, boiled', 'about a cup', 205, 130,
      [{ label: 'cup', grams: 158 }, { label: 'bowl', grams: 240 }, { label: 'plate', grams: 320 }],
      { protein: 4, carbs: 45, fat: 1, fibre: 1 }),
    entry('a5', 'Lunch', 'Cucumber and tomato salad, no dressing', 'side', 45, 18,
      [{ label: 'side', grams: 120 }, { label: 'bowl', grams: 220 }],
      { protein: 1, carbs: 4, fat: 2, fibre: 2 }),
  ],
  1: [
    entry('b1', 'Breakfast', 'Toast with butter', '2 slices', 220, 310,
      [{ label: 'slice', grams: 35 }, { label: 'plate', grams: 120 }],
      { protein: 6, carbs: 28, fat: 10, fibre: 3 }),
    entry('b2', 'Lunch', 'Lentil soup', '1 bowl', 290, 92,
      [{ label: 'bowl', grams: 315 }, { label: 'cup', grams: 240 }],
      { protein: 18, carbs: 40, fat: 5, fibre: 9 }),
    entry('b3', 'Dinner', 'Baked salmon', '1 fillet', 380, 208,
      [{ label: 'fillet', grams: 183 }, { label: 'plate', grams: 250 }],
      { protein: 40, carbs: 0, fat: 24, fibre: 0 }),
    entry('b4', 'Dinner', 'Boiled potatoes', '4 small', 180, 87,
      [{ label: 'small', grams: 52 }, { label: 'plate', grams: 250 }],
      { protein: 4, carbs: 40, fat: 0, fibre: 4 }),
    entry('b5', 'Snack', 'Dark chocolate', '2 squares', 110, 546,
      [{ label: 'square', grams: 10 }, { label: 'bar', grams: 100 }],
      { protein: 1, carbs: 9, fat: 8, fibre: 2 }),
  ],
  2: [
    entry('c1', 'Lunch', 'Cheese sandwich', '1', 410, 268,
      [{ label: 'sandwich', grams: 153 }, { label: 'half', grams: 76 }],
      { protein: 18, carbs: 42, fat: 18, fibre: 3 }),
    entry('c2', 'Dinner', 'Vegetable stir fry with tofu', '1 plate', 470, 118,
      [{ label: 'plate', grams: 398 }, { label: 'bowl', grams: 300 }],
      { protein: 26, carbs: 40, fat: 22, fibre: 8 }),
  ],
  4: [
    entry('d1', 'Breakfast', 'Greek yoghurt with berries', '1 cup', 190, 79,
      [{ label: 'cup', grams: 240 }, { label: 'bowl', grams: 320 }],
      { protein: 20, carbs: 18, fat: 4, fibre: 3 }),
  ],
};

/* What search offers. kcalPer100 and household units are what the
   portion sheet needs; everything else the record carries along. */
export const FOODS = [
  { id: 'f1', name: 'Cottage cheese 5%, 200 g pack', brand: 'Prostokvashino', kcalPer100: 121,
    units: [{ label: 'pack', grams: 200 }, { label: 'tbsp', grams: 30 }],
    macros: { protein: 17, carbs: 3, fat: 5, fibre: 0 } },
  { id: 'f2', name: 'Cottage cheese 9%', brand: 'generic', kcalPer100: 159,
    units: [{ label: 'pack', grams: 200 }, { label: 'tbsp', grams: 30 }],
    macros: { protein: 16, carbs: 3, fat: 9, fibre: 0 } },
  { id: 'f3', name: 'Cottage cheese, low fat 0.6%', brand: 'generic', kcalPer100: 88,
    units: [{ label: 'pack', grams: 200 }, { label: 'tbsp', grams: 30 }],
    macros: { protein: 18, carbs: 2, fat: 1, fibre: 0 } },
  { id: 'f4', name: 'Chicken breast, roasted', brand: 'generic', kcalPer100: 165,
    units: [{ label: 'palm', grams: 100 }, { label: 'fillet', grams: 174 }],
    macros: { protein: 31, carbs: 0, fat: 4, fibre: 0 } },
  { id: 'f5', name: 'Banana', brand: 'generic', kcalPer100: 89,
    units: [{ label: 'medium', grams: 118 }, { label: 'large', grams: 152 }],
    macros: { protein: 1, carbs: 23, fat: 0, fibre: 3 } },
  { id: 'f6', name: 'Oat milk, barista', brand: 'Oatly', kcalPer100: 59,
    units: [{ label: 'cup', grams: 240 }, { label: 'splash', grams: 30 }],
    macros: { protein: 1, carbs: 7, fat: 3, fibre: 1 } },
  { id: 'f7', name: 'Rye bread', brand: 'generic', kcalPer100: 259,
    units: [{ label: 'slice', grams: 32 }, { label: 'loaf', grams: 500 }],
    macros: { protein: 9, carbs: 48, fat: 3, fibre: 6 } },
  { id: 'f8', name: 'Almonds', brand: 'generic', kcalPer100: 579,
    units: [{ label: 'handful', grams: 28 }, { label: 'cup', grams: 143 }],
    macros: { protein: 21, carbs: 22, fat: 50, fibre: 13 } },
];

/* Labels are descriptions, not rankings — see the note on --label-* in
   tokens.css. "Light option" and "More filling" sit side by side in one
   appearance, and no recipe is better to see than another. */
/* The closed set the `label` field draws from. Kept as a named list
   because it is the vocabulary, not a leftover: nothing may appear on a
   card that is not one of these three, and there is deliberately no
   fourth that could read as a warning. */
export const LABELS = ['More filling', 'Light option', 'Higher in protein'];

/* The default meal for a new entry, from the clock. A guess, and the
   copy that surrounds it says so — the app knows the time and nothing
   else, so it offers a category rather than asserting one, and the
   picker beside it is how the user disagrees. */
export const mealForHour = (hour) => {
  if (hour < 11) return 'Breakfast';
  if (hour < 16) return 'Lunch';
  if (hour < 18) return 'Snack';
  return 'Dinner';
};

/* Chronological, and the only list of these four words in the codebase.
   Today groups by it and the Recipes chips browse by it, so the record
   and the recipes cannot drift into speaking different languages.

   Meal categories are how the collection is browsed: they answer "what
   am I looking for", which is the question someone opens this tab with.
   The labels above answer "what is this like", which is only useful once
   you are already looking at a recipe — so they live on the cards and
   never in the filter row. Two different questions, two different
   places, and the browsing one gets the primary control. */
export const MEALS = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

/* Every recipe is photographed, from assets/recipes. The collection is
   the dishes in those photographs — the pictures came first and the
   recipes were written to them, because a card headed one dish over a
   picture of another is worse than a card with no picture.

   Figures are per serving and reconcile: the ingredient list totals
   kcal × servings, and the macros account for the energy. `nutrients`
   is per serving too — omega3 is EPA+DHA in grams, iron and vitC in mg,
   which is what the benefit vocabulary reads. */
const recipe = (r) => r;

export const RECIPES = [
  recipe({
    id: 'r1',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    title: 'Buckwheat with mushrooms',
    photo: '../assets/recipes/buckwheat-mushrooms.jpg.jpeg',
    minutes: 30,
    kcal: 475,
    servings: 2,
    label: 'More filling',
    description: 'Buckwheat toasted in the dry pan before the water goes in, with the mushrooms browned separately so they keep their edges.',
    macros: { protein: 16, carbs: 72, fat: 14, fibre: 9 },
    nutrients: { omega3: 0.1, iron: 3.4, vitC: 4 },
    note: 'Buckwheat carries the iron and most of the fibre. Mushrooms are largely water, and add B vitamins rather than energy.',
    ingredients: [
      { name: 'Buckwheat', qty: 200, unit: 'g', kcal: 690 },
      { name: 'Mushrooms', qty: 300, unit: 'g', kcal: 66 },
      { name: 'Onion', qty: 1, kcal: 40 },
      { name: 'Butter', qty: 20, unit: 'g', kcal: 150 },
      { name: 'Parsley', kcal: 5 },
    ],
    steps: [
      'Toast the buckwheat in a dry pan for two minutes, until it smells nutty.',
      'Add twice its volume of salted water, bring to a boil, then cover and leave on the lowest heat for 15 minutes. Do not lift the lid.',
      'Meanwhile brown the mushrooms in the butter in a wide pan — in two batches if they crowd — and soften the onion with them.',
      'Fork the buckwheat through the mushrooms off the heat, and scatter the parsley.',
    ],
  }),

  recipe({
    id: 'r2',
    meals: ['Lunch', 'Dinner'],
    title: 'Beetroot soup',
    photo: '../assets/recipes/beetroot-soup.jpg.jpeg',
    minutes: 45,
    kcal: 220,
    servings: 4,
    label: 'Light option',
    description: 'Beetroot cooked down with cabbage and potato until the colour is deep. Better on the second day, with a spoonful of soured cream.',
    macros: { protein: 5, carbs: 30, fat: 8, fibre: 8 },
    nutrients: { omega3: 0.1, iron: 1.3, vitC: 30 },
    note: 'Beetroot, cabbage and potato between them account for the fibre. The cabbage and tomato are where most of the vitamin C is.',
    ingredients: [
      { name: 'Beetroot', qty: 500, unit: 'g', kcal: 215 },
      { name: 'Potatoes', qty: 300, unit: 'g', kcal: 230 },
      { name: 'Carrot and onion', qty: 200, unit: 'g', kcal: 80 },
      { name: 'Cabbage', qty: 200, unit: 'g', kcal: 50 },
      { name: 'Tomato paste', qty: 2, unit: 'tbsp', kcal: 60 },
      { name: 'Sunflower oil', qty: 1, unit: 'tbsp', kcal: 120 },
      { name: 'Soured cream', qty: 4, unit: 'tbsp', kcal: 120 },
    ],
    steps: [
      'Grate the beetroot and carrot coarsely. Soften them with the chopped onion in the oil for 10 minutes.',
      'Stir in the tomato paste and cook it for a minute, then add 1.5 litres of water and the diced potato.',
      'Simmer for 20 minutes, until the potato gives. Add the shredded cabbage for the last 8.',
      'Season, take it off the heat, and leave it to stand. Soured cream at the table, not in the pot.',
    ],
  }),

  recipe({
    id: 'r3',
    meals: ['Lunch', 'Snack'],
    title: 'Cabbage and egg salad',
    photo: '../assets/recipes/cabbage-egg-salad.jpg.jpeg',
    minutes: 15,
    kcal: 210,
    servings: 2,
    label: 'Light option',
    description: 'Shredded raw cabbage, hard-boiled eggs and cucumber, dressed while the cabbage still has some bite to it.',
    macros: { protein: 11, carbs: 11, fat: 13, fibre: 4 },
    nutrients: { omega3: 0.1, iron: 1.6, vitC: 34 },
    note: 'Raw cabbage is the main source of vitamin C here — cooking it would leave less. The eggs supply the protein.',
    ingredients: [
      { name: 'White cabbage', qty: 300, unit: 'g', kcal: 75 },
      { name: 'Eggs', qty: 3, kcal: 210 },
      { name: 'Cucumber', qty: 1, kcal: 30 },
      { name: 'Spring onion and dill', kcal: 15 },
      { name: 'Soured cream', qty: 3, unit: 'tbsp', kcal: 90 },
    ],
    steps: [
      'Boil the eggs for 8 minutes and put them straight into cold water.',
      'Shred the cabbage as finely as you can manage and salt it lightly. Leave it 5 minutes, then squeeze out the water.',
      'Dice the cucumber and chop the eggs roughly.',
      'Fold everything through the soured cream with the dill and spring onion. Eat it soon — it loosens as it sits.',
    ],
  }),

  recipe({
    id: 'r4',
    meals: ['Lunch', 'Dinner'],
    title: 'Chicken and buckwheat salad',
    photo: '../assets/recipes/chicken-buckwheat-salad.jpg.jpeg',
    minutes: 20,
    kcal: 410,
    servings: 2,
    label: 'Higher in protein',
    description: 'Cooked buckwheat, cold chicken and whatever is in the salad drawer, held together with oil and lemon.',
    macros: { protein: 38, carbs: 26, fat: 14, fibre: 5 },
    nutrients: { omega3: 0.1, iron: 2.3, vitC: 22 },
    note: 'Most of the protein is the chicken. Buckwheat brings the fibre and some iron, and the raw vegetables the vitamin C.',
    ingredients: [
      { name: 'Chicken breast', qty: 250, unit: 'g', kcal: 410 },
      { name: 'Cooked buckwheat', qty: 200, unit: 'g', kcal: 220 },
      { name: 'Tomatoes', qty: 200, unit: 'g', kcal: 36 },
      { name: 'Cucumber', qty: 150, unit: 'g', kcal: 23 },
      { name: 'Olive oil', qty: 1, unit: 'tbsp', kcal: 120 },
      { name: 'Lemon and herbs', kcal: 10 },
    ],
    steps: [
      'If the chicken is raw, poach it in salted water for 12 minutes and let it cool in the liquid.',
      'Whisk the oil with the lemon juice, salt and pepper.',
      'Dice the tomato and cucumber, tear the chicken into pieces, and chop the herbs.',
      'Turn it all through the buckwheat with the dressing. It keeps until the next day.',
    ],
  }),

  recipe({
    id: 'r5',
    meals: ['Breakfast', 'Snack'],
    title: 'Cottage cheese with berries',
    photo: '../assets/recipes/cottage-cheese-berries.jpg.jpeg',
    minutes: 5,
    kcal: 360,
    servings: 1,
    label: 'Higher in protein',
    description: 'Cottage cheese, whatever berries are about, a little honey and some seeds for texture. Five minutes, most of it opening jars.',
    macros: { protein: 26, carbs: 22, fat: 16, fibre: 4 },
    nutrients: { omega3: 0.1, iron: 1.9, vitC: 25 },
    note: 'Cottage cheese is the protein and the calcium. The berries contribute the vitamin C, and the seeds a little iron and fat.',
    ingredients: [
      { name: 'Cottage cheese 5%', qty: 200, unit: 'g', kcal: 240 },
      { name: 'Mixed berries', qty: 100, unit: 'g', kcal: 45 },
      { name: 'Honey', qty: 1, unit: 'tsp', kcal: 20 },
      { name: 'Pumpkin seeds', qty: 10, unit: 'g', kcal: 55 },
    ],
    steps: [
      'Spoon the cottage cheese into a bowl and loosen it with a fork if it is very firm.',
      'Pile the berries on one side rather than stirring them through, so they stay whole.',
      'Trickle over the honey and scatter the seeds.',
    ],
  }),

  recipe({
    id: 'r6',
    meals: ['Dinner'],
    title: 'Roasted potatoes and vegetables',
    photo: '../assets/recipes/roasted-potatoes-vegetables.jpg.jpeg',
    minutes: 45,
    kcal: 330,
    servings: 3,
    label: 'More filling',
    description: 'Potatoes and root vegetables cut small so the edges catch, roasted hot until they are brown at the corners.',
    macros: { protein: 7, carbs: 48, fat: 12, fibre: 9 },
    nutrients: { omega3: 0.1, iron: 1.7, vitC: 28 },
    note: 'The skins on the potatoes and carrots are where most of the fibre is. Roasting holds on to more of the vitamin C than boiling does.',
    ingredients: [
      { name: 'Potatoes', qty: 700, unit: 'g', kcal: 540 },
      { name: 'Carrots', qty: 300, unit: 'g', kcal: 123 },
      { name: 'Courgettes', qty: 300, unit: 'g', kcal: 75 },
      { name: 'Olive oil', qty: 2, unit: 'tbsp', kcal: 240 },
      { name: 'Garlic and herbs', kcal: 15 },
    ],
    steps: [
      'Heat the oven to 220°C. Cut everything to roughly the same size — about 3 cm.',
      'Toss the potatoes and carrots in the oil with salt, spread them in one layer, and roast for 25 minutes.',
      'Add the courgettes and the crushed garlic and give it another 15 minutes.',
      'They are ready when the corners are brown. Herbs on after, not before.',
    ],
  }),

  recipe({
    id: 'r7',
    meals: ['Dinner'],
    title: 'Turkey meatballs with mashed potato',
    photo: '../assets/recipes/turkey-meatballs-mashed-potatoes.jpg.jpeg',
    minutes: 35,
    kcal: 500,
    servings: 3,
    label: 'More filling',
    description: 'Turkey mince rolled with onion and baked rather than fried, on mash loosened with warm milk.',
    macros: { protein: 38, carbs: 40, fat: 20, fibre: 4 },
    nutrients: { omega3: 0.1, iron: 2.6, vitC: 20 },
    note: 'Turkey supplies most of the protein and the iron; the potato is the carbohydrate. The milk and butter in the mash account for the fat.',
    ingredients: [
      { name: 'Turkey mince', qty: 500, unit: 'g', kcal: 750 },
      { name: 'Potatoes', qty: 600, unit: 'g', kcal: 460 },
      { name: 'Milk', qty: 100, unit: 'ml', kcal: 45 },
      { name: 'Butter', qty: 20, unit: 'g', kcal: 150 },
      { name: 'Onion and egg', kcal: 90 },
    ],
    steps: [
      'Heat the oven to 200°C. Grate the onion into the mince, add the egg and a good pinch of salt, and work it briefly with your hands.',
      'Roll into balls the size of a walnut and bake for 20 minutes.',
      'Boil the potatoes until a knife goes through without resistance, then drain them and let the steam off for a minute.',
      'Mash with the butter and the warmed milk. Season it more than feels right, then put the meatballs on top with their pan juices.',
    ],
  }),
];

export const recipeById = (id) => RECIPES.find((r) => r.id === id);
