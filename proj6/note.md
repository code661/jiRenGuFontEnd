# css选择器中:first-child与:first-of-type的区别
## :first-child 理解
比如有如下一段HTML代码

```html
<div>
    <p>第一个子元素</p>
    <h1>第二个子元素</h1>
    <span>第三个子元素</span>
    <span>第四个子元素</span>
</div>
```

* `p:first-child`  匹配到的是p元素，因为p元素是div的第一个子元素；

* `h1:first-child`  匹配不到任何元素，因为在这里h1是div的第二个子元素，而不是第一个；

* `span:first-child`  匹配不到任何元素，因为在这里两个span元素都不是div的第一个子元素；

-----
## :first-of-type 理解
```html
<div>
    <p>第一个子元素</p>
    <h1>第二个子元素</h1>
    <span>第三个子元素</span>
    <span>第四个子元素</span>
</div>
```
* `p:first-of-type`  匹配到的是p元素,因为p是div的所有类型为p的子元素中的第一个；

* `h1:first-of-type`  匹配到的是h1元素，因为h1是div的所有类型为h1的子元素中的第一个；

* `span:first-of-type`  匹配到的是第三个子元素span。这里div有两个为span的子元素，匹配到的是它们中的第一个。

