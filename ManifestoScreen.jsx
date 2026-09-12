/**
 * ManifestoScreen — what the product believes, before it asks anything.
 *
 * This is the one screen that argues. Everything after it records and
 * describes; this says why the record is worth keeping and what it will
 * never do to you. It is deliberately not onboarding: there are no
 * questions, no height and weight, no goal to set. One statement, one
 * button, and the note that matters most sits at the bottom where
 * someone who needs it will still find it.
 *
 * The shapes behind the words are the same butter and blue the rest of
 * the product uses, blurred past recognition. They carry no meaning —
 * they are the only place in the system where colour is atmosphere
 * rather than role, which is why it happens here and nowhere else.
 */

import { Glyph, ICON } from './Glyph';

export function ManifestoScreen({ onContinue, leaving = false }) {
  return (
    <div className={leaving ? 'manifesto manifesto--leaving' : 'manifesto'} aria-hidden={leaving || undefined}>
      <div className="manifesto__glow manifesto__glow--butter-top" aria-hidden="true" />
      <div className="manifesto__glow manifesto__glow--blue-left" aria-hidden="true" />
      <div className="manifesto__glow manifesto__glow--tint" aria-hidden="true" />
      <div className="manifesto__glow manifesto__glow--blue-right" aria-hidden="true" />
      <div className="manifesto__glow manifesto__glow--butter-bottom" aria-hidden="true" />

      <div className="manifesto__sheet">
        <div className="manifesto__meta">
          <span className="manifesto__stamp">MANIFESTO &nbsp;//&nbsp; 01</span>
          <span className="manifesto__stamp manifesto__stamp--strong">A KINDER APPROACH TO FOOD</span>
        </div>

        <span className="manifesto__rule" aria-hidden="true" />

        <h1 className="manifesto__headline">
          Your body does not<br />calculate math.<br />It reads biochemical<br />signals.
        </h1>

        <p className="manifesto__copy">
          We track calories to better understand what we eat — not to turn food into a score.
        </p>

        <p className="manifesto__copy">
          Food is information. Not good or bad. Just data to help you feel your best.
        </p>

        <span className="manifesto__rule manifesto__rule--short" aria-hidden="true" />

        <p className="manifesto__caps">No scores. No streaks. No punishment.</p>

        {/* The action and the note travel together at the foot, so the
            note cannot be pushed off the screen by the argument above
            it — it is the line that matters most to whoever needs it. */}
        <div className="manifesto__foot">
          <button className="button manifesto__cta" type="button" onClick={onContinue}>
            Continue
            <Glyph d={ICON.forward} size={20} />
          </button>

          <p className="manifesto__support">
            If tracking food feels difficult or distressing, support is available.
          </p>
        </div>
      </div>
    </div>
  );
}
