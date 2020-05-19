// 获取元素样式兼容版
function getStyle(dom, sttr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(dom, null)[sttr];
    } else {
        return dom.currentStyle[sttr]
    }
}

// 缓冲运动
function moveStart(dom, target) {
    // 用时多久停到目标位置
    clearInterval(dom.timer);
    let icur = null,
        ispeed = null;
    dom.timer = setInterval(function () {
        let flag = true;
        for (let sttr in target) {
            if (sttr === "opacity") {
                icur = parseInt(getStyle(dom, sttr) * 100);
                console.log(icur)
            } else {
                icur = parseInt(getStyle(dom, sttr))
            }
            ispeed = (target[sttr] - icur) / 7;
            ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
            if (sttr === "opacity") {
                dom.style[sttr] = (icur + ispeed) / 100;
                console.log(icur)
            } else {
                dom.style[sttr] = icur + ispeed + 'px';
            }
            if (icur !== target[sttr]) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(dom.timer);
        }
    }, 30)
}

// 弹性运动,物体根据轴心进行往复运动，最终停止在轴上
function moveSpring(dom, axis, v0, k, f) {
    // v0初始速度，矢量，同axis相同,k筋度系数
    clearInterval(dom.timer);
    let iSpeedX = v0.x,
        iSpeedY = v0.y,
        centerX = parseInt(getStyle(dom, 'width')) / 2,
        centerY = parseInt(getStyle(dom, 'height')) / 2;
    dom.timer = setInterval(function () {
        let icurX = centerX + parseInt(dom.offsetLeft),
            icurY = centerY + parseInt(dom.offsetTop),
            lx = axis.x - icurX,
            ly = axis.y - icurY,
            aX = lx * k,
            aY = ly * k;
        iSpeedX += aX;
        iSpeedY += aY;
        let nowX = icurX + iSpeedX,
            nowY = icurY + iSpeedY;
        if ((nowX - axis.x) * (icurX - axis.x) < 0) {
            // 如果当前位置乘以之前的速度
            iSpeedX *= f;
            if (Math.abs(iSpeedX) < 1) {
                iSpeedX = 0;
                dom.style.left = axis.x - centerX + 'px';
                flag = true
            }
        }
        if ((nowY - axis.y) * (icurY - axis.y) < 0) {
            // 如果当前位置乘以之前的速度
            iSpeedY *= f;
            if (Math.abs(iSpeedY) < 1) {
                iSpeedY = 0;
                dom.style.top = axis.y - centerY + 'px';
            }
        }
        dom.style.left = nowX - centerX + 'px';
        dom.style.top = nowY - centerY + 'px';


    }, 30)
}


var btn = document.getElementById('btn');
var axis = {
    x: 400,
    y: 50,
    // z: 100,
}

var v0 = {
    x: 0,
    y: 0
}

btn.onclick = function () {
    moveSpring(this, axis, v0, 0.1, 1)
}