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

            } else {
                icur = parseInt(getStyle(dom, sttr))
            }
            ispeed = (target[sttr] - icur) / 7;
            ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
            if (sttr === "opacity") {
                dom.style[sttr] = (icur + ispeed) / 100;
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
var long = document.getElementsByTagName("div")[0];
var axis = {
    x: 400,
    y: 50,
}

var v0 = {
    x: 100,
    y: 20
}

var a0 = {
    x: 0,
    y: 3
}

// btn.onclick = function () {
//     move(this, long, v0, a0, 0.8)
// }

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
        if (yCur <= 0 || yCur + parseInt(getStyle(ele, "height")) >= bheight) {
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
// 拖拽运动


btn.onmousedown = function (e) {
    console.log("12345")
    clearInterval(this.timer)
    // 如果有父级定位显示元素
    if (this.offsetParent) {
        boder = this.offsetParent;
    } else {
        boder = document.documentElement;
    }
    let ax = e.clientX - this.offsetLeft - boder.offsetLeft;
    let ay = e.clientY - this.offsetTop - boder.offsetTop;
    self = this;
    let lastleft = parseInt(getStyle(this, "left")),
        lasttop = parseInt(getStyle(this, "top"));

    boder.onmousemove = function (e) {
        let left = e.clientX - ax - boder.offsetLeft,
            top = e.clientY - ay - boder.offsetTop;
        if (left <= 0 || left >= boder.clientWidth - self.clientWidth) {
            left = left <= 0 ? 0 : boder.clientWidth - self.clientWidth;
        }
        if (top <= 0 || top >= boder.clientHeight - self.clientHeight) {
            top = top <= 0 ? 0 : boder.clientHeight - self.clientHeight
        }
        lastleft = parseInt(self.style.left)
        lasttop = parseInt(self.style.top)
        console.log(left, top)
        self.style.left = left + 'px';
        self.style.top = top + 'px';
        document.onmouseup = function (e) {
            boder.onmousemove = null;
            let v0 = {
                    x: left - lastleft,
                    y: top - lasttop
                },
                a = {
                    x: 0,
                    y: 3
                }
            move(btn, boder, v0, a, 0.8)
            document.onmouseup = null;
        }
    }
    document.onmouseup = function (e) {
        boder.onmousemove = null;
    }
}