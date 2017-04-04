var expect = require('chai').expect;

function check(item, isStructure, cleanWordList, childCount) {
    if (isStructure) {
        expect(item.isStructure).to.equal(true);
    } else {
        expect(item.isContent).to.equal(true);
    }

    var words = item.source.map(function(wrappedWord) {return wrappedWord.string});
    expect(cleanWordList).to.eql(words);

    if (childCount === 0 && !item.children) {
        // thats fine.
    } else {
        expect(item.children.length).to.equal(childCount);
    }
}


module.exports.check = check;
