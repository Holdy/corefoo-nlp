"strict on";
// Takes a sequence of structure/content word blocks from the parser
// and nests them into a tree structure.
var structureType = require('../definitions/structureType');
var references    = require('../definitions/references');
var basis         = require('../definitions/basis');

function addChild(parent, child) {
    if (child) {
        if (!parent.children) {
            parent.children = [];
        }
        parent.children.push(child);
    }
}

function StructureNode() {
    this.isStructure = true;
}

function ContentNode() {
    this.isContent = true;
}

function nodeForBlock(block) {
    var result = null;
    if (block.isStructure) {
        result = new StructureNode(block);
    } else {
        result = new ContentNode(block);
    }
    result.source = block.source;
    return result;
}

function buildTree(blockList) {

    var pointer = nodeForBlock(blockList[0]);
    var root = pointer;

    for (var i = 1; i < blockList.length; i++) {
        var block = nodeForBlock(blockList[i]);
        addChild(pointer,block);

        if (pointer.isStructure) {
            var source = pointer.source;
            if (source && source.length === 2) {
                if (source[0].string === 'is' && source[1].string === 'on') {
                    pointer.prog = 'assigned-to';
                }
            }
        }

        pointer = block;
    }

    setNames(root);

    ensureTimeframeForLeafContent(root);

    return root;
}

function setNames(treeNode) {
    var id = '';

    if (treeNode.source) {
        var words = treeNode.source.map(function(item) {
            return item.string;
        });
        id += 'source: ' + words.join(' ');
    }

    treeNode.id = id;

    if (treeNode.children && treeNode.children.length > 0) {
        treeNode.children.map(setNames);
    }


}

function ensureTimeframeForLeafContent(treeNode) {

    if (treeNode.children && treeNode.children.length > 0) {
        // not a leaf process children.
        treeNode.children.map(ensureTimeframeForLeafContent);

    } else {
        // its a leaf.
        if (treeNode.isContent) {
            // add default timeframe of now.
            var timescaleStructure = new StructureNode();
            timescaleStructure.codeBasis = basis.defaulted;
            timescaleStructure.codeType = structureType.timeframe;
            addChild(treeNode, timescaleStructure);

            var currently_Content = new ContentNode();

            currently_Content.codeData = [{
                referenceDate: (new Date()),
                abstract: references.timeframes.currently
            }];
            // TODO shouldn't use new Date() should use
            // a new context parameter to get the date (As we may be interpreting text from the past).

            addChild(timescaleStructure, currently_Content);
        }
    }

}

module.exports.buildTree = buildTree;
