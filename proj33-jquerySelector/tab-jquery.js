function Tab(node){
    this.$node = $(node)
    this.init()
    this.bind()
}

Tab.prototype.init = function(){
    this.$tabs = this.$node.find('.tab')
}

Tab.prototype.bind = function(){
    this.$tabs.on('click',function(){

        $(this).addClass('active')
               .siblings()
               .removeClass('active')

        $(this).parents('.mod-tab')
               .find('.panel')
               .eq($(this).index())
               .addClass('active')
               .siblings()
               .removeClass('active')
    })
}

tab1 = new Tab(document.querySelectorAll('.mod-tab')[0])
tab2 = new Tab(document.querySelectorAll('.mod-tab')[1])
