'use strict';
/* global $ tripModule */
let dbPromise = Promise.all([$.get('/api/hotels'), $.get('/api/restaurants'), $.get('/api/activities'), $.get('/days')])

$(function () {

  dbPromise.then(([_hotels, _restaurants, _activities, _days]) => {
    hotels = _hotels;
    restaurants = _restaurants;
    activities = _activities;
    days = _days;

   attractionsModule.createEnhanced()


    // ***************************
    days = days.sort((a, b) => {
      return a.number - b.number
    }).map(dayModule.create)
    // ***************************
    tripModule.load()
  })

}());