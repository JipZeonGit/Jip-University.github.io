function show(){ 
    var date = new Date(); //日期对象 
    var now = ""; 
    now = date.getFullYear()+"年"; //读英文就行了 
    now = now + (date.getMonth()+1)+"月"; //取月的时候取的是当前月-1如果想取当前月+1就可以了 
    now = now + date.getDate() + "日";

    //判断当时小于10时，往数值前面补零
    if (date.getMinutes() < 10) {
        now = now + "0" + date.getHours() + ":"; //时
    }
    else {
        now = now + date.getHours() + ":"; //时
    }

    //判断当分小于10时，往数值前面补零
    if (date.getMinutes() < 10) {
        now = now + "0" + date.getMinutes() + ":"; //分
    }
    else {
        now = now + date.getMinutes() + ":"; //分
    }

    //判断当秒小于10时，往数值前面补零
    if (date.getSeconds() < 10) {
        now = now + "0" + date.getSeconds() + ""; //秒
    }
    else {
        now = now + date.getSeconds() + ""; //秒
    }
    document.getElementById("nowDiv").innerHTML = now; //div的html是now这个字符串，DOM对象
    setTimeout("show()",1000); //设置过1000毫秒就是1秒，调用show方法
    } 