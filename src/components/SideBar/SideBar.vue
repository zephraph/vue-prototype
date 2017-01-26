<template lang="pug">
  .Sidebar
    slot
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  @import '~styles/colors.styl'

  .Sidebar
    display flex
    flex-direction column
    height 100%
    width 200px
</style>
