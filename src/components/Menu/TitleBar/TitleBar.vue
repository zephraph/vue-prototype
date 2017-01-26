<template lang="pug">
  .Menu-TitleBar
    span {{ title }}
    slot(name="icon")
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style lang="stylus" scoped>
  @import '~styles/colors.styl'

  .Menu-TitleBar
    display flex
    height 30px
    align-items center
    width 100%
    border-bottom 2px solid light-border
    color menu-font
    font-family helvetica
    padding-left 5px
</style>
