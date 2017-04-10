"strict on";

/*
CHANGE TO ALL CODE STUFF UNDER - CODE
AND USE ID INSTEAD OF CODEKEY.
*/
// Can treat an array as a tree:

//[{"who"}[
//      {"is on"} [
//          {"pull requests"}]]];

function get_dataType_date (treeNode) {
    var result = null;
    if (treeNode) {
        if (treeNode.isContent && treeNode.codeData) {
            if (treeNode.codeData && treeNode.codeData.length && treeNode.codeData.length > 0) {
                result = treeNode.codeData[0].date;
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
