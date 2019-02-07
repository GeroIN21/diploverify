<template functional>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
          <div class="layout my-3 align-center justify-space-between-wrap" primary-title>
            <div class="flex display-4 font-weight-black">404</div>
          </div>
          <v-card-text>
            Похоже, ты на неизведанной территории. Мы еще не знаем об этой странице.
            К счастью, мы знаем дорогу назад.
          </v-card-text>
          <v-card-actions>
            <v-btn flat class="red darken-3 white--text" to="/">Назад</v-btn>
          </v-card-actions>
      </v-flex>
    </v-layout>
  </v-container>
</template>