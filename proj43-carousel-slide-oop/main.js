function Carousel($ct,autoPlay){
    this.init($ct)
    this.bind()
    if (autoPlay ==0){
        this.autoPlay()
    }
}

Carousel.prototype = {
    init: function($ct){
        this.$ct = $ct
        this.$imgCt = this.$ct.find('.img-ct')
        this.$imgs = this.$ct.find('.img-ct>li')
        this.$preBtn = this.$ct.find('.pre')
        this.$nextBtn = this.$ct.find('.next')
        this.$bullets = this.$ct.find('.bullet li')
        this.imgWidth = this.$imgs.width()
        this.imgCount = this.$imgs.length
        this.index = 0
        this.isAnimate = false

        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())

        this.$imgCt.css('width', this.imgWidth * (this.imgCount + 2))
        this.$imgCt.css('left', -this.imgWidth)
    },
    bind: function(){
        var _this = this
        this.$preBtn.on('click',function(){
            _this.playPre(1)
        })
        this.$nextBtn.on('click',function(){
            _this.playNext(1)
        })
        this.$bullets.on('click',function(){
            index = $(this).index()
            if (index > _this.index){
                _this.playNext(index - _this.index)
            } else {
                _this.playPre(_this.index - index)
            }
        })
    },
    playPre: function(len){
        var _this = this
        if (this.isAnimate) return
        this.isAnimate = true
        this.$imgCt.animate(
            {left: '+='+this.imgWidth*len},
            function(){
                _this.index -= len
                if (_this.index < 0){
                    _this.$imgCt.css('left',-_this.imgWidth*_this.imgCount)
                    _this.index = _this.imgCount - 1
                }
                _this.setBullet()
                _this.isAnimate = false
            }
        )        
    },
    playNext: function(len){
        var _this = this
        if (this.isAnimate) return
        this.isAnimate = true
        this.$imgCt.animate(
            {left: '-='+this.imgWidth*len},
            function(){
                _this.index += len
                if(_this.index == _this.imgCount){
                    _this.$imgCt.css('left',-_this.imgWidth)
                    _this.index = 0
                }
                _this.setBullet()
                _this.isAnimate = false
            }
        )
    },
    setBullet: function(){
        console.log('set..')
        this.$bullets.eq(this.index).addClass('active')
            .siblings().removeClass('active')
    },
    autoPlay: function(){
        var _this = this
        this.Clock = setInterval(function(){
            _this.playNext(1)
        },3000)
    },
    PausePlay: function(){
        clearInterval(this.Clock)
    }
}

c1 = new Carousel($('.carousel').eq(0))
c2 = new Carousel($('.carousel').eq(1),0)