<template>
  <v-form id='i-recaptcha' v-model='valid'>
    <v-container grid-list-md>
      
      <v-layout row wrap>

      <v-flex xs12 sm6 offset-sm3>
        
        <v-card xs12>

          <v-card-title primary-title>
            <div>
              <div class="headline">Проверка подлинности диплома</div>
              <span class="grey--text">В данном разделе, Вы можете проверить диплом,
                 указав номер диплома и год окончания обучения</span>
            </div>
          </v-card-title>

          <!-- Submit form -->
          <v-flex v-if="!submit_unvisible">
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
                :rules="yearRules" 
                item-value='year'
                label='Выберите год' 
                required
                outline
                ></v-select>
            </v-flex>

            <v-flex xs3 offset-sm4>
              <v-btn 
                class='submit' 
                color='info darken-3' 
                @click.native='submit()'
                >Проверить</v-btn>
            </v-flex>

            <v-alert
              dismissible
              v-model="regWarning"
              v-if="!warning"
              type="warning"
              transition="scale-transition"
              outline
            >
              {{ warning }}
            </v-alert>

          </v-flex>

          <!-- If diploma is non-valid -->
          <v-flex v-if="!request_success && submit_unvisible" xs12>

            <v-flex xs3 offset-sm4>
              <svg id="icon__false" xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 398.32 398.32">
              <path d="M0,199.4C-.43,94.33,81.38,8.31,182.89.62c119.54-9.06,208.27,82.82,215,183.72C405.75,303.69,313.44,392,211.55,398,96.05,404.75-.23,312.86,0,199.4Zm17-.4c0,98.07,77.17,177.76,173.33,182.06A181.81,181.81,0,0,0,381.25,203.53C383.47,101,303.6,21.85,208.64,17.15,101.59,11.86,16.78,97.64,17,199Z"></path>
              <path d="M269.76,249.21c-13.11-.28-24.57-6.35-34.2-16.2a29.78,29.78,0,0,1-5.84-8c-1.68-3.62.16-7.69,3.45-9.54,4-2.24,7.88-1.63,10.78,1.69,4.24,4.86,8.93,9.16,14.75,12.1,9.26,4.69,18.38,3.37,27.29-.9a55.28,55.28,0,0,0,16-11.49c3.44-3.56,7.65-3.81,11.17-.8,3.85,3.3,4.5,8.35,1.3,12.14-4.61,5.45-10.33,9.57-16.47,13.12A58.62,58.62,0,0,1,269.76,249.21Z"></path>
              <path d="M126.12,247.64c-12.77-.32-23.94-5.14-34.2-12.37a66.3,66.3,0,0,1-7.61-6.48c-3.6-3.46-3.5-8.27,0-11.87a8.11,8.11,0,0,1,11.88-.19c6.82,6.39,14.59,11.11,23.79,13.17,10.77,2.41,20.15-.7,28.52-7.47a62.89,62.89,0,0,0,5.72-5.27c3.43-3.56,7.79-4,11.42-1.06,3.95,3.22,4.68,8.23,1.41,12.08a55,55,0,0,1-16.71,13.2C142.8,245.31,134.82,247.87,126.12,247.64Z"></path>
              <path d="M299.61,161.1c-21-.61-41.1-5-60.08-14.05-3.78-1.81-7.08-4-6.65-9.14.51-6,6.79-9.92,12.12-7.17,14.37,7.4,29.71,11.23,45.7,12.74,4.61.43,9.24.73,13.87,1,5.15.26,8.05,3.31,8,8.62,0,5.11-3,8-8.22,8C302.77,161.11,301.19,161.1,299.61,161.1Z"></path>
              <path d="M98.7,162.2c21-.61,41.1-5,60.08-14.05,3.78-1.81,7.08-4,6.65-9.14-.51-6-6.79-9.92-12.12-7.17-14.37,7.4-29.71,11.23-45.7,12.74-4.61.43-9.24.73-13.87,1-5.15.26-8.05,3.31-8,8.62,0,5.11,3,8,8.22,8C95.54,162.22,97.12,162.2,98.7,162.2Z"></path><path d="M199,326.39c-8.55,0-17.1.05-25.65,0-4.33,0-7.29-2.81-7.88-7.09a8.47,8.47,0,0,1,5.3-9.09,9.27,9.27,0,0,1,3-.44q25.37,0,50.74,0c5.09,0,8.17,3.12,8.19,8.11,0,5.34-2.83,8.49-8,8.55-8.55.09-17.1,0-25.65,0Z"></path></svg>
            </v-flex>

            <v-card-title primary-title>
              <v-flex offset-md4>
                <div class="headline sad">Нет данных</div>
              </v-flex>              
            </v-card-title>
            
          </v-flex>

          <!-- If diploma is valid -->
          <v-flex v-if="request_success && submit_unvisible" align-center xs12>

            <v-flex xs4 offset-sm4>
              <svg viewBox="0 0 26 20" id="icon__checked" width="100%" height="100%">
                <path d="M22.9.3c.4-.4 1-.4 1.4 0l1.4 1.4c.4.4.4 1 0 1.4l-16 16.6c-.2.2-.4.3-.7.3s-.5-.1-.7-.3L.5 11.3.3 11c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l1.4-1.4c.4-.4 1-.4 1.4 0l.1.1 5.5 5.9c.2.2.5.2.7 0">
                  </path>
              </svg>
            </v-flex>

            <v-card-title primary-title>
              <v-flex offset-md3>
                <div class="headline happy">Диплом действительный</div>
              </v-flex>

              <v-layout xs1 align-center column fill-height>
                <div> ФИО: {{ studName }} </div>
                <div> Специальность: {{ specialty }} </div>
                <div> Уч.заведение:  {{ institution }} </div>
                <div> Год окончания: {{ endingYear }} </div>
              </v-layout>                            
            </v-card-title>

          </v-flex>

          <template>
            <v-progress-linear :indeterminate="in_process" color="info darken-3"></v-progress-linear>
          </template>

        </v-card>

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
    submit_unvisible: false,
    request_success: false,
    in_process: false,
    valid: false,
    warning: '',
    regWarning: false,
    years: [ { year: '', } ],
    selectedYear: [],
    diploSerial: '',
    studName: '',
    specialty: '',
    institution: '',
    endingYear: '',
    rules: [ (value) => !!value || 'Это обязательное поле' ],
    serialRules: [
      v => !!v || 'Заполните это поле',
      v => (v && v.length >= 11) || 'Номер должен быть не менее 11 символов',
      v => (v && v.length <= 11) || 'Номер должен быть не более 11 символов',
    ],
    yearRules: [
      v => !!v || 'Выберите год'
    ],
    ///////
    // email: '',
    // emailRules: [
    //   v => !!v || 'E-mail is required',
    //   v => /.+@.+/.test(v) || 'E-mail must be valid'
    // ]
  }),

  methods: {

    async submit() {
      
      // Temporary crutch
      if (!this.diploSerial || !this.selectedYear)
      {
        this.regWarning = true;
        this.warning = 'Заполните все поля!';
        return 0;
      }

      this.in_process = true;

      try { 

        let Captcha;
        await this.$recaptcha('login').then((token) => {
          Captcha = token;
        })

        let response = await DiploService.getDipInfo({
          Captcha: Captcha,
          Serie: this.diploSerial,
          Year: this.selectedYear
        });

        console.log(response);

        if (response.status === 200) {

          this.studName = response.data.StudName;
          this.endingYear = response.data.EndingYear;
          this.institution = response.data.Institution;
          this.specialty = response.data.Specialty;

          this.submit_unvisible = true;
          this.request_success = true;
          this.in_process = false;

        };

        if (response.status === 204) {

          this.submit_unvisible = true;
          this.request_success = false;
          this.in_process = false;

        };

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
    },

  },
  computed: {
    // endingYear() {
    //   return this.marketplace && this.marketplace.hasOwnProperty('value') ? this.marketplace.value : 0;
    // }
  },
  created() {
    this.yearsFill();
  },
  beforeUpdate() {
        
  }

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

  // Success && false verify styles
  #icon__checked {
    width: 140px;
    height: 110px;
    fill: #00c586;
  }

  .happy {
    color: #00c586;
  }

  #icon__false {
    width: 140px;
    height: 110px;
    fill: #e93333;
  }

  .sad {
    color: #e93333;
  }
  // -------------------

  .d-form {
      //background-color: $background-color;
      padding: 15px;
      margin: 45px auto;
      min-width: 272px;
      max-width: 340px;
      //animation: slideInFromLeft 1s forwards ease;
    }

  .v-btn__content {
    color: #1F5A9D;
  }
</style>
