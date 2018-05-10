Storage = {
  set: function (key,value,expireSeconds) {
    localStorage[key] = JSON.stringify({
        value:value,
        expired: expireSeconds == undefined ? undefined:Date.now() + expireSeconds*1000
      })
  },
  get: function(key) {
    if (localStorage[key] === undefined){
      return
    }
    var tempObj = JSON.parse(localStorage[key])
    if (tempObj.expired == undefined || Date.now() < tempObj.expired) {
      return tempObj.value
    }else{
      return localStorage.removeItem(key)
    }
  }
}