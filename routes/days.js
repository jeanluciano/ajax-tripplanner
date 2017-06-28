var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
const Day = require('../models/day')

router.get('/',function(req, res, next){
    Day.findAll({
        include: [{
            model: Restaurant
        }, {
            model: Activity
        }, {
            model: Hotel
        }]
    })
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

router.delete('/:number', function(req, res, next) {
    Day.findAll()
    .then(days => {return days.sort((a, b) => {return a.number - b.number})})
    .then(sortedDays => {
        let removalIdx = sortedDays.indexOf(req.day);
        let dayToRemove = sortedDays.splice(removalIdx, 1);
        sortedDays.forEach((day, i) => {
            const newNum = i + 1;
            day.update({
                number: newNum
            })
        })
        return dayToRemove[0].destroy();
    })
    .then(response => {
        res.status(200).send()
    });
})

router.post('/:number/restaurants', function(req, res, next){
    Restaurant.find({
        where: {
            name: req.body.name
        }
    })
    .then(restObj => {
        req.day.addRestaurant(restObj)
        .then(result => {
            res.status(201).send()
        })
    })
    .catch(next)
})

router.delete('/:number/restaurants', function(req, res, next){
    Restaurant.find({
        where: {
            name: req.body.name
        }
    })
    .then(restObj => {
        req.day.removeRestaurant(restObj)
        .then(result => {
            res.status(200).send()
        })
    })
    .catch(next)
})

router.post('/:number/activities', function(req, res, next){
    Activity.find({
        where: {
            name: req.body.name
        }
    })
    .then(actObj => {
        req.day.addActivity(actObj)
        .then(result => {
            res.status(201).send()
        })
    })
    .catch(next)
})

router.delete('/:number/activities', function(req, res, next){
    Activity.find({
        where: {
            name: req.body.name
        }
    })
    .then(actObj => {
        req.day.removeActivity(actObj)
        .then(result => {
            res.status(200).send()
        })
    })
    .catch(next)
})

router.post('/:number/hotels', function(req, res, next){
    Hotel.find({
        where: {
            name: req.body.name
        }
    })
    .then(hotelObj => {
        req.day.setHotel(hotelObj)
        .then(result => {
            res.status(201).send()
        })
    })
    .catch(next)
})

router.delete('/:number/hotels', function(req, res, next){
    req.day.setHotel(null)
})


module.exports = router;
