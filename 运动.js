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


function moveByG(dom, v0, g, rebound, eLost, boder) {
    // 物体仅受重力作用,rebound确定物体是否反弹,eLost反弹后的能量损,boder 如果元素为非窗口定位元素，且设置此值，
    // 则元素移动范围不会超出该元素所示区域
    clearInterval(dom.timer);
    let iSpeedX = v0.x,
        iSpeedY = v0.y;

    dom.timer = setInterval(function () {

        let height = dom.clientHeight,
            width = dom.clientWidth,
            icurX = parseInt(dom.offsetLeft),
            icurY = parseInt(dom.offsetTop);
        console.log(height, width)
        iSpeedY += g;
        let nowX = icurX + iSpeedX,
            nowY = icurY + iSpeedY;
        if (rebound) {
            // 执行反弹
            if (nowY + height >= document.documentElement.clientHeight || nowY <= 0) {
                iSpeedY *= -1;
                nowY = nowY <= 0 ? 0 : document.documentElement.clientHeight - height;
                if (eLost) {
                    iSpeedY *= eLost;
                    iSpeedX *= eLost;
                }
            }
            if (nowX + width >= document.documentElement.clientWidth || nowX <= 0) {
                iSpeedX *= -1;
                nowX = nowX <= 0 ? 0 : document.documentElement.clientWidth - width;
                if (eLost) {
                    iSpeedY *= eLost;
                    iSpeedX *= eLost;
                }
                console.log()
            }
        }
        if (nowY + height == document.documentElement.clientHeight && Math.abs(iSpeedX) <= 1 && Math.abs(iSpeedY) <= 1 + g / (eLost + 1)) {
            // console.log(iSpeedY)
            clearInterval(dom.timer)
        } else {
            dom.style.left = nowX + 'px';
            dom.style.top = nowY + 'px';
        }
    }, 30)
}


var btn = document.getElementById('btn');
var axis = {
    x: 400,
    y: 50,
}

var v0 = {
    x: 200,
    y: 20
}

var a0 = {
    x: -1,
    y: 3
}

btn.onclick = function () {
    move(this, null, v0, a0, 0.8)
}

function move(ele, boder, v0, a, lost) {
    // ele运动元素，
    // boder 运动区域（填元素，默认元素boder区域），如果元素相对视口定位，则添加无效
    // v0 运动初速度 
    // a运动加速度
    // lost 碰撞后的速度损失
    // 清除定时器
    clearInterval(ele.timer);
    let vx = v0.x,
        vy = v0.y,
        bwidth,
        bheight;
    if (boder) {
        // 这种情况有边界
        bwidth = boder.clientWidth;
        bheight = boder.clientHeight;
    } else {
        bwidth = document.documentElement.clientWidth;
        bheight = document.documentElement.clientHeight;
    }
    xCur = parseInt(getStyle(ele, "left"));
    yCur = parseInt(getStyle(ele, "top"));

    ele.timer = setInterval(function () {
        vx += a.x;
        vy += a.y;
        xCur += vx;
        yCur += vy;
        // 可以考虑改用其他样式代表运动物体的大小
        if (xCur <= 0 || xCur + parseInt(getStyle(ele, "width")) >= bwidth) {
            vx *= -1
            if (lost) {
                vx *= lost;
                vy *= lost;
            }
            xCur = xCur <= 0 ? 0 : bwidth - parseInt(getStyle(ele, "width"));
        }
        console.log(yCur + parseInt(getStyle(ele, "height")) >= bheight)
        if (yCur <= 0 || yCur + parseInt(getStyle(ele, "height")) >= bheight) {
            console.log(vy)
            vy *= -1
            if (lost) {
                vx *= lost;
                vy *= lost;
            }
            yCur = yCur <= 0 ? 0 : bheight - parseInt(getStyle(ele, "height"));
        }

        if (ele.style.left == xCur + "px" && ele.style.top == yCur + "px") {
            clearInterval(ele.timer);
        } else {
            ele.style.left = xCur + 'px';
            ele.style.top = yCur + 'px';
        }
    }, 30)

}