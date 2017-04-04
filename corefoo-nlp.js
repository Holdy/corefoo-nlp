var parser = require('./lib/parser/parser');

module.exports.lexicon = require('./lib/lexicon');

module.exports.intentTreeFromText = parser.parse;
module.exports.navigator = require('./lib/navigator');   // Deprecated.
module.exports.interpreter = require('./lib/navigator'); // Use this one.
