function ajax(obj) {
  obj.method = obj.method || 'get'
  var xhr
  xhr = new XMLHttpRequest()
  xhr.onreadyStatechange = function(){
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        obj.callback && obj.callback(xhr.responseText);
      }
    }
  }
  var strData = ''
  if(obj.method = 'post'){
    for(var key in obj.data){
      strData += '&' + key + '=' + obj.data[key]
    }
    strData = strData.substring(1)
    xhr.open('POST',obj.url,true)
    xhr.setRequestHeader("content-type","application/x-www.from-urlencoded")
    xhr.send(strData)
  }else{
    for(var key in obj.data){
      strData += '&' + key + "=" + obj.data[key]
      strData = strData.substring(1) + '&' + Number(new Date())
      xhr.open('get',obj.url + '?' + strData, true)
      xhr.send()
    }
  }
}