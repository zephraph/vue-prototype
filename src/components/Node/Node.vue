<template lang="pug">
  g.Node(:transform="translate")
    rect(:width="width", :height="height" x="0" y="0")
    text(v-if="title", :x="width / 2" y="15" text-anchor="middle") {{ title }}
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
  computed: {
    translate() {
      return `translate(${this.x},${this.y})`;
    }
  },
  props: [
    'title'
  ]
}
</script>

<style lang="stylus">
  @import '~styles/colors.styl'

  .Node rect
    stroke black
    stroke-width 2
    fill white2
    rx 3
    ry 3

</style>
