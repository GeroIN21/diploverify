const express = require('express');
const { StudentDiplomas } = require('../models');
const request = require('request');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();

require('dotenv').config();

/**
 * Receiving info about diplomas; 
 * Route: [<host>:/diplomas/] 
 * 
 * */
router.post('/', async function (req, res) {
  try {

    // Secret key
    const sectretKey = process.env.RECAPTCHA_SECRET;

    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${sectretKey}&response=${req.body.Captcha}&remoteip=${req.connection.remoteAddress}`;

    request.post(verifyUrl, (err, response, body) => {

      body = JSON.parse(body);

      // If not successfull
      if (body.success !== undefined && !body.success) {

        response.status(400).json({ 
          'success': false,        
          'msg': 'Failed captcha verification' }).send();
      }

    });

    const diplomasInfo = await StudentDiplomas.findOne({
      attributes: ['Serie', 'StudName', 'Specialty', 'Institution', 'EndingYear'],
      where: {
        Serie: req.body.Serie,
        EndingYear: req.body.Year,
        StudName: { 
          [Op.like]: req.body.StudName + '%'
        },        
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