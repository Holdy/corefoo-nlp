var expect = require('chai').expect;
var rewire = require('rewire');

var parser = rewire('../../../lib/parser/parser');

// who is on pull requests tomorrow.
// who was on pull requests last wednesday
// who is eating crisps, near a bus, in a dress.
/*

who
    on
        pull requests
            time-frame
                currently

considering
who
    on
          the A45
                between
                       J4 AND J6

                */


describe('NLP Parser - blocks', function() {

    var wrapWords = parser.__get__('prepareWrappedWords');

    it('should handle - who is online', function(done) {
        var inputText = 'who is online';
        /*
            content:who
               structure:is
                 content:online
         */
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(3);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('who');

        expect(result[1].isStructure).to.equal(true);
        expect(result[1].source.length).to.equal(1);
        expect(result[1].source[0].clean).to.equal('is');

        expect(result[2].isContent).to.equal(true);
        expect(result[2].source.length).to.equal(1);
        expect(result[2].source[0].clean).to.equal('online');

        done();
    });

    it('should handle - who likes cheese', function(done) {
        var inputText = 'who likes cheese';

        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
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

    it('should handle - What score did the revenant get on IMDB', function(done) {
        var inputText = 'what score did the revenant get on imdb';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));

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
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(3);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('who');

        expect(result[1].isStructure).to.equal(true);
        expect(result[1].source.length).to.equal(2);
        expect(result[1].source[0].clean).to.equal('is');
        expect(result[1].source[1].clean).to.equal('on');

        expect(result[2].isContent).to.equal(true);
        expect(result[2].source.length).to.equal(1);
        expect(result[2].source[0].clean).to.equal('prs');

        done();
    });

    it('should handle - who is on pull requests', function(done) {
        var inputText = 'who is on pull requests';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(3);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('who');

        expect(result[1].isStructure).to.equal(true);
        expect(result[1].source.length).to.equal(2);
        expect(result[1].source[0].clean).to.equal('is');
        expect(result[1].source[1].clean).to.equal('on');

        expect(result[2].isContent).to.equal(true);
        expect(result[2].source.length).to.equal(2);
        expect(result[2].source[0].clean).to.equal('pull');
        expect(result[2].source[1].clean).to.equal('requests');

        done();
    });

    it('should handle - prs', function(done) {
        var inputText = 'prs';
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(1);

        expect(result[0].isContent).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('prs');

        done();
    });

    it('should handle - what is the email address of dave', function(done) {
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

    it('should handle - what is the email address for dave', function(done) {
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


    it('should handle - what is daves email address', function(done) {
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
        var result = parser.__get__('wrappedWordsToPhaseOneBlocks')(wrapWords(inputText));
        expect(result).to.be.ok;
        expect(result.length).to.equal(2);

        expect(result[0].isStructure).to.equal(true);
        expect(result[0].source.length).to.equal(1);
        expect(result[0].source[0].clean).to.equal('play');

        expect(result[1].isContent).to.equal(true);
        expect(result[1].source.length).to.equal(3);
        expect(result[1].source[0].clean).to.equal('the');
        expect(result[1].source[1].clean).to.equal('barking');
        expect(result[1].source[2].clean).to.equal('dog');


        done();
    });

    it('should handle - list vms', function(done) {
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

    it('should handle - list my vms', function(done) {
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


    it('should handle - guid', function(done) {
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
