const express = require('express');
const router = express.Router();
//models
const Movie = require('../models/Movie');

/* GET users listing. */
router.post('/', (req, res, next) => {
  const {title, imbd_score, category, year, country} =req.body;

  const movie = new Movie({
    title:title,
    imbd_score:imbd_score,
    category:category,
    year:year,
    country:country
  });
//eski tip save etme
  // movie.save((err,data)=>{
  //   if(err)
  //     res.json(err);
  //   res.json(data);
  // });
  const promise = movie.save();
  promise.then((data)=>{
    res.json(data);
  }).catch( (err)=>{
    res.json(err);
  });
});

module.exports = router;
