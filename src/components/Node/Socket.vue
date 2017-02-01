<template lang="pug">
g.Socket(:transform="translate")
  circle(r="5")
  text(
    :x="output ? -8 : 8" y="4",
    :text-anchor="output ? 'end' : 'start'"
  ) {{ label }}
</template>

<script>
import translatable from 'mixins/translatable';

export default {
  mixins: [translatable],
  data() {
    return {
      y: this.offset || 40
    }
  },
  computed: {
    x() {
      return this.output
        ? this.width
        : 0
    },
    output() {
      return this.type === 'output';
    }
  },
  props: [
    'label',
    'type', // input | output
    'width',
    'offset'
  ]
}
</script>

<style lang="stylus" scoped>
</style>
