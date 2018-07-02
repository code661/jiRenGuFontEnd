$('.add-btn').on('click',function(e){
    e.preventDefault();
    products = getData()
    console.log(products)
    $.each(products, function(idx, prod){
        var html = getProdHtml(prod)
        console.log(html)
        $('.prod-panel').append(html)
    })
})

$('.prod-panel').on('click','.del-btn',function(e){
    e.preventDefault();
    $(this).parents('.prod-box').remove()
})

$('.edit-btn').on('click',function(e){
    e.preventDefault();
    $('.del-btn').toggleClass('active')
})

function getData(){
    var results = []
    for (var i = 0; i<3; i++) {
        var rand = Math.floor(Math.random()*100)
        var product = {
            img: 'http://picsum.photos/200/200/?image=' + rand,
            name: '珂兰 黄金手 猴哥款',
            price: '¥ ' + rand
        }
        results.push(product)
    }
    return results
}

function getProdHtml(prod){
    var html = '';
    html += "<div class='prod-box'>"
    html +=     '<img src=' + prod.img + '>'
    html +=     '<p class="prod-name">' + prod.name +'</p>'
    html +=     '<p class="prod-price">'+ prod.price + '</p>'
    html +=     '<div><a class="btn del-btn" href="#">删除</a></div>'
    html += "</div>"
    return html
}

