
var currentIndex = 0
var audio = new Audio()
audio.autoplay = true

getMusic(function(list){
    loadMusic(list[currentIndex])
})

function getMusic(callback){
    var xhr = new XMLHttpRequest
    xhr.open('GET','https://www.easy-mock.com/mock/5af3784a2088235f881f1a31/musicPlayer/getlist',true)
    xhr.onload = function (){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            callback(JSON.parse(xhr.responseText))
        }
    }
    xhr.send()
}

function loadMusic(musicObj){
    audio.src = musicObj.src
    $('.music-title').innerText = musicObj.title
    $('.artist').innerText = musicObj.auther
    $('.music-cover img').src = musicObj.img
}

function $(selector){
    return document.querySelector(selector)
}

function $$(selector){
    return document.querySelectorAll(selector)
}



audio.onplay = function() {
    $('.duration').innerText = Math.floor(audio.duration / 60) + ':' + (Math.floor(audio.duration % 60 + ''))
    clock = setInterval(function(){
        var min = Math.floor(audio.currentTime/60)
        var sec = Math.floor(audio.currentTime % 60) + ''
        sec = sec.length === 2 ? sec : '0' + sec
        $('.current-time').innerText = min + ':' + sec
    },1000)

    progressbar = setInterval(function(){
        $('.progress-now').style.width = ((audio.currentTime / audio.duration) * 100) + '%'
    },1000)
}

audio.onpause = function() {
    clearInterval(clock)
    clearInterval(progressbar)
    getMusic(function(list){
        loadMusic(list[ currentIndex = ++currentIndex % 4])
    })
}


$('.play-btn').onclick = function(){
    if (audio.paused == false) {
        audio.pause()
    } else {
        audio.play()
    }
}

$('.next-btn').onclick = function() {
    getMusic(function(list){
        loadMusic(list[ currentIndex = ++currentIndex % 4])
    })
}

$('.forward-btn').onclick = function() {
    getMusic(function(list){
        loadMusic(list[ currentIndex = --currentIndex % 4])
    })
}

$('.progress-total').onclick = function(e) {
    precent = e.offsetX / parseInt(getComputedStyle(this).width)
    console.log(precent)
    audio.currentTime = (audio.duration) * precent
}