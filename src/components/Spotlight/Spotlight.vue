<template lang="pug">
  .Spotlight
    SearchIcon
    input(:input="query")
</template>

<script>
import SearchIcon from '../icons/Search.vue';
export default {
  name: 'Spotlight',
  data: () => ({}),
  components: {
    SearchIcon
  }
}
</script>

<style lang="stylus" scoped>
.Search
  display inline-block
  width 25px
  height 25px
  fill none
  stroke #888888
  stroke-linecap round
  stroke-linejoin round
  stroke-width 8.25%
  margin 8px

spotlight-width = 500px

.Spotlight
  border 1px solid #D3D3D3
  width spotlight-width
  height 40px
  border-radius 5px
  background-color #EDEDED
  box-shadow: 0px 8px 18px -10px #2D2D2D;

  input
    background none
    position relative
    float right
    width calc(100% - 43px)
    height 100%
    padding 0
    top 50%
    border none
    transform translateY(-50%)
    font-size 27px
    font-family 'Rubik', sans-serif
    color #444444

    &:focus
      outline none
</style>
