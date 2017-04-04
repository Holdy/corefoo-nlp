var textFragment = require('./textFragment');
var manipulationType = require('./manipulationType');

// takes original input and splits down by tokenizing rules.
function process(inputText) {
    var topLevelFragment = textFragment.create([inputText], 0, null);
    var result = [];

    var split = inputText.split(' ');
    split.forEach(function(tokenString) {
        var token = textFragment.create([tokenString], 1, manipulationType.tokenised);
        token.parent = topLevelFragment;
        result.push(token);
    });

    return result;
}


function splitWords(inputString) {
    return inputString.split(' ');
}

module.exports.splitWords = splitWords;


module.exports.process = process;
