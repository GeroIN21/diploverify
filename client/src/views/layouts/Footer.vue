<template>
  <v-toolbar
    height="75px"
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-flex
        py-3
        text-xs-center
        white--text
        xs12
      >
        &copy;2019 — <strong>Министерство Образования и Науки Кыргызской Республики</strong>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style lang='scss'>

  .v-toolbar__content {
    background-color: #092470;
  }
  
</style>
