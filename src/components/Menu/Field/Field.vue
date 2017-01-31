<template lang="pug">
  .Menu-Field
    span.label(v-if="label") {{ label }}
    input(@keyup.enter="submit" v-model="value")
</template>

<script>
export default {
  data: () => ({
    value: ''
  }),
  methods: {
    submit() {
      if (this.action)
        this.action(this.value);
      this.value = '';
    }
  },
  props: [
    'label',
    'action'
  ]
}
</script>

<style lang="stylus" scoped>
  @import '~styles/colors.styl'
  @import '../menu.styl'

  .Menu-Field
    height row-height
    display flex
    align-items center

  .label
    font-family Rubik
    color gray2
    margin 0 8px

  input
    border none
    width 100%
    height row-height
</style>
