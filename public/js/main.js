'use strict';
/* global $ tripModule */

// var hotels
// var restaurants
// var activities
// var days;

$(function () {
  // async make db requests
  // promise.all()
  // then do the two lines below
  Promise.all([$.get('/api/hotels'), $.get('/api/restaurants'), $.get('/api/activities'), $.get('/days')])
    .then(([_hotels, _restaurants, _activities, _days]) => {
      hotels = _hotels;
      restaurants = _restaurants;
      activities = _activities;
      days = _days;

      enhanced = {
        hotels: hotels.map(attractionModule.create),
        restaurants: restaurants.map(attractionModule.create),
        activities: activities.map(attractionModule.create),
      };

      // page formerly know as options.js
      var $optionsPanel = $('#options-panel');
      var $hotelSelect = $optionsPanel.find('#hotel-choices');
      var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
      var $activitySelect = $optionsPanel.find('#activity-choices');

      // ***************************
      hotels.forEach(makeOption, $hotelSelect);
      restaurants.forEach(makeOption, $restaurantSelect);
      activities.forEach(makeOption, $activitySelect);
      // ***************************

      // make all the option tags (second arg of `forEach` is a `this` binding)


      function makeOption(databaseAttraction) {
        var $option = $('<option></option>') // makes a new option tag
          .text(databaseAttraction.name)
          .val(databaseAttraction.id);
        this.append($option); // add the option to the specific select
      }

      // what to do when the `+` button next to a `select` is clicked
      $optionsPanel.on('click', 'button[data-action="add"]', function () {
        var $select = $(this).siblings('select');
        var type = $select.data('type'); // from HTML data-type attribute
        var id = $select.find(':selected').val();
        // get associated attraction and add it to the current day in the trip
        var attraction = attractionsModule.getByTypeAndId(type, id);
        tripModule.addToCurrent(attraction);
      });

      // ***************************
      days = days.sort((a, b) => { return a.number - b.number }).map(dayModule.create)
      // ***************************
      tripModule.load()
    })



});
