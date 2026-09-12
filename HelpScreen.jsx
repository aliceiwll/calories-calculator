/**
 * HelpScreen — what the app does, and how to reach a person.
 *
 * Small on purpose. Profile is a utility drawer, not an account, and
 * help that runs to five screens is usually a symptom of a product that
 * needed fewer explanations rather than more.
 */

import { ScreenHead } from './ScreenHead';
import { SectionHeader } from './SectionHeader';
import { Row } from './Row';

export function HelpScreen({ onBack }) {
  return (
    <div className="screen">
      <div className="screen__head">
        <ScreenHead title="Help & support" onBack={onBack} />
      </div>

      <div className="screen__body">
        <p className="help__voice">
          Everything here is a record you keep. Nothing is scored, and nothing is sent anywhere
          you have not asked it to go.
        </p>

        <SectionHeader variant="minor" label="Common questions" />
        <div className="list">
          <Row variant="ingredient" name="Where do the calorie figures come from?" figure="" />
          <Row variant="ingredient" name="Why is a photo estimate a range?" figure="" />
          <Row variant="ingredient" name="Can I change a meal after adding it?" figure="" />
          <Row variant="ingredient" name="How do I export my record?" figure="" />
        </div>

        <SectionHeader variant="minor" label="Contact" />
        <p className="help__contact">
          Write to <span className="help__address">hello@piece.app</span> and a person will answer.
        </p>
      </div>
    </div>
  );
}
