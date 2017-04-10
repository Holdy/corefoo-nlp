var dateManipulation = require('../util/dateManipulation');

function createTimeframe(startDate, endDate) {
    var result = new Timeframe();
    result.start = startDate;
    result.end = endDate;

    if (startDate === endDate) {
        result.date = startDate;
    }

    return result;
}

// result will contain either an error message or
// an array of timeframes .
function interpret(wordList, referenceDate) {
    var result = {
        timeframes: []
    };

    if (!referenceDate) {
        referenceDate = new Date();
    }

    if (wordList[0] === 'today') {
        result.timeframes.push(createTimeframe(referenceDate, referenceDate));
    } else if (wordList[0] === 'tomorrow') {
        var requiredDate = dateManipulation.addDays(referenceDate, 1);
        result.timeframes.push(createTimeframe(requiredDate, requiredDate));
    } else if (wordList[0] === 'yesterday') {
        var requiredDate = dateManipulation.addDays(referenceDate, -1);
        result.timeframes.push(createTimeframe(requiredDate, requiredDate));
    } else {
        throw new Error('Not implemented');
    }

    return result;
}

function Timeframe() {

}


module.exports.interpret = interpret;
