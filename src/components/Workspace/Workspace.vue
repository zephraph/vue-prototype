<template lang="pug">
  svg.Workspace
    g.NodeLayer
      Node(
        v-for="node in nodes",
        :key="node.id",
        :model="node",
        @selected="selectNode(node.id)"
      )
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Node from 'components/Node';

export default {
  computed: {
    ...mapGetters('workflow', {
      nodes: 'listNodes'
    })
  },
  methods: {
    ...mapActions('workflow', [
      'selectNode'
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
