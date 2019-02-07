<template>
  <v-form id='i-recaptcha' v-model='valid'>
    <v-container grid-list-md>
      
      <v-layout row wrap>

          <v-flex xs12>
            <v-text-field
              class='px-0'
              v-model='diploSerial'
              :rules='serialRules'
              :counter='11'
              label='Номер диплома'
              placeholder='XX123456789'
              required
              outline
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-select 
              class='px-0'
              v-model='selectedYear'
              :items='years'
              item-value='year'
              label='Выберите год' 
              required
              outline
              ></v-select>
          </v-flex>

          <v-flex xs3>
            <v-btn 
              class='submit' 
              color='light-blue lighten-1' 
              @click.native='submit()'
              >Проверить</v-btn>
          </v-flex>

      </v-layout>
      
    </v-container>
  </v-form>
</template>

<script>
'use strict';

import DiploService from '../services/diploService.js';
import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, { siteKey: '6LcDqI8UAAAAAMLdGhtLhotf6YoDfXKOQnY0anJE' })

export default {
  data: () => ({
    valid: false,
    years: [ { year: '', } ],
    selectedYear: [],
    diploSerial: '',
    serialRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 11) || 'Номер должен быть не более 11 символов'
    ],
    // email: '',
    // emailRules: [
    //   v => !!v || 'E-mail is required',
    //   v => /.+@.+/.test(v) || 'E-mail must be valid'
    // ]
  }),

  methods: {

    async submit() {
      try { 

        let Captcha;

        await this.$recaptcha('login').then((token) => {
          Captcha = token;
        })

        const response = await DiploService.getDipInfo({
          Captcha: Captcha,
          Serie: this.diploSerial,
          Year: this.selectedYear
        });

      } catch (error) {
        // custom console
        console.error('Server error: ', error);        
      }
    }, 

    yearsFill() {
      let d = new Date();
      let yLenth = d.getFullYear() - 2004;
      let obj = [{year: ''}];

      for (let index = 0; index <= yLenth; index++) {
        obj[index] = 2004 + index;
      }
      Object.assign(this.years, obj);      
    }

  },
  computed: {
    endingYear() {
    return this.marketplace && this.marketplace.hasOwnProperty('value') ? this.marketplace.value : 0;
  }
  },
  created() {
    this.yearsFill();
  },
  mounted() {
  
  },

};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.d-form {
    //background-color: $background-color;
    padding: 15px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 340px;
    //animation: slideInFromLeft 1s forwards ease;
  }
</style>
