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
        this.no1;
        this.no2;



    },

    render: function () {
        this.exhibition.style.width = this.width * (this.data.length + 2) + "px";
        this.exhibition.style.height = this.height + "px";
        this.exhibition.style.left = -this.width + "px";
        let contant1 = ""
        let contant2 = ""
        for (let i = 0; i <= this.data.length + 1; i++) {
            if (i == 0) {
                contant1 += `<a href="" class="img"><img src=${this.data[this.data.length - 1]} alt=""></a>\n`

            } else if (i == this.data.length + 1) {
                contant1 += `<a href="" class="img"><img src=${this.data[0]} alt=""></a>\n`

            } else {
                contant1 += `<a href="" class="img"><img src=${this.data[i - 1]} alt=""></a>\n`
                contant2 += `<li><a href="javascript:void(0)"></a></li>`
            }
        }
        this.exhibition.innerHTML = contant1;
        this.controlBar.innerHTML = contant2;
        // 渲染小按钮
        this.button = this.controlBar.childNodes;
        this.button[this.index].className = 'select';
    },

    bindpoint() {

    },

    move(dis) {
        //设置每一移动一小步
        let self = this;
        var allTime = 400;
        var eachTime = 10;
        var eachDis = dis / (allTime / eachTime);
        var newDis = parseInt(self.exhibition.style.left) + dis;
        // flag = false;
        // clearInterval(self.no1);
        function eachMove() {
            if (dis < 0 && parseInt(self.exhibition.style.left) > newDis || dis > 0 && parseInt(self.exhibition.style.left) < newDis) {
                self.exhibition.style.left = parseInt(self.exhibition.style.left) + eachDis + 'px';
            } else {
                flag = true;
                clearInterval(self.no1);
                self.exhibition.style.left = newDis + 'px';
                //设置无限滚动
                console.log(newDis)
                if (newDis == 0) {
                    self.exhibition.style.left = -self.width * self.data.length + 'px';
                }
                if (newDis == -(self.width * (self.data.length + 1))) {
                    self.exhibition.style.left = -self.width + 'px';
                }

            }
        }
        self.no1 = setInterval(eachMove, 10);
    },

    handle: function () {
        this.handlemouseenter();
        this.handlemouseleave();
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
        self.leftButton.onclick = function(){
            self.move(self.width)
            self.index = self.index == 0 ? self.data.length : self.index - 1;
        }

        document.onclick = function (e) {
            if (e.target == self.rightButton) {
                self.move(-self.width)
                self.index = self.index == self.data.length ? 0 : self.index + 1;
            }
            for (let i = 0; i < self.data.length; i++) {
                if (e.target == self.button[i].childNodes[0]) {
                    self.move(self.width * (self.index - i))
                    self.index = i;
                }
            }
        }
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