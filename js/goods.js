var oPic = document.getElementById('user_pic'); //在文档中通过ID获取元素
var oNext = getByclass(oPic, 'next')[0]; //通过class类名获取元素 但是它有兼容性的问题 getElementsByClassName在H5的版本才被标准化 IE8以下的浏览器都不支持.
var oLi = oPic.getElementsByTagName('li');
var arr = [];
for (var i = 0; i < oLi.length; i++) {
  var oImg = oLi[i].getElementsByTagName("img")[0];
  //样式属性值只能改，不能读
  arr.push([parseInt(getStyle(oLi[i], "left")), parseInt(getStyle(oLi[i], "top")), parseInt(getStyle(oLi[i], "z-index")), oImg.width, parseInt(getStyle(oLi[i], "opacity") * 100)]);
}

oNext.onclick = function moveTN() {
  arr.push(arr[0]);
  arr.shift(); //把第一个元素从数组中删除
  for (var i = 0; i < oLi.length; i++) {
    var oImg = oLi[i].getElementsByTagName("img")[0];


    oLi[i].style.zIndex = arr[i][2];
    startMove(oLi[i], { left: arr[i][0], top: arr[i][1], opacity: arr[i][4] });
    startMove(oImg, { width: arr[i][3] });
  }

}

//自动滚动

function getByclass(oParent, sClass) { //getElementsByClassName方法兼容编写
  var aResult = []; //数组
  var aEle = oParent.getElementsByTagName("*"); //获取对象下面所有的元素

  for (var i = 0; i < aEle.length; i++) {
    if (aEle[i].className == sClass) {
      aResult.push(aEle[i]); //push向数组后面添加一个数组
    }
  }
  return aResult;
}
var moveTime = setInterval(function() {
  oNext.click();
}, 1500);

function getStyle(obj, name) {
  /*if (obj.currentStyle)
  {
  	return obj.currentStyle[name];IE支持方法
  }else{
  	return getComputedStyle(obj)[name];火狐支持的方法
  }*/
  return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj)[name];
}

function startMove(obj, json) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    for (var attr in json) {
      var cur = 0;

      cur = attr == "opacity" ? Math.round(parseFloat(getStyle(obj, attr)) * 100) : parseInt(getStyle(obj, attr));
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      var speed = (json[attr] - cur) / 6;


      if (attr == "opacity") {
        obj.style.filter = "alpha(opacity:" + (cur + speed) + ")";
        obj.style.opacity = (cur + speed) / 100
      } else {
        obj.style[attr] = cur + speed + "px";
      }
    }
  }, 30);
}
