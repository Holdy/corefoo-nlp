var treeBuilder = require('./treeBuilder');
var tokenizer = require('./tokenizer');
var phraseHandler = require('./phraseHandler');
var simplifier = require('./simplifier');
var misspellingsAndSlang = require('./misspellingsAndSlang');
/*

    Chop input string into words.

    using passed dictionary, check words are known - create possibilities.

    first pass parsing high level - binary breaks.

 */

// Done

// Intros (eg 'please tell me...' removed by simplifier.
// phrase handling 'kick the bucket'

// TODO
// ensure that if the user is asking about a phrase - eg 'kick the bucket'
//    that either it isn't simplified - or that we expand the minature.
//     node should provide getOriginalText and getCleanText()

// handle hyperbole 'my absolute faviourite' (although could affect strength).
// entity marking - london etc.
// relative entity marking (today /tomorrow) April. two days from now.


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
    return structureWords[wrappedWord.string] ? true : false;
}

function isVerb(wrappedWord) {
    return verbWords[wrappedWord.string] ? true : false;
}

function textFragmentsToWrappedWords(textFragmentList) {
    var wrappedWordList = [];

    textFragmentList.forEach(function(textFragment) {
        textFragment.strings.forEach(function(stringValue) {
            var wrappedWord = {
                'string': stringValue,
                'textFragment': textFragment
            };
            wrappedWordList.push(wrappedWord);
        });

    });

    return wrappedWordList;
}


function textFragmentsToPhaseOneBlocks(wrappedWordList) {
    var resultList = [];

    wrappedWordList = textFragmentsToWrappedWords(wrappedWordList);

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
            else if (wrappedWord.string === 'who') {
                resultList.push({
                    'type': blockType.who,
                    'isQuery': true,
                    'isContent': true,
                    'source': [wrappedWord]
                });
                continue;
            } else if (wrappedWord.string === 'what') {
                resultList.push({
                    'type': blockType.what,
                    'isQuery': true,
                    'isContent': true,
                    'source': [wrappedWord]
                });
                continue;
            }
        }
        if (wrappedWord.string === 'likes' || wrappedWord.string === 'liked' || wrappedWord.string === 'happens') {
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
        } else if (wrappedWord.string === 'is') {
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
        var words = item.source.map(function(wrapped) { return wrapped.string});
        name += words.join(' ');
        item.name = name;
    });

    return resultList;
}



function collapseStructure (resultList) {
    // 'is' structure can consume next structure.
    for (var i = 0; i < resultList.length; i++) {
        if (resultList[i].isStructure && resultList[i].source[0].string === 'is') {
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

function ParseResult () {
    this.ignored = [];
    this.changes = [];
}

function parse(inputString) {
    var parseResult = new ParseResult();

    var textFragments = tokenizer.process(inputString);

    textFragments = phraseHandler.process(textFragments);

    textFragments = simplifier.process(parseResult, textFragments);

    textFragments = misspellingsAndSlang.process(parseResult, textFragments);

    var phaseOneBlockList = textFragmentsToPhaseOneBlocks(textFragments);

    parseResult.intentTree = treeBuilder.buildTree(phaseOneBlockList);

    return parseResult;
}




module.exports.parse = parse;
