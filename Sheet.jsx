/**
 * Sheet — the editing surface.
 *
 * Editing happens over the list, not on a screen of its own: the user
 * is correcting one line of something they can still see. The scrim
 * dims the record without hiding it.
 *
 * Escape and a scrim tap both close. There is no explicit cancel
 * button — leaving without saving is the default, and a sheet that
 * asks "are you sure?" over a portion size is asking about nothing.
 */

import { useEffect } from 'react';

export function Sheet({ open, onClose, title, meta, footer, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div className="sheet__scrim" data-open={open} onClick={onClose} />

      <div
        className="sheet"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        /* Empty string rather than a boolean: React 18 forwards
           inert="" and drops inert={false}, which is exactly the two
           states this needs. */
        inert={open ? undefined : ''}
        aria-label={title}
      >
        <div className="sheet__grabber" />

        {(title || meta) && (
          <div className="sheet__head">
            {title && <h2 className="sheet__title">{title}</h2>}
            {meta && <div className="sheet__meta">{meta}</div>}
          </div>
        )}

        <div className="sheet__body">{children}</div>

        {footer && <div className="sheet__foot">{footer}</div>}
      </div>
    </>
  );
}
