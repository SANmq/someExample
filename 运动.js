

Move.prototype = {
    // 匀加速运动
    smooth: function (a) {
        self = this;
        this.dom.timer = null
        clearInterval(this.dom.timer);
        setInterval(function () {
            for (attr in this.target) {
                if (attr === "opacity") {
                } else {
                    self.dom.style[attr] = parseInt(self.dom.style[attr]) + sel
                }
            }

        }, 10)




    }

}

function Move(dom, target, speed) {
    this.dom = dom;
    this.target = target;
    // 移动物体的初始速度
    this.speed = speed || 0
}