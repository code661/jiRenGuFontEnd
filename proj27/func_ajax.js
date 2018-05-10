function ajax(obj) {
  var url = obj.url
  var type = obj.type || 'GET'
  var dataType = obj.dataType || 'json'
  var onsuccess = obj.onsuccess || function(){}
  var onerror = obj.error || function(){}
  var data = obj.data

  strData = []
  for (var key in data){
    strData.push(key+'='+data[key])
  }
  strData = strData.json('&')

  if(type === "GET"){
    url += '?' + strData
  }
  var xhr = new XMLHttpRequest()
  xhr.open(type,url,true)
  xhr.onload = function(){
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
      if (dataType == 'json') {
        onsuccess(JSON.parse(xhr.responseText))
      }else{
        onsuccess(xhr.responseText)
      }
    }else{
      onerror()
    }

    xhr.onerror = onerror
    if (type === 'POST') {
      xhr.send(data)
    } else{
      xhr.send()
    }
}