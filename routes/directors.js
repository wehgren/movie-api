const express = require('express');
const router = express.Router();
//models
const director = require('../models/Directors');
/* GET users listing. */
router.get('/',(req,res)=>{
  const promise = director.find({ });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});
router.get('/:director_id',(req,res, next)=>{
  const promise =director.findById(req.params.director_id);

  promise.then((movie) =>{
    if (!movie)
      next({message:'director was not found'});
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});
/* PUT users listing*/
router.put('/:director_id',(req,res, next)=>{
  const promise =director.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new:true
      }
  );

  promise.then((movie) =>{
    if (!movie)
      next({message:'director was not found'});
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
  const {name, surname, bio, createdAt} =req.body;

  const directors = new director ({
    name: name,
    surname:surname,
    bio: bio,
    createdAt:createdAt

  });
  const promise = directors.save();
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
