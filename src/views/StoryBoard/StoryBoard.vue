<template lang="pug">
  .StoryBoard
    h1 Vue StoryBoard
    .workspace
      .detailView
        .componentEntry(v-for="component in components", :is-active="isActive(component)") {{ component }}
      .renderArea
        Render(:component="activeComponent")
</template>

<script>
import components from 'components';
import renderer from './componentRenderer';
const componentNames = Object.keys(components);

export default {
  name: 'StoryBoard',
  data: () => ({
    components: componentNames,
    activeComponent: componentNames[1]
  }),
  methods: {
    isActive(component) {
      return component === this.activeComponent;
    }
  },
  components: { Render: renderer(components) }
}
</script>

<style lang="stylus" test="true">
  html, body
    height 100%
  body
    font-family 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif
    color #34495e
</style>

<style lang="stylus" scoped>
  .StoryBoard
    height 100%
  .workspace
    display flex
  .detailView
    width 100%
    max-width 200px
  .componentEntry
    padding 5px 10px
  .componentEntry[is-active]
    background-color #FFF333
  .renderArea
    width 100%
    margin 10px
</style>
