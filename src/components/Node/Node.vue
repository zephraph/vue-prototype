<template lang="pug">
  g.Node(:transform="translate" @mousedown="selected")
    rect(:width="width", :class="{ selected: model.selected }", :height="height" x="0" y="0")
    text(v-if="model.name", :x="width / 2" y="15" text-anchor="middle") {{ model.name }}
</template>

<script>
import draggable from 'mixins/draggable';
import { mapActions } from 'vuex';

export default {
  mixins: [draggable],
  data() {
    return {
      x: this.model.x,
      y: this.model.y,
      width: 100,
      height: 100
    }
  },
  methods: {
    selected() {
      this.$emit('selected');
    },
    incrementPosition(x, y) {
      this.x += x;
      this.y += y;
    },
    finalizePosition() {
      this.$store.dispatch('workflow/node/setPosition', {
        id: this.model.id,
        x: this.x,
        y: this.y
      });
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
