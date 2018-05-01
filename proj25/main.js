function $(selector) {
  return document.querySelector(selector)
}

function $$(selector) {
  return document.querySelectorAll(selector)
}

$('header .login').onclick = function(e){
  e.stopPropagation()
  $(".flip-modal").classList.toggle('show')
}

$(".flip-modal").addEventListener('click',function(e){
  e.stopPropagation()
  if (e.target.classList.contains("login")) {
    $(".flip-modal").classList.remove("register")
    $(".flip-modal").classList.add('login')
  }

  if (e.target.classList.contains("register")){
    $(".flip-modal").classList.remove("login")
    $(".flip-modal").classList.add("register")
  }

  if (e.target.classList.contains("close")) {
    $(".flip-modal").classList.remove("show")
  }
})

document.addEventListener('click',function(){
  $(".flip-modal").classList.remove('show')
})

$(".modal-login form").addEventListener('submit',function(e){
  e.preventDefault()
  if (!/^[\w\d_.]{4,16}$/.test($(".modal-login input[name=username]").value)) {
    $(".modal-login .errormsg").innerText = "用户名格式错误❌应为4-16位的英文或数字"
    return false
  }
  if (!/^[\w\d_.]{4,16}$/.test($(".modal-login input[name=password]").value)) {
    $(".modal-login .errormsg").innerText = "密码格式错误❌应为4-16位的英文或数字"
    return false
  }
  this.submit()
})

$(".modal-register form").addEventListener("submit",function(e){
  e.preventDefault()
  if (!/^[\w\d_.]{4,16}$/.test($(".modal-register input[name=username]").value)) {
    $(".modal-register .errormsg").innerText = "用户名格式错误❌应为4-16位的英文或数字"
    return false
  }
  if (!/^[\w\d_.]{4,16}$/.test($(".modal-register input[name=password]").value)) {
    $(".modal-register .errormsg").innerText = "密码格式错误❌应为4-16位的英文或数字"
    return false
  }
  tmpNodeList = $$(".modal-register input[name=password]")
  if (!(tmpNodeList[0].value === tmpNodeList[1].value)) {
      $(".modal-register .errormsg").innerText = "两次输入密码不一致"
      return false
  }
  this.submit()
})
