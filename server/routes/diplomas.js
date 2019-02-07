const express = require('express');
const { StudentDiplomas } = require('../models');
const request = require('request');

const router = express.Router();

/**
 * Receiving half info about diplomas; 
 * Route: [<host>:/diplomas/] 
 * 
 * */
router.post('/', async function (req, res) {
  try {

    console.log('\nRequest body: ', req.body);

    // Secret key
    const sectretKey = '6LcDqI8UAAAAAMm0FGFXct5tj7PIIqYwl7oDFb5J';

    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${sectretKey}&response=${req.body.Captcha}&remoteip=${req.connection.remoteAddress}`;

    request.post(verifyUrl, (err, response, body) => {

      console.log('Verify URL: ', verifyUrl);
      console.log('Google captcha body: ', body);
      body = JSON.parse(body);

      // If not successfull
      if (body.success !== undefined && !body.success) {

        response.status(400).json({ 
          'success': false,        
          'msg': 'Failed captcha verification' }).send();
      }

    });

    const diplomasInfo = await StudentDiplomas.findOne({
      where: {
        Serie: req.body.Serie,
        EndingYear: req.body.Year
      },
    })

    if (diplomasInfo) {
      res.status(200).json(diplomasInfo).send();
    } else {
      res.status(204).send();
    }

  } catch (error) {

    console.error(error);
    res.status(500).send({
      error: 'An error has occurred trying to GET query'
    });

  }

});

module.exports = router;