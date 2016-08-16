# fileLog
Output information to file for nodejs development.If the information is object or array,it will turn to be string recursively.

# Installation
npm install (-g) fileLog

# API
filelog.out(data,logPath,isAdded)
data:输出的内容，可以是字符串，对象或者数组（对象不能是嵌套引用的）
logPath:文件目录，不包括文件名，默认的文件目录是 "./filelog/",默认的文件名是"filelog.log"
isAdded:是否追加写入
#example
var fileLog = require("fileLog");
var test = {"aa":1,"bb":{"aa":11,"bb":{"dd":"sss"},"cc":[11,12,13]},"cc":[1,2,3]};
var fileDir = "../logs/logs/filelog.log";     //
filelog.out(test);
filelog.out(test,fileDir);
filelog.out(test,fileDir,false);
