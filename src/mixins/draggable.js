import K from 'kefir';

const makeDraggable = model =>
  K.fromEvents(model.$el.querySelector('[draggable]') || model.$el, 'mousedown')
  .observe(() => drag$(model));

const drag$ = model =>
  K.fromEvents(document, 'mousemove')
  .takeUntilBy(K.fromEvents(document, 'mouseup'))
  .map(e => ({ x: e.clientX, y: e.clientY }))
  .diff((p, n) => ({ x: n.x - p.x, y: n.y - p.y }))
  .onValue(
    ({x, y}) => model.incrementPosition(x, y)
  ).onEnd(model.finalizePosition);

export default {
  mounted() {
    makeDraggable(this);
  },
  methods: {
    incrementPosition() {
      console.error(`<${this.$vnode.componentOptions.tag}/> must implement incrementPosition(x, y)`);
    },
    finalizePosition() {}
  }
}
