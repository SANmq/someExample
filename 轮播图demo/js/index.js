LoopView.prototype = {

    init: function () {
        // 定义初始的展示位置大小,没有填充默认大小
        this.initData();
        this.render();
        this.handle();
    },

    initData: function () {
        //  初始化图片位置，
        this.index = 1;
        // 初始化展布宽高
        this.exhibition.style.width = this.width * (this.length + 2) + "px";
        this.exhibition.style.height = this.height + "px";
        // 初始化展布位置
        this.exhibition.style.left = -this.width * this.index + "px";

    },

    render: function () {
        // 产生临时插入值
        let contant1 = ""
        let contant2 = ""
        for (let i = 0; i <= this.length + 1; i++) {
            if (i == 0) {
                contant1 += `<a href="" class="img"><img src=${this.data[this.data.length - 1]} alt=""></a>\n`

            } else if (i == this.length + 1) {
                contant1 += `<a href="" class="img"><img src=${this.data[0]} alt=""></a>\n`

            } else {
                contant1 += `<a href="" class="img"><img src=${this.data[i - 1]} alt=""></a>\n`
                contant2 += `<li><a href="javascript:void(0)"></a></li>`
            }
        }
        this.exhibition.innerHTML = contant1;
        this.controlBar.innerHTML = contant2;
        // 更新小圆点的位置
        this.button = this.controlBar.childNodes;
        // this.button[this.index - 1].className = 'select';
        this.bindpoint();
    },

    // 更新小圆点的位置
    bindpoint() {
        for (let i = 0; i < this.length; i++) {
            if (i == this.index - 1) {
                this.button[i].className = 'select';
            } else {
                this.button[i].className = '';
            }
        }
    },

    move(dis) {
        // 每次移动前先更新index的位置
        // if (this.index - dis / this.width < 1) {
        //     this.index = this.length;
        // } else if (this.index - dis / this.width > this.length) {
        //     this.index = 1;
        // } else {
        //     this.index -= dis / this.width;
        // }
        // this.bindpoint();

        // 移动一次的动画时间
        let time = 0.1;
        // 移动一次的步长
        let step = dis * 0.1;
        let self = this;
        let pos = parseInt(self.exhibition.style.left)

        this.no1 = setInterval(function () {
            self.exhibition.style.left += step
        }, 10);






        // let self = this;
        // var allTime = 400;
        // var eachTime = 10;
        // var eachDis = dis / (allTime / eachTime);
        // var newDis = parseInt(self.exhibition.style.left) + dis;
        // // flag = false;
        // // clearInterval(self.no1);
        // function eachMove() {
        //     if (dis < 0 && parseInt(self.exhibition.style.left) > newDis || dis > 0 && parseInt(self.exhibition.style.left) < newDis) {
        //         self.exhibition.style.left = parseInt(self.exhibition.style.left) + eachDis + 'px';
        //     } else {
        //         flag = true;
        //         clearInterval(self.no1);
        //         self.exhibition.style.left = newDis + 'px';
        //         //设置无限滚动
        //         console.log(newDis)
        //         if (newDis == 0) {
        //             self.exhibition.style.left = -self.width * self.data.length + 'px';
        //         }
        //         if (newDis == -(self.width * (self.data.length + 1))) {
        //             self.exhibition.style.left = -self.width + 'px';
        //         }

        //     }
        // }
        // self.no1 = setInterval(eachMove, 10);
    },

    handle: function () {
        // this.handlemouseenter();
        // this.handlemouseleave();
        this.handleclick();
    },

    handlemouseleave() {
        var self = this;
        this.ele.onmouseleave = function (e) {
            self.leftButton.style.display = 'none';
            self.rightButton.style.display = 'none';
        }
    },

    handlemouseenter() {
        var self = this;
        this.ele.onmouseenter = function (e) {
            self.leftButton.style.display = 'block';
            self.rightButton.style.display = 'block';
        }
    },

    handleclick() {
        var self = this;
        this.leftButton.onclick = function () {

        };

        this.rightButton.onclick = function () {

        };

        for (let i = 0; i < this.length; i++) {
            self.button[i].onclick = (function (j) {
                return function () {
                    self.index = j + 1;
                    self.bindpoint();
                }
            }(i))
        }
    }
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
    this.length = this.data.length
    this.init();
}

new LoopView();