  var hotels
  var restaurants
  var activities


$.ajax({
    url: '/api/hotels',
    type: 'GET',
    dataType: 'json',
    async: false
})
.done(response => { hotels = response })

$.ajax({
    url: '/api/restaurants',
    type: 'GET',
    dataType: 'json',
    async: false
})
.done(response => { restaurants = response })

$.ajax({
    url: '/api/activities',
    type: 'GET',
    dataType: 'json',
    async: false
})
.done(response => { activities = response })

