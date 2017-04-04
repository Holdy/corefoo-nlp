"strict on";
var tokenizer = require('./tokenizer');
var phraseData = require('./phraseData.json');
var textFragment = require('./textFragment');
var manipulationType = require('./manipulationType');

// Take a list of original words and collapse / expand
// expand first
// TODO take ',' comma and 'semi' exclamation and apos (and &) as own tokens.
var expansions = {
    'who\'s': ['who', 'is'],
    'whos': ['who', 'is'],
    'im': ['i', 'am'],
    'i\'m': ['i', 'am']
};

function expandContractions(wrappedWords) {
    var result = [];
    var expansion = null;

    wrappedWords.forEach(function(wrappedWord) {
        if (wrappedWord.strings.length > 1) {
            throw new Error('multiple strings are not expected at this point');
        }
        expansion = expansions[wrappedWord.strings[0]];
        if (expansion) {
            expansion.forEach(function(newWord) {
                var expandedItem = textFragment.create([newWord], wrappedWord.manipulationCount+1, manipulationType.contractionExpanded );
                expandedItem.parent = wrappedWord;
                result.push(expandedItem);
            });
        } else {
            result.push(wrappedWord);
        }
    });
    return result;
}


var firstWordToPhraseMap = {};
function processPhraseData() {
    Object.keys(phraseData).forEach(function(key) {
        var dataArray = phraseData[key];
        dataArray.forEach(function(phrase) {
            var phraseWordList = tokenizer.splitWords(phrase);
            var firstWord = phraseWordList[0];
            var data = {
                words: phraseWordList,
                clean: key
            }
            var entry = firstWordToPhraseMap[firstWord];
            if (!entry) {
                firstWordToPhraseMap[firstWord] = [data];
            } else {
                entry.push(data);
            }
        });

    });
}
processPhraseData();

function matchesPhrase(wrappedWords, startIndex, wordList) {
    var lastWordIndex = startIndex + (wordList.length - 1);

    if (lastWordIndex < wrappedWords.length) {
        var result = true;
        var wordIndex = 0;
        for(var i = startIndex; i <= lastWordIndex; i++) {
            if (wrappedWords[i].strings[0] !== wordList[wordIndex++]) {
                result = false;
                break;
            }
        }
        return result;
    } else {
        return false; // wrappedWords not long enough to match.
    }
}

function findMatchingPhrase(wrappedWords, startIndex) {
    var result = null;
    var startWord = wrappedWords[startIndex];
    var possiblePhrases = firstWordToPhraseMap[startWord.strings[0]];
    if (possiblePhrases) {
        for (var i = 0; i < possiblePhrases.length; i++) {
            if (matchesPhrase(wrappedWords, startIndex, possiblePhrases[i].words)) {
                result = possiblePhrases[i];
                break;
            }
        }
    }
    return result;
}

function handleContractions(wrappedWords) {
    var result = [];

    var i = 0;
    while (i < wrappedWords.length) {
        var phrase = findMatchingPhrase(wrappedWords, i);
        if (phrase) {
            var maxManipulationCount = 0;
            var collapsedFragments = [];
            for (var x = i ; x < i + phrase.words.length; x++) {
                var collapsedFragment = wrappedWords[x];
                if (collapsedFragment.manipulationCount > maxManipulationCount) {
                    maxManipulationCount = collapsedFragment.manipulationCount;
                }
                collapsedFragments.push(collapsedFragment);
            }

            var newTextFragment = textFragment.create([phrase.clean], maxManipulationCount+1, manipulationType.phraseCollapsed );
            newTextFragment.parents = collapsedFragments;

            result.push(newTextFragment);

            i = i + (phrase.words.length);
            // Remove matching word count and replace with single word.
        } else {
            result.push(wrappedWords[i]);
            i++;
        }
    }
    return result;
}

function process(wrappedWordList) {
    var alteredList = expandContractions(wrappedWordList);
    alteredList = handleContractions(alteredList);

    return alteredList;
}

module.exports.process = process;

