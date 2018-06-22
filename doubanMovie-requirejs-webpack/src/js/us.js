import $ from 'jquery'
import {Helper} from './Helper.js'

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
            url: "https://api.douban.com/v2/movie/us_box",
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

export {us}
