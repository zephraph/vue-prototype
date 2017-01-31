<template lang="pug">
  .CreateNodeMenu
    Menu-Section(title="Create Node")
      Menu-Field(label="Name", :action="createNode")
</template>

<script>
import MenuField from 'components/Menu/Field';
import MenuSection from 'components/Menu/Section';

export default {
  components: {
    MenuField,
    MenuSection
  },
  methods: {
    createNode(name) {
      this.$store.dispatch('workflow/node/create', { name });
    }
  }
}
</script>

<style lang="stylus">
</style>
