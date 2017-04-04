

// TODO should add politeness meta.
var pleaseTellMe = {
    string: 'please tell me',
    reason: 'not intent'
}


function process (parseResult, textFragmentList) {

    // todo convert to data driven.
    if (textFragmentList.length > 3) {
        if (textFragmentList[0].strings[0] === 'please' &&
            textFragmentList[1].strings[0] === 'tell' &&
            textFragmentList[2].strings[0] === 'me') {

            textFragmentList.splice(0,3);
            parseResult.ignored.push(pleaseTellMe);
        }
    }

    return textFragmentList;
}


module.exports.process = process;
