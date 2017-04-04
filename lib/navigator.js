"strict on";

function get_dataType_date (treeNode) {
    var result = null;
    if (treeNode) {
        if (treeNode.isContent && treeNode.codeData) {
            if (treeNode.codeData && treeNode.codeData.length && treeNode.codeData.length > 0) {
                result = treeNode.codeData[0].referenceDate;
            }
        } else  // process children of structure node.
        if (treeNode.children && treeNode.children.length > 0) {
            for(var i = 0; i < treeNode.children.length; i++) {
                var child = treeNode.children[i];
                result = get_dataType_date(child);
                if (result) {
                    break;
                }
            }
        }
    }

    return result;
}

var fetcher = {

    dataType : {
        date: get_dataType_date
    }

};


module.exports.find = fetcher;
