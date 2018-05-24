var curPage = 1
var perPageCount = 10
var colSumHeight = []
var isDataArrive = true
var nodeWidth = $('.item').outerWidth(true)
var colNum = parseInt($('#pic-ct').width() / nodeWidth)
for (var i = 0; i < colNum; i++){
    colSumHeight[i] = 0
}
start()

$(window).on('scroll',function(){
    if(!isDataArrive) return
    if(isVisible($('#load'))) {
        start()
    }
})

function start() {
    
    getData(function(newsList){
        isDataArrive = true
        $.each(newsList,function(idx, news){
            var $node = getNode(news)
            $node.find('img').on('load',function(){
                $('#pic-ct').append($node)
                waterFallPlace($node)
            })
        })
    })
    isDataArrive = false
}

function getData(callback) {
    
    $.ajax({
        url: 'https://platform.sina.com.cn/slide/album_tech',
        dataType: 'jsonp',
        jsonp:"jsoncallback",
        data: {
            app_key: '1271687855',
            num: perPageCount,
            page: curPage
        }
    }).done(function(ret){
        if(ret && ret.status && ret.status.code === '0') {
            callback(ret.data)
            curPage ++
        }else{
            console.log('get error data')
        }
    }).fail(function(){
        console.log('error')
    })
}

function getNode(item){
    var tpl = `
    <li class="item">
        <a href="#" class="link">
            <img src="" alt="">
        </a>
        <h4 class="header"></h4>
        <p class="desp"></p>
    </li>
    `
    var $node = $(tpl)
    $node.find('.link').attr('href',item.url)
    $node.find('img').attr('src',item.img_url)
    $node.find('.header').text(item.name)
    $node.find('.desp').text(item.short_intro)

    return $node
}

function waterFallPlace($node) {
    var minColIdx = 0
    var minSumHeight = colSumHeight[0]

    for(var i=0; i< colSumHeight.length; i++) {
        if(colSumHeight[i] < minSumHeight) {
            minSumHeight = colSumHeight[i]
            minColIdx = i
        }

        $node.css({
            left: nodeWidth * minColIdx,
            top: minSumHeight,
        })
    }

    colSumHeight[minColIdx] += $node.outerHeight(true)
    $('#pic-ct').height(Math.max.apply(null,colSumHeight))
}

function isVisible($el){
    var scrollH = $(window).scrollTop(),
        winH = $(window).height(),
        top = $el.offset().top;
    
        if (top < winH + scrollH) {
            return true
        }else {
            return false
        }
}