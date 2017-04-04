
var timeframe_currently = {
    'name': 'currently'
}
Object.freeze(timeframe_currently);

var timeframe_today = {
    'name': 'today'
};
Object.freeze(timeframe_today);

var timeframes = {
    'currently': timeframe_currently,
    'today' : timeframe_today
};
Object.freeze(timeframes);

module.exports.timeframes = timeframes;
