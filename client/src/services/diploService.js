import Api from '@/services/api';

export default {

  // Used for check of the diploma
  // checkDipInfo(params) {
  //   return Api().get('/diplomas', params);
  // },

  // Used for check of the diploma with the response detailed information
  getDipInfo(params) {

    return Api().post('/diplomas', {
      Captcha: params.Captcha,
      StudName: params.StudName,
      Serie: params.Serie,
      Year: params.Year
    });

  }

};