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
        this.exhibition.style.width = this.width * (this.data.length + 1);
        this.exhibition.style.height = this.height;
        let contant1 = ""
        let contant2 = ""
        for (let i = 0; i <= this.data.length; i++) {
            if (i == this.data.length) {
                contant1 += `<a href="" class="img"><img src=${this.data[0]} alt=""></a>\n`

            } else {
                contant1 += `<a href="" class="img"><img src=${this.data[i]} alt=""></a>\n`
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
        this.autoMove();
        this.handlemouseenter();
        this.handlemouseleave();
        this.handleclick();
    },

    handlemouseleave() {
        var self = this;
        this.ele.onmouseleave = function (e) {
            self.no = self.autoMove();
            self.leftButton.style.display = 'none';
            self.rightButton.style.display = 'none';
        }
    },

    handlemouseenter() {
        var self = this;
        console.log(this.ele);
        this.ele.onmouseenter = function (e) {
            self.leftButton.style.display = 'block';
            self.rightButton.style.display = 'block';
            clearInterval(self.no);
        }
    },

    handleclick() {
        var self = this;
        document.onclick = function (e) {
            console.log(e.target);
            if (e.target == self.leftButton) {
                clearInterval(self.no);
                self.indexChange(-1);
            }
            if (e.target == self.rightButton) {
                clearInterval(self.no);
                self.indexChange(1);
            }
            for (let i = 0; i < self.data.length; i++) {
                if (e.target == self.button[i].childNodes[0]) {
                    clearInterval(self.no);
                    self.index = i;
                }
            }
        }
    },

    // 改变index的方法
    indexChange(step) {
        // 用于按指定方向更新一步步长的方法
        if (this.index + step > this.data.length) {
            this.index = 0;
        } else if (this.index + step < 0) {
            this.index = this.data.length - 1;
        } else {
            this.index += step;
        }
    },

    refresh() {
        // 用来时时刷新轮播图位置的函数
        var self = this
        this.auto = setInterval(function () {
            console.log(self.index)
            let x = -1 * self.index * self.width + 'px'
            self.exhibition.style.transform = `translate3d(${x}, 0px, 0px)`;
            // self.exhibition.style.backfacevisibility = "hidden";
            console.log(self.index);
            if (self.index == self.data.length) {
                self.index = 0;
                // self.exhibition.style.transform = `translate3d(${x}, 0px, 0px)`;
            }
            for (let i in self.button) {
                self.button[i].className = i == self.index ? 'select' : "";
            }
        }, 40)
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