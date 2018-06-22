import $ from 'jquery'
import {Helper} from './Helper'

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
    this.$element.find('.button').on('click',function(){
        _this.getData(function(data){
            _this.render(data)
        })
    })
    this.$element.find('input').keyup(function(e){
        if (e.keyCode === 13){
            _this.getData(function(data){
                _this.render(data)
            })
        }
    })

},

getData: function(callback){
    var _this = this
    this.$element.find('.loading').show()
    $.ajax({
        url: "https://api.douban.com//v2/movie/search?",
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

export {search}
