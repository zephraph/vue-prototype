<template lang="pug">
  Layout
    Workspace
    SideBar(slot="right")
      CreateNodeMenu
</template>

<script>
import Workspace from 'components/Workspace';
import Layout from 'components/Layout';
import SideBar from 'components/SideBar';
import CreateNodeMenu from 'components/Menus/CreateNodeMenu';

export default {
  name: 'Home',
  methods: {
    createNode(name) {
      this.$store.dispatch('workflow/node/create', { name });
    }
  },
  components: {
    Workspace,
    Layout,
    SideBar,
    CreateNodeMenu
  }
}
</script>

<style lang="stylus">
</style>
