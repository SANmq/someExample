LoopView.prototype = {

    init: function () {
        // 定义初始的展示位置大小,没有填充默认大小
        this.initData();
        this.render();
        this.handle();
    },

    initData: function () {
        //  初始数据的启动及赋值
        this.index = 0;
    },

    render: function () {
        this.exhibition.style.width = this.width * (this.data.length + 2) + "px";
        this.exhibition.style.height = this.height + "px";
        this.exhibition.style.left = -this.width + "px";
        let contant1 = ""
        let contant2 = ""
        for (let i = 0; i <= this.data.length + 1; i++) {
            if (i == 0) {
                contant1 += `<a href="" class="img"><img src=${this.data[this.data.length-1]} alt=""></a>\n`

            } else if (i == this.data.length + 1) {
                contant1 += `<a href="" class="img"><img src=${this.data[0]} alt=""></a>\n`

            } else {
                contant1 += `<a href="" class="img"><img src=${this.data[i-1]} alt=""></a>\n`
                contant2 += `<li><a href="javascript:void(0)"></a></li>`
            }
        }
        this.exhibition.innerHTML = contant1;
        this.controlBar.innerHTML = contant2;

        // 渲染小按钮
        this.button = this.controlBar.childNodes;
        this.button[this.index].className = 'select';
        this.refresh();
    },

    handle: function () {
        // this.autoMove();
        this.handlemouseenter();
        this.handlemouseleave();
        this.handleclick();
    },

    handlemouseleave() {
        var self = this;
        this.ele.onmouseleave = function (e) {
            // self.no = self.autoMove();
            self.leftButton.style.display = 'none';
            self.rightButton.style.display = 'none';
        }
    },

    handlemouseenter() {
        var self = this;
        this.ele.onmouseenter = function (e) {
            self.leftButton.style.display = 'block';
            self.rightButton.style.display = 'block';
            // clearInterval(self.no);
        }
    },

    handleclick() {
        var self = this;
        document.onclick = function (e) {
            if (e.target == self.leftButton) {
                // clearInterval(self.no);
                self.nextMove();
            }
            if (e.target == self.rightButton) {
                // clearInterval(self.no);
                self.beforeMove();
            }
            for (let i = 0; i < self.data.length; i++) {
                if (e.target == self.button[i].childNodes[0]) {
                    // clearInterval(self.no);
                    this.exhibition.style.left = -this.width * (1 + i) + "px";
                    self.index = i;
                }
            }
        }
    },

    beforeMove() {
        this.exhibition.style.left = parseInt(this.exhibition.style.left) - this.width + "px";
        if (parseInt(this.exhibition.style.left) == 0) {
            this.index = 4;
        }

    },

    nextMove() {
        // 向后移动一位
        this.exhibition.style.left = parseInt(this.exhibition.style.left) + this.width + "px";
        if (parseInt(this.exhibition.style.left) == this.width * (this.data.length + 1)) {
            this.index = 0;
        }
    },

    refresh() {
        // 用来时时刷新轮播图位置的函数
        var self = this
        this.auto = setInterval(function () {
            if (parseInt(self.exhibition.style.left) == 0) {
                console.log("左边超出归为");
                self.exhibition.style.left = -self.width * self.data.length + "px";
            } else if (parseInt(self.exhibition.style.left) == -self.width * (self.data.length + 1)) {
                self.exhibition.style.left = -self.width + "px";
                console.log("右边超出归为");
            }
        }, 10)
    },

    autoMove() {
        // 用于自动更新index属性
        var self = this
        this.no = setInterval(function () {
            self.indexChange(1)
        }, self.speed)
    },
}

function LoopView(ele, width, height, speed, data, leftButton, rightButton, controlBar) {
    this.ele = ele || document.getElementById("loopview");
    this.exhibition = this.ele.getElementsByClassName("img-player")[0];
    this.controlBar = controlBar || this.ele.getElementsByClassName('select-nav')[0];
    this.leftButton = leftButton || this.ele.getElementsByClassName('select-left')[0];
    this.rightButton = rightButton || this.ele.getElementsByClassName('select-right')[0];
    this.width = width || 520;
    this.height = height || 280;
    this.speed = speed || 2000;
    this.data = data || ["img/img1.webp", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.webp"];
    this.init();
}

new LoopView();