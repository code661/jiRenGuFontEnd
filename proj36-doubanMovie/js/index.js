var app = {
    init: function(){
        this.$tabs = $('footer>div')
        this.$panels = $('main>section')
        this.bind()
        top250.init()
        us.init()
        search.init()
    },
    bind: function() {
        var _this = this
        this.$tabs.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
            _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
        })
    },
}

var top250 = {
    init: function(){
        this.$element = $("#top250")
        this.isLoading = false
        this.index = 0
        this.isFinish = false
        this.bind()
        this.start()
    },

    bind: function(){
        var _this = this
        this.$element.on('scroll',function(){
            if (_this.isToBottom()){
                _this.start()
            }
        })
    },

    start: function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },

    getData: function(callback){
        var _this = this
        if(_this.isLoading) return
        _this.isLoading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url: "http://api.douban.com/v2/movie/top250",
            data: {
                start: _this.index || 0,
                count: 10
            },
            dataType: 'jsonp'
        }).done(function(ret){
            _this.index += 10
            if (this.index >= ret.total){
                return _this.isFinish = true
            }
            callback && callback(ret)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            _this.$element.find('.loading').hide()
            _this.isLoading = false
        })
    },

    isToBottom: function(){
        return this.$element.find('.container').height() <= this.$element.height() + this.$element.scrollTop() + 10
    },

    render: function(data){
        var _this = this
        data.subjects.forEach(function(movie){
            _this.$element.find('.container').append(Helper.createNode(movie))
        })
    }
}
var Helper = {
    createNode: function(movie){
        var tpl = 
            `<div class="item">
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
            </div>`

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
        return $node
    }
}
var us = {
    init: function(){
        this.$element = $('#us-box')
        this.start()
    },

    start: function(){
        var _this = this
        this.getData(function(ret){
            _this.render(ret)
        })
    },

    getData: function(callback){
        var _this = this
        _this.$element.find('.loading').show()
        $.ajax({
            url: "http://api.douban.com/v2/movie/us_box",
            dataType: 'jsonp'
        }).done(function(ret){
            callback && callback(ret)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            _this.$element.find('.loading').hide()
        })
    },

    render : function(data){
        var _this = this
        data.subjects.forEach(function(movie){
            _this.$element.find('.container').append(Helper.createNode(movie.subject))
        })
    }
}

var search = {
    init: function(){
        this.$element = $('#search')
        this.keyword = function(){
            return this.$element.find('input').val()
        }
        this.bind()
    },

    bind: function(){
        var _this = this
        _this.$element.find('.button').on('click',function(){
            _this.getData(function(data){
                _this.render(data)
            })
        })
    },

    getData: function(callback){
        var _this = this
        this.$element.find('.loading').show()
        $.ajax({
            url: "http://api.douban.com//v2/movie/search?",
            data: {
                q: _this.keyword()
            },
            dataType: 'jsonp'
        }).done(function(ret){
            callback && callback(ret)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            _this.$element.find('.loading').hide()
        })
    },

    render: function(data){
        var _this = this
        data.subjects.forEach(function(movie){
            _this.$element.find('.search-result').append(Helper.createNode(movie))
        })
    }
}

app.init()