<template lang="pug">
  .Menu-Field
    input(@keyup.enter="submit" v-model="value")
</template>

<script>
export default {
  data: () => ({
    value: ''
  }),
  methods: {
    submit() {
      this.$emit('submit', this.value);
      this.value = '';
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/colors.styl'
  @import '../menu.styl'

  .Menu-Field
    height row-height

    input
      border none
      width 100%
      height row-height
</style>
