<template lang="pug">
  .Menu-Section
    Menu-TitleBar(v-if="title", :title="title")
      i(v-if="collapsible" slot="icon")
    slot
</template>

<script>
import MenuTitleBar from 'components/Menu/TitleBar';

export default {
  components: {
    MenuTitleBar
  },
  props: {
    title: String,
    collapsible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus">
  .Menu-Section
    display flex
    flex-direction column
</style>
