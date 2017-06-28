var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
const Day = require('../models/day')

router.get('/',function(req, res, next){
    Day.findAll()
        .then(days =>{
            res.send(days)
        })
        .catch(next)
})

router.post('/', function(req, res , next){
    Day.create({
        number: req.body.number
    })
    .then(day => {
        res.send(day)
    })
})



router.param('number', function(req, res, next, number){
    console.log('inside param')
    Day.findOne({
        where : {
            number: number
        }
    })
    .then(function(day){
        req.day = day
        next()
    })
    .catch(next)
})

router.post('/:number/restaurants', function(req, res, next){
    req.day.setRestaurants(req.body)
    
 
})








module.exports = router;