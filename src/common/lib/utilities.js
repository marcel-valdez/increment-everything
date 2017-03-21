
function toFormattedString(obj, depth, result = {str: ""}, indent = 0) {
  if(depth == 0) {
    result.str += " <max depth reached>";
    return;
  } else {
    depth--;
  }
  if (obj === null) {
    result.str += "null";
    return result.str;
  }

  if (typeof obj === 'object') {
    const added = Object.keys(obj).map(key => {
      result.str += "\n" + "  ".repeat(indent) + key + ":";
      toFormattedString(obj[key], depth, result, indent + 1);
      return true;
    });

    if(added !== true && obj.length === 0) {
      result.str += "[] (Empty)";
    }

    return result.str;
  }

  result.str += obj + " (" + typeof(obj)  + ")";
  return result.str;
}

function logFormattedObject(obj, depth = 1000) {
  console.log(toFormattedString(obj, depth));
}

function logDebug(msg, obj, depth = 5) {
  if(process.env.NODE_ENV === 'dev') {
    console.log(`${msg} ${toFormattedString(obj, depth = 5)}`);
  }
}

module.exports = {
  logFormattedObject,
  toFormattedString,
  logDebug
};
