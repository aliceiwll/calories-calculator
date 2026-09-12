/**
 * CameraScreen — point it at the plate.
 *
 * "Analyse a photo" used to land straight on a result, with no step in
 * between. That is why it did not read as a photo flow: nothing was
 * ever photographed. This is the missing step — frame, shutter, then a
 * moment of the app visibly working before it says anything.
 *
 * No camera API. A prototype does not need permission to demonstrate
 * what the screen is for, and asking for one would put a system dialog
 * in the middle of a design review.
 *
 * The pause after the shutter is not decoration. An estimate that
 * appears instantly reads as a lookup; the second it takes to arrive is
 * what tells the user something was worked out from the picture, and
 * therefore that it could be wrong.
 */

import { useEffect, useState } from 'react';
import { Glyph, ICON } from './Glyph';

const ANALYSING_MS = 1600;

export function CameraScreen({ photo, onClose, onAnalysed }) {
  const [phase, setPhase] = useState('framing');

  useEffect(() => {
    if (phase !== 'analysing') return undefined;
    const t = setTimeout(onAnalysed, ANALYSING_MS);
    return () => clearTimeout(t);
  }, [phase, onAnalysed]);

  return (
    <div className="camera">
      <div className="camera__view" style={photo ? { backgroundImage: `url(${photo})` } : undefined}>
        <div className="camera__frame" aria-hidden="true" />

        <button className="camera__close" type="button" aria-label="Close camera" onClick={onClose}>
          <Glyph d={ICON.close} />
        </button>

        {phase === 'framing' ? (
          <p className="camera__hint">Get the whole plate in the frame.</p>
        ) : (
          <div className="camera__working" role="status">
            <span className="camera__spinner" aria-hidden="true" />
            <span className="camera__working-text">Working out what is on the plate…</span>
          </div>
        )}
      </div>

      <div className="camera__bar">
        <button className="camera__gallery" type="button" aria-label="Choose from photos" disabled={phase !== 'framing'}>
          <Glyph d={ICON.gallery} />
        </button>

        <button
          className="camera__shutter"
          type="button"
          aria-label="Take photo"
          disabled={phase !== 'framing'}
          onClick={() => setPhase('analysing')}
        >
          <span className="camera__shutter-ring" aria-hidden="true" />
        </button>

        {/* Balances the gallery button so the shutter sits centred. */}
        <span className="camera__spacer" aria-hidden="true" />
      </div>
    </div>
  );
}
