<template lang="pug">
  g.Node(:transform="translate" @mousedown="select")
    rect.container(:width="width", :class="{ selected: model.selected }", :height="height" x="0" y="0")
    g.title(draggable)
      rect.bg(:width="width" height="20")
      text(v-if="model.name", x="5" y="15") {{ model.name }}
    circle.close(:cx="width - 10" cy="10" r="6.5" @click="close(model.id)")
</template>

<script>
import draggable from 'mixins/draggable';
import { mapActions, mapGetters } from 'vuex';

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
    select() {
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
    },
    ...mapActions('workflow/node', {
      close: 'delete'
    })
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

  .container
    stroke black
    stroke-width 2
    fill white2

  .title
    text
      fill gray1
      stroke none
      font-family Rubik
      font-weight 400

    .bg
      fill black

  .close
    fill red

  .selected
    stroke primary

</style>
