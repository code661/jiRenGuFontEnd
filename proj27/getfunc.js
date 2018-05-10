function get(url,data,callback) {
  var xhr
  xhr = new XMLHttpRequest()
  xhr.onreadyStateschange = function(){
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        callback && callback(xhr.responseText)
      }
    }
  }
  for (var key in data){
    url += (url.indexOf("?") == -1 ? "?" : "&")
    url += encodeURICompoent(key) + "=" + encodeURICompoent(data[key])
  }
  xhr.open('get',url+'&'+Number(new Date()),true)
  xhr.send()
}