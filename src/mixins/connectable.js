import K from 'kefir';

const makeDraggable = model =>
  K.fromEvents(model.$el.querySelector('[connectable]') || model.$el, 'mousedown')
  .observe(() => drag$(model));

const drag$ = model =>
  K.fromEvents(document, 'mousemove')
  .takeUntilBy(K.fromEvents(document.querySelectorAll('[connectable]'), 'mouseup'))
  .map(e => ({ x: e.clientX, y: e.clientY }))
  .diff((p, n) => ({ x: n.x - p.x, y: n.y - p.y }))
  .onValue(
    ({x, y}) => model.incrementPosition(x, y)
  )
  .takeUntilBy(K.fromEvents(document, 'mouseup'))
  .onEnd(model.finalizePosition);

export default {

}
