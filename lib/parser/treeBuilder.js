// Takes a sequence of structure/content word blocks from the parser
// and nests them into a tree structure.

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
                if (source[0].clean === 'is' && source[1].clean === 'on') {
                    pointer.prog = 'assigned-to';
                }
            }
        }

        pointer = block;
    }




    return root;
}

module.exports.buildTree = buildTree;
