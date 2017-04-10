// Wraps moment incase we move away from it.
var moment = require('moment');

function addDays(date, days) {
    var momentValue = moment(date);
    momentValue.add({'days':days});
    return momentValue.toDate();
}

module.exports.addDays = addDays;
