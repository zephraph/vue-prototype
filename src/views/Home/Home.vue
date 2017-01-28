<template lang="pug">
  Dock
    Workspace
    SideBar(slot="right")
      Menu-Section(title="Create Node")
        Menu-Field(@submit="createNode")
</template>

<script>
import Workspace from 'components/Workspace';
import Dock from 'components/Dock';
import SideBar from 'components/SideBar';
import MenuSection from 'components/Menu/Section';
import MenuField from 'components/Menu/Field';

export default {
  methods: {
    createNode(name) {
      this.$store.dispatch('workflow/node/create', { name });
    }
  },
  components: {
    Workspace,
    Dock,
    SideBar,
    MenuSection,
    MenuField
  }
}
</script>

<style lang="stylus">
</style>
