<template lang="pug">
  .Layout
    header
      slot(name="header")
    .center
      aside.left
        slot(name="left")
      main
        slot
      aside.right
        slot(name="right")
    footer
      slot(name="footer")
</template>

<style lang="stylus" scoped>
  @import '~styles/colors.styl'

  .Layout
    display flex
    flex-direction column
    height 100%
    width 100%

    header, .left, .right, footer
      background-color white2

    main
      background-color white3

    .left
      border-right 2px solid dark-border

    .right
      border-left 2px solid dark-border

    header, .left, .right, main, footer
      &:empty
        display none

    .center, main
      width 100%
      height 100%

    .center
      display flex
      margin auto
</style>
