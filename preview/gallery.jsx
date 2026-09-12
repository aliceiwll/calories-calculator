/**
 * gallery.jsx — preview scaffolding, not part of the product.
 *
 * Everything below the `pv-` prefix is throwaway chrome for looking at
 * the components. The components themselves are imported unmodified
 * from the project root by preview/build.mjs.
 */

/* ---------- sample data ---------- */

const PLATE = [
  {
    id: 'a',
    name: 'Grilled chicken thigh',
    portion: '2 pieces',
    kcal: 260,
    kcalPer100: 209,
    units: [{ label: 'piece', grams: 62 }, { label: 'palm', grams: 100 }, { label: 'plate', grams: 250 }],
  },
  {
    id: 'b',
    name: 'Rice, boiled',
    portion: 'about a cup',
    kcal: 205,
    kcalPer100: 130,
    units: [{ label: 'cup', grams: 158 }, { label: 'bowl', grams: 240 }, { label: 'plate', grams: 320 }],
  },
  {
    id: 'c',
    name: 'Cucumber and tomato salad, no dressing',
    portion: 'side',
    kcal: 45,
    kcalPer100: 18,
    units: [{ label: 'side', grams: 120 }, { label: 'bowl', grams: 220 }],
  },
];

const DAY = [
  { id: 'e1', part: 'Morning', name: 'Porridge with milk and honey', portion: '1 bowl', kcal: 340,
    kcalPer100: 116, units: [{ label: 'bowl', grams: 293 }, { label: 'cup', grams: 200 }, { label: 'plate', grams: 350 }],
    macros: { protein: 12, carbs: 58, fat: 7, fibre: 6 } },
  { id: 'e2', part: 'Morning', name: 'Coffee with milk', portion: '200 ml', kcal: 45,
    kcalPer100: 22, units: [{ label: 'cup', grams: 200 }, { label: 'mug', grams: 330 }],
    macros: { protein: 2, carbs: 4, fat: 2, fibre: 0 } },
  { id: 'e3', part: 'Midday', name: 'Grilled chicken thigh', portion: '2 pieces', kcal: 260,
    kcalPer100: 209, units: [{ label: 'piece', grams: 62 }, { label: 'palm', grams: 100 }, { label: 'plate', grams: 250 }],
    macros: { protein: 38, carbs: 0, fat: 12, fibre: 0 } },
  { id: 'e4', part: 'Midday', name: 'Rice, boiled', portion: 'about a cup', kcal: 205,
    kcalPer100: 130, units: [{ label: 'cup', grams: 158 }, { label: 'bowl', grams: 240 }, { label: 'plate', grams: 320 }],
    macros: { protein: 4, carbs: 45, fat: 1, fibre: 1 } },
  { id: 'e5', part: 'Midday', name: 'Cucumber and tomato salad, no dressing', portion: 'side', kcal: 45,
    kcalPer100: 18, units: [{ label: 'side', grams: 120 }, { label: 'bowl', grams: 220 }],
    macros: { protein: 1, carbs: 4, fat: 2, fibre: 2 } },
  { id: 'e6', part: 'Evening', name: 'Cottage cheese 5%, 200 g pack', portion: '1 pack', kcal: 242,
    kcalPer100: 121, units: [{ label: 'pack', grams: 200 }, { label: 'tbsp', grams: 30 }],
    macros: { protein: 35, carbs: 6, fat: 10, fibre: 0 } },
  { id: 'e7', part: 'Later', name: 'Apple', portion: '1 medium', kcal: 95,
    kcalPer100: 52, units: [{ label: 'medium', grams: 182 }, { label: 'small', grams: 130 }],
    macros: { protein: 0, carbs: 25, fat: 0, fibre: 4 } },
];

const SUGGESTION = {
  title: 'Baked cod with fennel',
  question: 'Feeling like something more filling?',
  reason: 'Today has been light so far',
  meta: '25 min · 480 kcal',
  action: 'View recipe',
  onOpen: () => {},
};

const RESULTS = [
  { name: 'Cottage cheese 5%, 200 g pack', meta: 'Prostokvashino', figure: 121 },
  { name: 'Cottage cheese 9%', meta: 'generic', figure: 159 },
  { name: 'Cottage cheese, low fat 0.6%', meta: 'generic', figure: 88 },
];

/* ---------- scaffolding ---------- */

const HEIGHT = Number(new URLSearchParams(window.location.search).get('h')) || 0;

function Frame({ children, height = 720 }) {
  height = HEIGHT || height;
  return (
    <div className="pv-frame" style={{ height }}>
      <div className="pv-frame__inner">{children}</div>
    </div>
  );
}

function Specimen({ title, note, children, wide = false }) {
  return (
    <section className="pv-specimen">
      <header className="pv-specimen__head">
        <h2 className="pv-specimen__title">{title}</h2>
        {note && <p className="pv-specimen__note">{note}</p>}
      </header>
      <div className={wide ? 'pv-stage pv-stage--wide' : 'pv-stage'}>{children}</div>
    </section>
  );
}

/* ---------- specimens ---------- */

function SearchSpecimen() {
  const [a, setA] = useState('');
  const [b, setB] = useState('cottage cheese');
  return (
    <div className="pv-column">
      <SearchField value={a} onChange={setA} />
      <SearchField value={b} onChange={setB} />
      <SearchField value="oat" onChange={() => {}} loading />
    </div>
  );
}

function InputBarSpecimen() {
  const [value, setValue] = useState('');
  const [last, setLast] = useState(null);
  return (
    <div className="pv-column">
      <InputBar
        value={value}
        onChange={setValue}
        onPhoto={() => setLast('photo')}
        onBarcode={() => setLast('barcode')}
      />
      <p className="pv-echo">{last ? `${last} tapped` : 'tap an icon'}</p>
    </div>
  );
}

function RowSpecimen() {
  return (
    <div className="pv-column">
      <SectionHeader label="Today" note="kcal" />
      <div className="list">
        <Row variant="entry" name="Porridge with milk" meta="1 bowl" figure={310} />
        <Row variant="entry" name="Coffee with milk" meta="200 ml" figure={45} />
      </div>

      <SectionHeader label="Results" note="kcal / 100 g" />
      <div className="list">
        {RESULTS.map((r) => (
          <Row key={r.name} variant="result" name={r.name} meta={r.meta} figure={r.figure} />
        ))}
      </div>

      <SectionHeader label="Ingredients" note="kcal" />
      <div className="list">
        <Row variant="ingredient" name="Rolled oats" figure={120} />
        <Row variant="ingredient" name="Milk 2.5%" figure={78} />
      </div>
    </div>
  );
}

function PortionSpecimen() {
  return (
    <div className="pv-column">
      <PortionControl
        units={PLATE[1].units}
        kcalPer100={PLATE[1].kcalPer100}
      />
    </div>
  );
}

function SheetSpecimen() {
  const [open, setOpen] = useState(true);
  return (
    <Frame height={520}>
      <div className="screen">
        <div className="screen__body">
          <button className="button" type="button" onClick={() => setOpen(true)}>
            Open sheet
          </button>
        </div>
        <Sheet
          open={open}
          onClose={() => setOpen(false)}
          title="Rice, boiled"
          meta="How much was it?"
          footer={<button className="button" type="button" onClick={() => setOpen(false)}>Save</button>}
        >
          <PortionControl
            units={PLATE[1].units}
            kcalPer100={PLATE[1].kcalPer100}
          />
        </Sheet>
      </div>
    </Frame>
  );
}

function RestSpecimen() {
  return (
    <div className="pv-column">
      <button className="button" type="button">Add to today</button>
      <button className="estimate__add" type="button">Add something it missed</button>
      <div className="empty">
        <p className="empty__text">Nothing here yet.</p>
        <button className="button empty__cta" type="button">Add the first thing by photo</button>
      </div>
    </div>
  );
}

function TodaySpecimen() {
  const [entries, setEntries] = useState(
    new URLSearchParams(window.location.search).get('empty') ? [] : DAY,
  );
  const [query, setQuery] = useState('');

  return (
    <>
      <Frame>
        <TodayScreen
          date={new Date(2026, 8, 6)}
          locale="en-GB"
          entries={entries}
          suggestion={SUGGESTION}
          query={query}
          onQueryChange={setQuery}
          onPhoto={() => {}}
          onBarcode={() => {}}
          onChangeEntry={(id, draft) =>
            setEntries(entries.map((e) =>
              e.id === id ? { ...e, kcal: draft.kcal, portion: `${draft.count} × ${draft.unit.label}` } : e))}
          onRemoveEntry={(id) => setEntries(entries.filter((e) => e.id !== id))}
          onEmptyAction={() => {}}
        />
      </Frame>
      <div className="pv-column">
        <p className="pv-echo">{entries.length} entries · tap one to edit or remove</p>
        <button className="button" type="button" onClick={() => setEntries([])}>Empty the day</button>
        <button className="estimate__add" type="button" onClick={() => setEntries(DAY)}>Reset</button>
      </div>
    </>
  );
}

function PhotoReviewSpecimen() {
  const [added, setAdded] = useState(null);
  return (
    <>
      <Frame>
        <PhotoReviewScreen
          photo={null}
          detected={PLATE}
          onAdd={(items) => setAdded(items.reduce((s, i) => s + i.kcal, 0))}
          onRetake={() => {}}
        />
      </Frame>
      <p className="pv-echo">{added != null ? `added — ${added} kcal midpoint` : 'tap a row to edit a portion'}</p>
    </>
  );
}

/* ---------- page ---------- */

/* The prototype itself, in a phone. This is what the preview opens on
   now — the component specimens below it are still reachable with
   ?gallery=1, but the thing being reviewed is the product. */
function Prototype() {
  return (
    <div className="pv-page pv-page--app">
      <Frame height={844}>
        <App today={new Date(2026, 8, 6, 14, 30)} locale="en-GB" />
      </Frame>
      <p className="pv-echo">
        Today · + · Recipes · Profile — tap through. ?gallery=1 for the component specimens.
      </p>
    </div>
  );
}

function Gallery() {
  return (
    <div className="pv-page">
      <header className="pv-head">
        <h1 className="pv-head__title">piece — component preview</h1>
        <p className="pv-head__note">
          Live components from the project root, rendered in the browser.
          Rebuild with <code>node preview/build.mjs</code> after editing any <code>.jsx</code> or <code>.css</code>.
        </p>
      </header>

      <Specimen title="TodayScreen" note="Screen 1. Search pinned at the top, the record scrolls, the day total is a pinned line at the bottom — not a headline.">
        <TodaySpecimen />
      </Specimen>

      <Specimen title="PhotoReviewScreen" note="Flow A, photo branch. Editable draft, range total, nothing committed until Add.">
        <PhotoReviewSpecimen />
      </Specimen>

      <Specimen title="Sheet + PortionControl" note="Escape or the scrim closes it.">
        <SheetSpecimen />
      </Specimen>

      <Specimen title="InputBar" note="Search primary, barcode and photo as siblings.">
        <InputBarSpecimen />
      </Specimen>

      <Specimen title="SearchField" note="Empty, filled with clear, and loading.">
        <SearchSpecimen />
      </Specimen>

      <Specimen title="Row" note="entry / result / ingredient, with SectionHeader between groups.">
        <RowSpecimen />
      </Specimen>

      <Specimen title="PortionControl" note="Household units first; grams stay visible.">
        <PortionSpecimen />
      </Specimen>

      <Specimen title="Button, EmptyState" note="No component files yet — CSS-only.">
        <RestSpecimen />
      </Specimen>
    </div>
  );
}

/* ?only=today|photo|portion|rows renders one specimen on its own, for
   screenshotting a single screen without the gallery around it. */
const SOLO = {
  today: TodaySpecimen,
  photo: PhotoReviewSpecimen,
  portion: PortionSpecimen,
  sheet: SheetSpecimen,
  rows: RowSpecimen,
};

/* ?audit=1 looks for the class of bug that produced the Row overlap:
   text drawn on top of other text, or spilling past the box that is
   meant to contain it. Sibling rectangles are compared directly,
   because that is what "the name runs through the figure" actually is
   — two boxes occupying the same pixels. Results land in #audit so
   they can be read with --dump-dom instead of by eye. */
function audit() {
  const out = [];

  /* Inside an svg, overlapping is the drawing. And className there is
     an SVGAnimatedString, which stringifies to [object …] and made
     every finding unreadable. */
  const drawn = (el) => !!el.ownerSVGElement || el.tagName.toLowerCase() === 'svg';
  const name = (el) => (typeof el.className === 'string' && el.className) || el.tagName.toLowerCase();
  const placed = (el) => {
    const p = getComputedStyle(el).position;
    return p === 'absolute' || p === 'fixed';
  };
  const hits = (a, b) =>
    a.right > b.left + 0.5 && b.right > a.left + 0.5 &&
    a.bottom > b.top + 0.5 && b.bottom > a.top + 0.5;

  /* Content box, not border box. Padding is empty by definition, so a
     neighbour pulled into it is not text on top of text — which is the
     only thing this is looking for. Comparing border boxes reported
     every row whose subtext is pulled up into the button's target
     padding. */
  const content = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const px = (v) => parseFloat(cs[v]) || 0;
    return {
      left: r.left + px('paddingLeft') + px('borderLeftWidth'),
      right: r.right - px('paddingRight') - px('borderRightWidth'),
      top: r.top + px('paddingTop') + px('borderTopWidth'),
      bottom: r.bottom - px('paddingBottom') - px('borderBottomWidth'),
    };
  };

  document.querySelectorAll('.pv-frame *, .pv-column *').forEach((parent) => {
    if (drawn(parent)) return;
    const kids = [...parent.children].filter((k) => !placed(k) && !drawn(k) && k.getClientRects().length);
    for (let i = 0; i < kids.length; i++) {
      for (let j = i + 1; j < kids.length; j++) {
        const a = content(kids[i]);
        const b = content(kids[j]);
        if (hits(a, b)) {
          out.push(`COLLIDE <${name(kids[i])}> x <${name(kids[j])}> "${(kids[i].textContent || '').slice(0, 30)}" / "${(kids[j].textContent || '').slice(0, 30)}"`);
        }
      }
    }

    /* Text wider than the box holding it, where nothing clips it, is
       drawn over whatever sits next to it. A flex item's box does not
       grow when its text overflows — it is pinned by flex-basis — so
       comparing rectangles alone never sees this; scrollWidth does. */
    kids.forEach((k) => {
      const kcs = getComputedStyle(k);
      if (kcs.overflow !== 'visible' || kcs.position === 'absolute') return;
      /* A box holding a deliberate full-bleed child measures wider than
         itself by design. That is the bleed, not an overflow. */
      if (k.querySelector(':scope > .bleed')) return;
      if (k.clientWidth > 0 && k.scrollWidth > k.clientWidth + 1) {
        out.push(`OVERFLOW <${name(k)}> ${k.scrollWidth}px of text in ${k.clientWidth}px "${(k.textContent || '').trim().slice(0, 30)}"`);
      }
    });

    /* Spilling past a parent that does not clip means the text is drawn
       over whatever sits next to it. A parent that clips is fine — that
       is truncation working. */
    const cs = getComputedStyle(parent);
    if (cs.overflow !== 'visible' || placed(parent)) return;
    /* .bleed leaves its container deliberately, to run a scroller to the
       edges of the screen through the parent's padding. It is the one
       case where crossing the boundary is the design. */
    const bleeds = (el) => el.classList.contains('bleed');
    /* Border box, not content box. A control pulled into its parent's
       own padding by a negative margin is deliberate and still inside
       the parent; only crossing the outer edge is a spill. */
    const right = parent.getBoundingClientRect().right;
    kids.forEach((k) => {
      if (bleeds(k)) return;
      const r = k.getBoundingClientRect();
      if (r.right > right + 0.5) {
        out.push(`SPILL <${name(k)}> past <${name(parent)}> by ${(r.right - right).toFixed(1)}px "${(k.textContent || '').slice(0, 30)}"`);
      }
    });
  });

  /* Ink is a decision, black is the absence of one. Any text drawn in
     pure black got there by inheriting from nothing. */
  document.querySelectorAll('.pv-frame *, .pv-column *').forEach((el) => {
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!hasText || drawn(el)) return;
    const c = getComputedStyle(el).color;
    if (c === 'rgb(0, 0, 0)') {
      out.push(`BLACK <${name(el)}> "${(el.textContent || '').trim().slice(0, 30)}"`);
    }
  });

  const box = document.createElement('pre');
  box.id = 'audit';
  box.textContent = out.length ? [...new Set(out)].join('\n') : 'AUDIT CLEAN';
  document.body.appendChild(box);
}

const params = new URLSearchParams(window.location.search);
const only = params.get('only');
const Solo = SOLO[only];

ReactDOM.createRoot(document.getElementById('root')).render(
  Solo ? <div className="pv-page pv-page--solo"><Solo /></div>
    : params.get('gallery') ? <Gallery />
    : <Prototype />,
);

/* ?click=<selector> presses everything matching, once the page has
   rendered, so a state that only exists after an interaction — an open
   disclosure, a selected chip — can be screenshotted as the real thing
   rather than mocked up with a prop that only the preview would use. */
const clickTarget = new URLSearchParams(window.location.search).get('click');
if (clickTarget) {
  /* Steps separated by >> are pressed in order, with a beat between
     them, so a whole flow can be walked and screenshotted at the end of
     it rather than mocked up state by state. */
  setTimeout(async () => {
    for (const raw of clickTarget.split('>>')) {
      const step = raw.trim();
      if (step.startsWith('swipe:')) {
        /* A real drag, mid-chain, so a flow that begins with a gesture
           can be walked like any other. */
        const el = document.querySelector(step.slice(6));
        if (el) {
          const box = el.getBoundingClientRect();
          const y = box.top + box.height / 2;
          const send = (type, x) => el.dispatchEvent(new PointerEvent(type, {
            bubbles: true, clientX: x, clientY: y, pointerId: 1, pointerType: 'touch', button: 0,
          }));
          const tick = () => new Promise((r) => setTimeout(r, 40));
          send('pointerdown', box.right - 20); await tick();
          send('pointermove', box.right - 60); await tick();
          send('pointermove', box.right - 160); await tick();
          send('pointerup', box.right - 160); await tick();
        }
      } else if (step.startsWith('type:')) {
        /* Typed through the native setter so React sees a real input
           event — assigning .value alone leaves the component's state
           untouched and the screen unchanged. */
        const [, selector, text] = step.match(/^type:([^:]+):(.*)$/);
        const el = document.querySelector(selector);
        if (el) {
          const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          set.call(el, text);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }
      } else {
        const el = document.querySelector(step);
        if (el) { el.focus?.(); el.click(); }
      }
      await new Promise((r) => setTimeout(r, 260));
    }
  }, 400);
}

/* ?swipe=<selector> drags each match to the left with real pointer
   events, so the uncovered actions can be screenshotted as the state
   the gesture actually produces rather than one a preview-only prop
   forced open. */
const swipeTarget = new URLSearchParams(window.location.search).get('swipe');
if (swipeTarget) {
  setTimeout(async () => {
    /* The first match only. The list keeps one row open at a time, so
       swiping every match would just leave the last one showing. */
    const el = document.querySelector(swipeTarget);
    if (el) {
      const box = el.getBoundingClientRect();
      const y = box.top + box.height / 2;
      const send = (type, x) => el.dispatchEvent(new PointerEvent(type, {
        bubbles: true, clientX: x, clientY: y, pointerId: 1, pointerType: 'touch', button: 0,
      }));
      /* A tick between events, because a real gesture arrives in
         separate tasks and a burst dispatched in one would exercise
         batching behaviour no finger can produce. */
      const tick = () => new Promise((r) => setTimeout(r, 30));
      send('pointerdown', box.right - 20); await tick();
      send('pointermove', box.right - 60); await tick();
      send('pointermove', box.right - 180); await tick();
      send('pointerup', box.right - 180); await tick();
    }
  }, 400);
}

if (new URLSearchParams(window.location.search).get('audit')) {
  setTimeout(audit, 600);
}
