/**
 * SwipeRow — swipe left on an entry to uncover Delete.
 *
 * The whole row travels as one piece. An earlier version gave up width
 * instead of moving, which let the name rewrap mid-gesture and pulled
 * the entry apart while it was being acted on; the name, the amount and
 * the tag now stay together and slide together, because they describe
 * one thing and the gesture is about that one thing.
 *
 * The gesture reveals, it does not act. A swipe that deletes on release
 * makes the most destructive thing on the screen the easiest one to do
 * by accident, and the record is the one thing here nobody should lose
 * to a stray thumb. Uncovering the button is the first half; pressing
 * it is the second.
 *
 * One threshold, and it is the obvious one: past halfway it settles
 * open, short of halfway it springs back. A gesture that resolves to
 * whichever state it was nearer never feels like it fought you.
 *
 * It is an alternative, never the only way. Swiping is invisible to a
 * keyboard and to a screen reader, so tapping the row still opens the
 * sheet where the same action lives in text.
 *
 * Two discs, not a slab. A filled rectangle reaching the screen edge
 * reads as one target with a seam in it, and the seam is the only thing
 * separating "change this" from "lose this"; circles that do not touch
 * cannot be pressed by accident on the way to each other.
 *
 * Neither is red. There is no red in this palette, on purpose, and
 * inventing one to say "danger" would frame removing a line you wrote
 * as an error rather than an ordinary edit.
 */

import { useRef, useState } from 'react';
import { Glyph, ICON } from './Glyph';

/* Far enough that a scroll cannot trigger it, short enough to feel like
   a flick rather than a drag. */
const AXIS_LOCK = 12;

export function SwipeRow({ open, onOpenChange, onEdit, onRemove, isNew = false, children }) {
  const actionRef = useRef(null);
  const start = useRef(null);
  const dxRef = useRef(0);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);

  const reveal = () => actionRef.current?.offsetWidth ?? 0;

  const move = (value) => {
    dxRef.current = value;
    setDx(value);
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, axis: null };
  };

  const onPointerMove = (e) => {
    if (!start.current) return;
    const moveX = e.clientX - start.current.x;
    const moveY = e.clientY - start.current.y;

    /* Until the gesture commits to horizontal the page keeps the event,
       or a swipe steals every attempt to scroll past a list of them. */
    if (!start.current.axis) {
      if (Math.abs(moveX) < AXIS_LOCK && Math.abs(moveY) < AXIS_LOCK) return;
      start.current.axis = Math.abs(moveX) > Math.abs(moveY) ? 'x' : 'y';
      if (start.current.axis === 'x') {
        setDragging(true);
        try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch { /* not fatal */ }
      }
    }
    if (start.current.axis !== 'x') return;

    const base = open ? -reveal() : 0;
    move(Math.max(-reveal(), Math.min(0, base + moveX)));
  };

  const onPointerUp = () => {
    /* Read from the ref, not from state: React batches updates, and a
       release that reads the state variable can decide the gesture on a
       position from before the last move. */
    if (start.current?.axis === 'x') onOpenChange?.(dxRef.current < -reveal() / 2);
    start.current = null;
    setDragging(false);
    move(0);
  };

  const offset = dragging ? dx : open ? -reveal() : 0;

  return (
    <div className={isNew ? 'swipe swipe--new' : 'swipe'} data-open={open || undefined}>
      <div className="swipe__actions" ref={actionRef} aria-hidden={!open}>
        <button
          className="swipe__disc swipe__disc--edit"
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Edit entry"
          onClick={() => { onOpenChange?.(false); onEdit?.(); }}
        >
          <Glyph d={ICON.pencil} size={18} />
        </button>

        <button
          className="swipe__disc swipe__disc--delete"
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Delete entry"
          onClick={() => { onOpenChange?.(false); onRemove?.(); }}
        >
          <Glyph d={ICON.trash} size={18} />
        </button>
      </div>

      <div
        className="swipe__surface"
        data-dragging={dragging || undefined}
        style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {children}

        {/* While the action is showing, a tap on the row closes it rather
            than opening the sheet underneath. Without this the row has
            two meanings for one tap. */}
        {open && (
          <button
            className="swipe__shield"
            type="button"
            aria-label="Close actions"
            onClick={() => onOpenChange?.(false)}
          />
        )}
      </div>
    </div>
  );
}
