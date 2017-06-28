var Sequelize = require('sequelize');
var db = require('./_db');
var Place = require('./place');
const Hotel = require('./hotel')
const Restaurant = require('./restaurant')
const Activity = require('./activity')
let Day = db.define('day',{
    number: Sequelize.INTEGER
})

Day.belongsTo(Hotel)
Day.belongsToMany(Restaurant, {through:'day_restaurant'})
Day.belongsToMany(Activity, {through:'day_activity'})

module.exports = Day