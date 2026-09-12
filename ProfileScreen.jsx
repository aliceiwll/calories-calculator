/**
 * ProfileScreen — settings, and deliberately nothing else.
 *
 * No totals, no averages, no weeks reviewed. Every one of those turns
 * the record into a performance, which is the thing this product is
 * built not to do. What lives here is what the app needs to be told:
 * how to write dates and figures, and what it is allowed to keep.
 */

import { SectionHeader } from './SectionHeader';
import { Row } from './Row';

export function ProfileScreen({ locale, onHelp }) {
  return (
    <div className="screen">
      <div className="screen__head">
        {/* Same masthead shape as Recipes and Saved: the name, then one
            line in the app's own voice saying what the screen is for. */}
        <div className="recipes__head">
          <div className="recipes__heading">
            <h1 className="today__title">Profile</h1>
            <p className="recipes__lede">Make the app fit your life.</p>
          </div>
        </div>
      </div>

      <div className="screen__body">
        <SectionHeader label="Preferences" />
        <div className="list">
          <Row variant="entry" name="Units" meta="Grams and household measures" figure="g" />
          <Row variant="entry" name="Language and dates" meta={locale ?? 'System'} figure="" />
          <Row variant="entry" name="Household measures" meta="Cup, bowl, plate, palm" figure="" />
        </div>

        <SectionHeader label="Your record" />
        <div className="list">
          <Row variant="entry" name="Export your data" meta="A file of your own entries" figure="" />
          <Row variant="entry" name="Delete everything" meta="Removes the whole record" figure="" />
        </div>

        <SectionHeader label="Help & support" />
        <div className="list profile__help">
          <Row variant="entry" name="Help" meta="How the app works" figure="" onSelect={onHelp} />
          <Row variant="entry" name="Contact support" meta="Write to a person" figure="" onSelect={onHelp} />
        </div>

        <SectionHeader label="About" />
        <div className="list">
          <Row variant="entry" name="Version" meta="Prototype" figure="" />
        </div>

        {/* What the app is for, said once, at the end of the settings
            rather than the top — it is a reassurance, not a banner. */}
        <p className="profile__statement">
          This app keeps a record of what you ate. It does not set targets, score days
          or compare you with anyone.
        </p>
        <p className="profile__closing">No scores. No streaks. Just your record.</p>

        <p className="profile__note">
          This app keeps a record of what you ate. It does not set targets, score days
          or compare you with anyone.
        </p>

        <p className="profile__voice">No scores. No streaks. Just your record.</p>
      </div>
    </div>
  );
}
