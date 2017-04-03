var treeBuilder = require('./treeBuilder');
/*

    Chop input string into words.

    using passed dictionary, check words are known - create possibilities.

    first pass parsing high level - binary breaks.



 */

// content / structure.
var blockType = {
    'who': 'who',
    'what': 'what',
    'structure': 'structure'
};

var structureWords = {
    'did': {},
    'get': {},
    'on':  {},
    'of':  {},
    'for': {}
};

var verbWords = {
    'play': {},
    'list': {}

};

function isStructureWord(wrappedWord) {
    return structureWords[wrappedWord.clean] ? true : false;
}

function isVerb(wrappedWord) {
    return verbWords[wrappedWord.clean] ? true : false;
}

// Intent not Part-of-speech, Part-of-intent.
function wrappedWordsToPhaseOneBlocks(wrappedWordList) {
    var resultList = [];

    for (var i = 0; i < wrappedWordList.length; i++) {
        var wrappedWord = wrappedWordList[i];

        if (i === 0) { // First word.
            if (isVerb(wrappedWord)) {
                resultList.push({
                    'isStructure': true,
                    'source': [wrappedWord]
                });
                continue;
            }
            else if (wrappedWord.clean === 'who') {
                resultList.push({
                    'type': blockType.who,
                    'isQuery': true,
                    'isContent': true,
                    'source': [wrappedWord]
                });
                continue;
            } else if (wrappedWord.clean === 'what') {
                resultList.push({
                    'type': blockType.what,
                    'isQuery': true,
                    'isContent': true,
                    'source': [wrappedWord]
                });
                continue;
            }
        }
        if (wrappedWord.clean === 'likes' || wrappedWord.clean === 'liked') {
            resultList.push({
                'type': blockType.structure,
                'isLike': true,
                'isStructure': true,
                'source': [wrappedWord]
            });
        } else if (isStructureWord(wrappedWord)) {
            resultList.push({
                'type': blockType.structure,
                'isStructure': true,
                'source': [wrappedWord]
            });
        } else if (wrappedWord.clean === 'is') {
            var lastItem = null;
            if (resultList.length > 0) {
                lastItem = resultList[resultList.length - 1];
            }

            if (lastItem && lastItem.isStructure) {
                // we will append to this.
            } else {
                lastItem = {
                    'type': blockType.structure,
                    'isStructure': true,
                    'source': []
                };
                resultList.push(lastItem);
            }

            lastItem.source.push(wrappedWord);

        } else {
            // we assume the word is content - can be added to ongoing content.
            var lastItem = null;
            if (resultList.length > 0) {
                lastItem = resultList[resultList.length - 1];
            }

            if (lastItem && lastItem.isContent) {
                // we will append to this.
            } else {
                lastItem = {
                    'type': blockType.content,
                    'isContent': true,
                    'source': []
                };
                resultList.push(lastItem);
            }


            lastItem.source.push(wrappedWord);
        }


    }

    collapseStructure(resultList); // collapse into 'is' < structure.

    resultList.forEach(function(item) {
        var name = item.isStructure ? 'structure: ' : 'content: ';
        var words = item.source.map(function(wrapped) { return wrapped.clean});
        name += words.join(' ');
        item.name = name;
    });

    return resultList;
}



function collapseStructure (resultList) {
    // 'is' structure can consume next structure.
    for (var i = 0; i < resultList.length; i++) {
        if (resultList[i].isStructure && resultList[i].source[0].clean === 'is') {
            var item = resultList[i];
            if (i+1 < resultList.length && resultList[i+1].isStructure) {
                var collapse = resultList[i+1];
                resultList.splice(i+1,1);
                for (var j = 0; j < collapse.source.length; j++) {
                    item.source.push(collapse.source[j]);
                }
            }
        }
    }

}

// split and clean
function prepareWrappedWords(inputString) {
    var words = inputString.split(' ');
    var wrappedWordList = words.map(function(word) {
        return {'original': word, 'clean': word};
    });

    return wrappedWordList;
}

function parse(inputString) {
    var wrappedWordList = prepareWrappedWords(inputString);

    var phaseOneBlockList = wrappedWordsToPhaseOneBlocks(wrappedWordList);

    return treeBuilder.buildTree(phaseOneBlockList);

}


module.exports.parse = parse;
