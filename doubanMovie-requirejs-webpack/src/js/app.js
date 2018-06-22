import $ from 'jquery'
import '../css/index.css'
import '../css/reset.css'
import '../css/common.css'
import {top250} from './top250'
import {us} from './us'
import {search} from './search'

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

app.init()