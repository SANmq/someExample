
(function ($) {
    function upfile(option, dom) {
        this.wrapper = dom;
        this.url = option.url || "#"
        this.item = option.item || []
        this.render()

    }

    upfile.prototype = {
        // 用于渲染内部元素
        render() {
            this.wrapper.addClass("Smq-plus-upload")

            this.folder = $(`<ul></ul>`).addClass("folder")
            this.submit = $(`<button type="submit">上传按钮</button>`)
            this.pmgressbar = $(`<div class="pmgressbar"><span></span>当前进度0%</div>`)
            this.item.push($(`<li class="item empty"><div class="file"><input type="file"></div><span class="info">上传文件</span></li>`).appendTo(this.folder))
            this.form = $('<form></form>').attr({
                action: this.url,
                method: 'post'
            })



        }
    }




    $.fn.uploadView = function (option) {
        // 需要的一些配置
        // this是所选位置的区域，初始化内容的宽高
        // 生成添加文件的框，如果是图片则显示缩略图。
        // url文件上传地址
        // item传入一个已有文件信息的dom列表

        let obj = new upfile(option, this)


        return this
    }



}(jQuery))




$("#app1").uploadView({
    url: "/img"
})
