var textFragmentLib = require('./textFragment');
var manipulationType = require('./manipulationType');

var swapMap = {
    'tomoz' :    {'string': 'tomorrow', 'reason': 'abbreviation'},
    'tommorrow': {'string': 'tomorrow', 'reason': 'misspelling'},
    'tommorow':  {'string': 'tomorrow', 'reason': 'misspelling'}
};


function process(parseResult, textFragments) {
    var result = [];

    for (var i = 0; i < textFragments.length; i++) {
        var fragment = textFragments[i];
        var newFragment = null;

        if (fragment.strings.length === 1) {
            var swapData = swapMap[fragment.strings[0]];
            if (swapData) {
                var newFragment = textFragmentLib.create([swapData.string], fragment.manipulationCount+1, manipulationType.wordSubstitution);
                newFragment.parent = fragment;
                parseResult.changes.push({'change': manipulationType.wordSubstitution, 'original': fragment.strings[0], 'data': swapData});
            }
        }

        if (newFragment) {
            result.push(newFragment);
        } else {
            result.push(fragment);
        }
    }

    return result;
}

module.exports.process = process;
