<template lang="pug">
  Dock
    Workspace
      Node(title="hello world")
    SideBar(slot="right")
      Menu-Section(title="Test Section")
</template>

<script>
import Workspace from 'components/Workspace';
import Node from 'components/Node';
import Dock from 'components/Dock';
import SideBar from 'components/SideBar';
import MenuSection from 'components/Menu/Section';

export default {
  components: {
    Workspace,
    Node,
    Dock,
    SideBar,
    MenuSection
  }
}
</script>

<style lang="stylus">
</style>
