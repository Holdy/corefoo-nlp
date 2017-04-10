"strict on";
// Takes a sequence of structure/content word blocks from the parser
// and nests them into a tree structure.
var structureType = require('../definitions/structureType');
var contentType   = require('../definitions/contentType');
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
}
StructureNode.prototype.isStructure = true;

function ContentNode() {
}
ContentNode.prototype.isContent = true;

// TODO - remove this whole translation step. simply
// build the blocks into a tree.
function nodeForBlock(block) {
    var result = null;
    if (block.isStructure) {
        result = new StructureNode(block);
    } else {
        result = new ContentNode(block);
    }
    result.source = block.source;


    if (block.codeType) {
        result.codeType = block.codeType;
    }
    if (block.codeData) {
        result.codeData = block.codeData;
    }

    return result;
}

function buildTree(blockList) {

    var pointer = nodeForBlock(blockList[0]);
    var root = pointer;
    var latestStructure = null;

    for (var i = 1; i < blockList.length; i++) {
        var block = nodeForBlock(blockList[i]);
        if (block.isStructure) {
            latestStructure = block;
        }
        var isLastBlock = i === (blockList.length - 1);
        if (isLastBlock && latestStructure && block.isContent && block.codeType == contentType.timeframe) {

            // Special case for 'today' etc dangling at the end of input.
            var timescaleStructure = new StructureNode();
// TODO basis.
//            timescaleStructure.codeBasis = basis.defaulted;
            timescaleStructure.codeType = structureType.timeframe;
            addChild(latestStructure, timescaleStructure);

            addChild(timescaleStructure, block);

        } else {

            addChild(pointer,block);
            if (pointer.isStructure) {
                var source = pointer.source;
                if (source && source.length === 2) {
                    if (source[0].string === 'is' && source[1].string === 'on') {
                        pointer.codeKey = 'assigned-to';
                    }
                }
            }

        }


        pointer = block;
    }

    ensureTimeframeForLeafContent(root, true);
    setNames(root);

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

    if (!treeNode.id) {
        treeNode.id = id;
    }

    if (treeNode.children && treeNode.children.length > 0) {
        treeNode.children.map(setNames);
    }


}


// TODO context should  be passed here.
function addDefaultTimeframeSubtree(treeNode) {
    // add default timeframe of now.
    var timescaleStructure = new StructureNode();
    timescaleStructure.codeBasis = basis.defaulted;
    timescaleStructure.codeType = structureType.timeframe;
    timescaleStructure.id = 'default timescale structure';
    addChild(treeNode, timescaleStructure);

    var currently_Content = new ContentNode();
    currently_Content.id = 'default timescale content';

    currently_Content.codeData = [{
        date: (new Date()),
        abstract: references.timeframes.currently
    }];
    // TODO shouldn't use new Date() should use
    // a new context parameter to get the date (As we may be interpreting text from the past).

    addChild(timescaleStructure, currently_Content);
}

function hasChildren(treeNode) {
    return treeNode.children && treeNode.children.length > 0;
}

function ensureTimeframeForLeafContent(treeNode, isRoot) {

    if (isRoot && !hasChildren(treeNode)) {
        // A single node tree - add default time for good measure.
        addDefaultTimeframeSubtree(treeNode);
        return;
    }


    if (treeNode.children && treeNode.children.length > 0) {
        // not a leaf process children.
        treeNode.children.map(ensureTimeframeForLeafContent);

    }

    if (treeNode.isStructure && treeNode.codeType !== structureType.timeframe) {
        // Find structure timeframe child.
        var childTimeframe = null;
        if (hasChildren(treeNode)) {
            for(var i = 0; i < treeNode.children.length; i++) {
                var child = treeNode.children[i];
                if (child.isStructure && child.codeType === structureType.timeframe) {
                    childTimeframe = child;
                    break;
                }
            }
        }

        if(!childTimeframe) {
            addDefaultTimeframeSubtree(treeNode);
        }
    }

}


module.exports.buildTree = buildTree;
