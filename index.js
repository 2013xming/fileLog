var fs = require("fs");
var fileDir = "";
var content = "";
var class2type = {};
function jquery_type( obj ) {
	if ( obj == null ) {
		return obj + "";
	}
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call(obj) ] || "object" :
		typeof obj;
};
function isArraylike( obj ) {
	var length = obj.length,
		type = jquery_type( obj );

	if ( type === "function" ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
};
function jquery_each( obj, callback, args ) {
	var value,
		i = 0,
		length = obj.length,
		isArray = isArraylike( obj );

	if ( args ) {
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback.apply( obj[ i ], args );

				if ( value === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				value = callback.apply( obj[ i ], args );

				if ( value === false ) {
					break;
				}
			}
		}

	// A special, fast, case for the most common use of each
	} else {
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback.call( obj[ i ], i, obj[ i ] );

				if ( value === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				value = callback.call( obj[ i ], i, obj[ i ] );

				if ( value === false ) {
					break;
				}
			}
		}
	}

	return obj;
};
jquery_each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function joinContent(data){
	if(jquery_type(data)==='object' || jquery_type(data)==='array'){
		if(jquery_type(data)==='object'){
			content += '{'
		}else if(jquery_type(data)==='array'){
			content += '['
		}
		jquery_each(data,function(index,item){
			if(jquery_type(data)==='object'){
				content += '"'+index+'"'+':';
			}
			if(jquery_type(item)==='object' || jquery_type(item)==='array')
				joinContent(item,true);
			else{
				content += '"'+item+'"';
				content += ',';
			}
		});
		if(jquery_type(data)==='object'){
			content += '},';
		}else if(jquery_type(data)==='array'){
			content += '],';
		}
	}else{
		content += data;
		content += '\n';
	}
	return content;
}
function writeToFileInDepth(data,isAdded){
	content = joinContent(data);
	content = content.replace(/\,\]/g,"]");
	content = content.replace(/\,\}/g,"}");
	content = content.replace(/\,$/,"");
	if(!isAdded){
		fs.writeFileSync(fileDir,content);
	}else{
		fs.appendFileSync(fileDir,content);
	}
	
}
function fileLogOut(logPath,data,isAdded){
	fileDir = logPath || "./logs/filelog.log";
	console.log(fileDir);
	fs.existsSync(fileDir) || fs.mkdirSync(fileDir);
	writeToFileInDepth(data,isAdded);
}
module.exports = {
	out : fileLogOut
}
