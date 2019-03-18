const express = require('express');
const router = express.Router();
//models
const Movie = require('../models/Movie');
/* GET users listing. */
router.get('/',(req,res)=>{
  const promise = Movie.aggregate([
      {
          $lookup: {
              from:'directors',
              localField: 'director_Id',
              foreignField: '_id',
              as: 'director'
          }
      },
      {
          $unwind: '$director'
      }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});
//TOP 10 list
router.get('/top10',(req,res)=>{
  const promise = Movie.find({ }).limit(10).sort({ imbd_score: -1});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});
router.get('/:movie_id',(req,res, next)=>{
  const promise =Movie.findById(req.params.movie_id);

  promise.then((movie) =>{
    if (!movie)
      next({message:'movie was not found'});
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});
/* PUT users listing*/
router.put('/:movie_id',(req,res, next)=>{
  const promise =Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new:true
      }
  );

  promise.then((movie) =>{
    if (!movie)
      next({message:'movie was not found'});
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});
//DELETE users listing
router.delete('/:movie_id',(req,res, next)=>{
  const promise =Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) =>{
    if (!movie)
      next({message:'movie was not found', code:99});
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});
/* POST users listing. */
router.post('/', (req, res, next) => {
  const {title, imbd_score, category, year, country} =req.body;

  const movie = new Movie({
    title:title,
    imbd_score:imbd_score,
    category:category,
    year:year,
    country:country
  });
  const promise = movie.save();
  promise.then((data)=>{
    res.json(data);
  }).catch( (err)=>{
    res.json(err);
  });
});

// Between routes
router.get('/between/:start_year/:end_year',(req,res)=>{
    const {start_year, end_year} = req.params;
    const promise = Movie.find({
        year:{"$gte":parseInt(start_year), "$lte": parseInt(end_year) }
    });
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});
module.exports = router;
