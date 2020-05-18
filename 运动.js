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

var btn = document.getElementById('btn');
var target = {
    left: 500,
    width: 400,
    opacity: 100,
}
btn.onclick = function () {
    moveStart(this, target)
}