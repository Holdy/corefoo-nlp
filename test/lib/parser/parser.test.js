var expect = require('chai').expect;

var parser = require('../../../lib/parser/parser');

/// where is bob currently
// where was bob last wednesday.
// where will bob be on friday.
// who are the visitors.
// which email address belongs to dave.
describe('NLP Parser - treeBuilder', function() {

    function process(inputText) {
        return parser.parse(inputText);
    }

    function nodeCount(item) {
        return 1 + childCount(item);
    }

    function childCount(item) {
        var children = item.children;
        if (children) {
            var result = 0;
            children.forEach(function(child) {
                result += nodeCount(child);
            });
            return result;
        } else {
            return 0;
        }
    }

    function check(item, isStructure, cleanWordList, childCount) {
        if (isStructure) {
            expect(item.isStructure).to.equal(true);
        } else {
            expect(item.isContent).to.equal(true);
        }

        var words = item.source.map(function(wrappedWord) {return wrappedWord.clean});
        expect(cleanWordList).to.eql(words);

        if (childCount === 0 && !item.children) {
            // thats fine.
        } else {
            expect(item.children.length).to.equal(childCount);
        }
    }


    it('should handle - who is online', function(done) {
        var inputText = 'who is online';
        var result = process(inputText);

        expect(result).to.be.ok;
        expect(nodeCount(result)).to.equal(3);

        check(result, false, ['who'], 1);
        check(result.children[0], true, ['is'], 1);
        check(result.children[0].children[0], false, ['online'], 0);

        done();
    });

    it.skip('should handle - who likes cheese', function(done) {
        var inputText = 'who likes cheese';

        var result = process(inputText);
        expect(result).to.be.ok;
        expect(result.length).to.equal(3);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('who');

        expect(result[1].isStructure).to.equal(true);
        expect(result[1].source.length).to.equal(1);
        expect(result[1].source[0].clean).to.equal('likes');

        expect(result[2].isContent).to.equal(true);
        expect(result[2].source.length).to.equal(1);
        expect(result[2].source[0].clean).to.equal('cheese');

        done();
    });

    it.skip('should handle - What score did the revenant get on IMDB', function(done) {
        var inputText = 'what score did the revenant get on imdb';
        var result = process(inputText);

        expect(result).to.be.ok;

        expect(result.length).to.equal(6);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(2);
        expect(result[0].source[0].clean).to.equal('what');
        expect(result[0].source[1].clean).to.equal('score');

        expect(result[1].isStructure).to.equal(true);
        expect(result[1].source.length).to.equal(1);
        expect(result[1].source[0].clean).to.equal('did');

        expect(result[2].isContent).to.equal(true);
        expect(result[2].source.length).to.equal(2);
        expect(result[2].source[0].clean).to.equal('the');
        expect(result[2].source[1].clean).to.equal('revenant');

        expect(result[3].isStructure).to.equal(true);
        expect(result[3].source.length).to.equal(1);
        expect(result[3].source[0].clean).to.equal('get');

        expect(result[4].isStructure).to.equal(true);
        expect(result[4].source.length).to.equal(1);
        expect(result[4].source[0].clean).to.equal('on');

        expect(result[5].isContent).to.equal(true);
        expect(result[5].source.length).to.equal(1);
        expect(result[5].source[0].clean).to.equal('imdb');

        done();
    });


    it('should handle - who is on prs', function(done) {
        var inputText = 'who is on prs';
        var result = process(inputText);

        expect(result).to.be.ok;
        expect(nodeCount(result)).to.equal(3);

        check(result, false, ['who'], 1);
        check(result.children[0], true, ['is', 'on'], 1);
        expect(result.children[0].prog).to.equal('assigned-to');
        check(result.children[0].children[0], false, ['prs'], 0);

        done();
    });

    it('should handle - who is on pull requests', function(done) {
        var inputText = 'who is on pull requests';
        var result = process(inputText);

        expect(result).to.be.ok;
        expect(nodeCount(result)).to.equal(3);

        check(result, false, ['who'], 1);
        check(result.children[0], true, ['is', 'on'], 1);
        expect(result.children[0].prog).to.equal('assigned-to');
        check(result.children[0].children[0], false, ['pull', 'requests'], 0);

        done();
    });

    it.skip('should handle - prs', function(done) {
        var inputText = 'prs';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(1);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('prs');

        done();
    });

    it.skip('should handle - what is the email address of dave', function(done) {
        var inputText = 'what is the email address of dave';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(5);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('what');

        expect(result[1].isStructure).to.equal(true);
        expect(result[1].source.length).to.equal(1);
        expect(result[1].source[0].clean).to.equal('is');

        expect(result[2].isContent).to.equal(true);
        expect(result[2].source.length).to.equal(3);
        expect(result[2].source[0].clean).to.equal('the');
        expect(result[2].source[1].clean).to.equal('email');
        expect(result[2].source[2].clean).to.equal('address');

        expect(result[3].isStructure).to.equal(true);
        expect(result[3].source.length).to.equal(1);
        expect(result[3].source[0].clean).to.equal('of');

        expect(result[4].isContent).to.equal(true);
        expect(result[4].source.length).to.equal(1);
        expect(result[4].source[0].clean).to.equal('dave');

        done();
    });

    it.skip('should handle - what is the email address for dave', function(done) {
        var inputText = 'what is the email address for dave';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(5);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('what');

        expect(result[1].isStructure).to.equal(true);
        expect(result[1].source.length).to.equal(1);
        expect(result[1].source[0].clean).to.equal('is');

        expect(result[2].isContent).to.equal(true);
        expect(result[2].source.length).to.equal(3);
        expect(result[2].source[0].clean).to.equal('the');
        expect(result[2].source[1].clean).to.equal('email');
        expect(result[2].source[2].clean).to.equal('address');

        expect(result[3].isStructure).to.equal(true);
        expect(result[3].source.length).to.equal(1);
        expect(result[3].source[0].clean).to.equal('for');

        expect(result[4].isContent).to.equal(true);
        expect(result[4].source.length).to.equal(1);
        expect(result[4].source[0].clean).to.equal('dave');

        done();
    });


    it.skip('should handle - what is daves email address', function(done) {
        var inputText = 'what is daves email address';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));

        expect(result).to.be.ok;
        expect(result.length).to.equal(3);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('what');

        expect(result[1].isStructure).to.equal(true);
        expect(result[1].source.length).to.equal(1);
        expect(result[1].source[0].clean).to.equal('is');

        expect(result[2].isContent).to.equal(true);
        expect(result[2].source.length).to.equal(3);
        expect(result[2].source[0].clean).to.equal('daves');
        expect(result[2].source[1].clean).to.equal('email');
        expect(result[2].source[2].clean).to.equal('address');

        done();
    });

    it('should handle - play the barking dog', function(done) {
        var inputText = 'play the barking dog';

        var result = process(inputText);

        expect(result).to.be.ok;
        expect(nodeCount(result)).to.equal(2);

        check(result, true, ['play'], 1);
        check(result.children[0], false, ['the','barking','dog'], 0);

        done();
    });

    it.skip('should handle - list vms', function(done) {
        var inputText = 'list vms';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(2);

        expect(result[0].isStructure).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('list');

        expect(result[1].isContent).to.equal(true);
        expect(result[1].source.length).to.equal(1);
        expect(result[1].source[0].clean).to.equal('vms');

        done();
    });

    it.skip('should handle - list my vms', function(done) {
        var inputText = 'list my vms';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(2);

        expect(result[0].isStructure).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('list');

        expect(result[1].isContent).to.equal(true);
        expect(result[1].source.length).to.equal(2);
        expect(result[1].source[0].clean).to.equal('my');
        expect(result[1].source[1].clean).to.equal('vms');

        done();
    });

    it.skip('should handle - list johns vms', function(done) {
        var inputText = 'list johns vms';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(2);

        expect(result[0].isStructure).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('list');

        expect(result[1].isContent).to.equal(true);
        expect(result[1].source.length).to.equal(2);
        expect(result[1].source[0].clean).to.equal('my');
        expect(result[1].source[1].clean).to.equal('vms');

        done();
    });


    it.skip('should handle - guid', function(done) {
        var inputText = 'guid';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(1);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('guid');

        done();
    });


});
