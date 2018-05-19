$('footer div').on('click',function(){
    var index = $(this).index()
    $('main section').hide().eq(index).fadeIn()
    $(this).addClass('active').siblings().removeClass('active')
})

var index = 0
isLoading = false
start()

function start(){
    if (isLoading) return
    isLoading = true
    $('.loading').show()
    $.ajax({
        url: "http://api.douban.com/v2/movie/top250",
        method: "GET",
        data: {
            start: index,
            count: 10,
        },
        dataType: 'jsonp'
    }).done(function(ret){
        setData(ret)
        index += 10
    }).fail(function(){
        console.log('error...')
    }).always(function(){
        isLoading = false
        $('.loading').hide()
    })
}

$('main').scroll(function(){
    var secHeight = $('section').eq(0).height()
    var mainScT = $('main').scrollTop()
    var mainHeight = $('main').height()
    if (secHeight - mainScT - mainHeight < 25 && secHeight - mainScT - mainHeight >= 0) {
        start()
    }
})

function setData(data){
    data.subjects.forEach(function(movie){
        var tpl = `
            <div class="item">
                <a href="#">
                    <div class="cover">
                        <img src="" alt="">
                    </div>
                    <div class="detail">
                        <h2>阿甘正传</h2>
                        <div class="extra"><span class="rating">9.4</span>分 / <span class="collect">213123</span> 收藏</div>
                        <div class="extra"><span class="year">1994</span> / <span class="genres">剧情</span></div>
                        <div class="extra">导演：<span class="directors">张艺谋</span></div>
                        <div class="extra">主演：<span class="casts">张艺谋</span></div>
                    </div>
                </a>
            </div>
        `
        var $node = $(tpl)
        
        $node.find('.cover img').attr('src', movie.images.medium)
        $node.find('.detail h2').text(movie.title)
        $node.find('.detail .rating').text(movie.rating.average)
        $node.find('.detail .collect').text(movie.collect_count)
        $node.find('.detail .year').text(movie.year)
        $node.find('.detail .genres').text(movie.genres.join(' / '))
        $node.find('.detail .directors').text(function(){
            var directorsArr = []
            movie.directors.forEach(function(item){
                directorsArr.push(item.name)
            })

            return directorsArr.join('、')
        })
        $node.find('.detail .casts').text(function(){
            var castsArr = []
            movie.casts.forEach(function(item){
                castsArr.push(item.name)
            })
            return castsArr.join('、')
        })
        $('#top250').append($node)
    })
}