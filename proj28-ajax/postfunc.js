function post(url,data,callback) {
  var xhr
  xhr = new XMLHttpRequest()
  xhr.onReadyStatechange = function(){
    if (xhr.readyState == 4) {
      if (xhr.status == 200){
        callback && callback(xhr.responseText)
      }
    }
  }
  var strData = ''
  for (var key in data){
    strData += '&' + key + '=' + data[key]
  }
  strData = strData.substring(1)
  xhr.open('POST',url,true)
  xhr.send(strData)
}