//图片移动函数moveElement()
//moveElement函数需要获取图片现在的位置以及目标位置并计算它们之间的差距进行移动
//可以用offsetLeft和offsetTop获取图片现在的位置。
//图片移动时“划过”的效果是将距离分成好10次进行移动，即利用setTimeOut函数，
//然而为了防止鼠标悬停，需调用clearTimeout()函数

function moveElement(ele, x_final, y_final, interval) {//ele为元素对象
    var x_pos = ele.offsetLeft;
    var y_pos = ele.offsetTop;
    var dist = 0;
    if (ele.movement) {//防止悬停
        clearTimeout(ele.movement);
    }
    if (x_pos == x_final && y_pos == y_final) {//先判断是否需要移动
        return;
    }
    dist = Math.ceil(Math.abs(x_final - x_pos) / 10);//分10次移动完成
    x_pos = x_pos < x_final ? x_pos + dist : x_pos - dist;

    dist = Math.ceil(Math.abs(y_final - y_pos) / 10);//分10次移动完成
    y_pos = y_pos < y_final ? y_pos + dist : y_pos - dist; //条件运算

    ele.style.left = x_pos + 'px';
    ele.style.top = y_pos + 'px';

    ele.movement = setTimeout(function () {//分10次移动，自调用10次
        moveElement(ele, x_final, y_final, interval);
    }, interval)
}

//小圆点移动函数moveIndex()
//移动小圆点的实质是移动设置的背景颜色的类on，原理是先判断哪个li上有背景颜色
//有则去掉，让所有的li都没有背景，然后在对当前的li添加背景。

function moveIndex(list, num) {//移动小圆点
    for (var i = 0; i < list.length; i++) {
        if (list[i].className == 'on') {//清除li的背景样式
            list[i].className = '';
        }
    }
    list[num].className = 'on';
}

//图片自动轮播
//将以下代码直接写在window.onload中即可。
//这里需要定义一个变量index，表示移动到第index（0~n-1，n为li的个数）张图片。

var img = document.getElementById('img');
var list = document.getElementById('index').getElementsByTagName('li');
var index = 0;//这里定义index是变量，不是属性

var nextMove = function () {//一直向右移动，最后一个之后返回
    index += 1;
    if (index >= list.length) {
        index = 0;
    }
    moveIndex(list, index);
    moveElement(img, -998 * index, 0, 20);
};

//图片的自动轮播需要用到setInterval()函数，让程序每隔几秒自动调用nextMove()函数

var play = function () {
    timer = setInterval(function () {
        nextMove();
    }, 2500);
};

//鼠标覆盖小圆点效果
//要实现鼠标覆盖哪个小圆点，就呈现出对应的图片这一效果，需要知道鼠标覆盖的是哪个小圆点
//这里给每个li都添加一个自定的属性index，使该属性的值为对应的小圆点的序号i(0~n - 1，n为li的个数) 
//这样每次鼠标覆盖时只需获取index属性的值即可知道鼠标覆盖的是哪个小圆点。
//注意，该index属性和变量index没有丝毫的关系，只有相同的名字。

for (var i = 0; i < list.length; i++) {//鼠标覆盖上哪个小圆圈，图片就移动到哪个小圆圈，并停止
    list[i].index = i;//这里是设置index属性，和index变量没有任何联系
    list[i].onmouseover = function () {
        var clickIndex = parseInt(this.index);
        moveElement(img, -998 * clickIndex, 0, 20);
        index = clickIndex;
        moveIndex(list, index);
        clearInterval(timer);
    };
    list[i].onmouseout = function () {//移开后继续轮播
        play();
    };
}

//然后在滑到最后一幅图片时，迅速的将偏移量赋值0，变成第一幅，两幅图一样，无法分辨其中变化，即可达到无缝连接。
if (x_pos == -4990) {
    ele.style.left = '0';
    ele.style.top = '0';
} else {
    ele.style.left = x_pos + 'px';
    ele.style.top = y_pos + 'px';
}