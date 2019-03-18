const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//models
const director = require('../models/Directors');
/* GET users listing. */
//tüm yönetmenler
router.get('/',(req,res)=>{
  const promise = director.aggregate([
    {
      $lookup: {
        from:'movies',
        localField: '_id',
        foreignField: 'director_Id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio',

        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies:'$movies'
      }
    }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});
//id bazlı yönetmen arama
router.get('/:director_Id',(req,res)=>{
  const promise = director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_Id)

      }
    },
    {
      $lookup: {
        from:'movies',
        localField: '_id',
        foreignField: 'director_Id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio',

        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies:'$movies'
      }
    }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});
/* PUT users listing*/
//director güncelleme

router.put('/:director_Id',(req,res, next)=>{
  const promise =director.findByIdAndUpdate(
      req.params.director_Id,
      req.body,
      {
        new:true
      }
  );

  promise.then((director) =>{
    if (!director)
      next({message:'director was not found'});
    res.json(director);
  }).catch((err) =>{
    res.json(err);
  });
});
//DELETE users listing
router.delete('/:director_Id',(req,res, next)=>{
  const promise =director.findByIdAndRemove(req.params.director_Id);

  promise.then((director) =>{
    if (!director)
      next({message:'director was not found', code:99});
    res.json(director);
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
