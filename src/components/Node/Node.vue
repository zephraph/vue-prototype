<template lang="pug">
  g.Node(:transform="translate" @mousedown="selected")
    rect(:width="width", :class="{ selected: model.selected }", :height="height" x="0" y="0")
    text(v-if="model.name", :x="width / 2" y="15" text-anchor="middle") {{ model.name }}
</template>

<script>
import draggable from 'mixins/draggable';

export default {
  mixins: [draggable],
  data: () => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100
  }),
  methods: {
    selected() {
      this.$emit('selected');
    }
  },
  computed: {
    translate() {
      return `translate(${this.x},${this.y})`;
    }
  },
  props: [
    'model'
  ]
}
</script>

<style lang="stylus" scoped>
  @import '~styles/colors.styl'

  rect
    stroke black
    stroke-width 2
    fill white2
    rx 3
    ry 3

  .selected
    stroke primary

</style>
