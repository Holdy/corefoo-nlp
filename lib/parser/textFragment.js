

function TextFragment(strings, manipulationCount, manipulationType) {
    this.strings = strings;
    this.manipulationCount = manipulationCount;
    if (manipulationType) {
        this.manipulationType = manipulationType;
    }
}


function create(strings, manipulationCount, manipulationType) {
    var result = new TextFragment(strings, manipulationCount, manipulationType);
    return result;
}

module.exports.create = create;
