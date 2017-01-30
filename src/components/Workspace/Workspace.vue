<template lang="pug">
  svg.Workspace(@click="deselectAll")
    g.NodeLayer
      Node(
        v-for="node in nodes",
        :key="node.id",
        :model="node",
        @selected="select(node.id)"
      )
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Node from 'components/Node';

export default {
  computed: {
    ...mapGetters('workflow/node', {
      nodes: 'listAll'
    })
  },
  methods: {
    ...mapActions('workflow/node', [
      'select',
      'deselectAll'
    ])
  },
  components: {
    Node
  }
}
</script>

<style lang="stylus">
  .Workspace
    width 100%
    height 100%
    text
      user-select none
      cursor: default
</style>
