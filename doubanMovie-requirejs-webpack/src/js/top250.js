import $ from 'jquery'
import {Helper} from './Helper'

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
            url: "https://api.douban.com/v2/movie/top250",
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

export {top250}