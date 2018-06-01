function Tab(node){
    this.node = node
    this.init()
    this.bind()
}

Tab.prototype.init = function(){
    console.log(this.node)
    this.tabs = this.node.querySelectorAll('.tab')
    this.panels = this.node.querySelectorAll('.panel')
}

Tab.prototype.bind = function(){
    var _this = this
    this.tabs.forEach(function(tab){
        tab.addEventListener('click',function(e){

            _this.tabs.forEach(function(tab){
                tab.classList.remove('active')
            })
            this.classList.add('active')

            var index = Array.prototype.indexOf.call(_this.tabs,this)

            _this.panels.forEach(function(panel){
                panel.classList.remove('active')
            })
            _this.panels[index].classList.add('active')
        })
    })
}

tab1 = new Tab(document.querySelectorAll('.mod-tab')[0])
tab2 = new Tab(document.querySelectorAll('.mod-tab')[1])