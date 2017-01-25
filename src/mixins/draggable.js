import K from 'kefir';

const makeDraggable = model =>
  K.fromEvents(model.$el, 'mousedown')
  .observe(() => drag$(model));

const drag$ = model =>
  K.fromEvents(document, 'mousemove')
  .takeUntilBy(K.fromEvents(document, 'mouseup'))
  .map(e => ({ x: e.clientX, y: e.clientY }))
  .diff((p, n) => ({ x: n.x - p.x, y: n.y - p.y }))
  .onValue(
    ({x, y}) => {
      model.x += x;
      model.y += y;
    });

export default {
  mounted() {
    makeDraggable(this);
  }
}
