'use strict';
/* global $ tripModule */

$(function() {
  // async make db requests
  // promise.all()
  // then do the two lines below
  days = days.sort((a, b) => {return a.number - b.number}).map(dayModule.create)
  tripModule.load()
});
