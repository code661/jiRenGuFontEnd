'use strict';

var fs = require('fs')

var data = 'Hello, Node.js'
fs.writeFile('sample.txt',data, function(err){
  if (err){
    console.log(err);
  } else {
    console.log('ok.')
  }
})

fs.readFile('sample.txt','utf-8',function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

fs.stat('sample.txt',function(err, stat){
  if (err) {
    console.log(err)
  } else {
    console.log('isFIle:' + stat.isFile());
    console.log('isDirectory:' + stat.isDirectory())
    if (stat.isFile()) {
      console.log('size' + stat.size)
      console.log('birth time:' + stat.birthtime)
      console.log('modified time:' + stat.mtime)
    }
  }
})

