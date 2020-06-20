// 一些自定义封装方法

// 2020-5-8 柯里化函数

// 任意传参柯里化函数
function Curry(fn, length) {
    // fn 代表一个函数传入 length 代表该函数需要传入的固定参数的个数
    var length = length || fn.length;
    return function () {
        if (arguments.length < length) {
            var combined = [fn].concat([].slice.call(arguments, 0))
            return Curry(FixedParmasCurry.apply(this, combined), length - arguments.length);
        } else {
            return fn.apply(this, arguments);
        }
    }
}

// 固定传参柯里化函数
function FixedParmasCurry(fn) {
    var _arg = [].slice.call(arguments, 1)
    return function () {
        var newArg = _arg.concat([].slice.call(arguments, 0))
        return fn.apply(this, newArg);
    }
}

// 上述部分贼难，太难了！！！！

// 格式化日期获取方式
Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, this.getMonth() + 1 > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth() + 1);


    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
}


function tableToExcel(table) {
    let worksheet = 'Sheet1'
    let uri = 'data:application/vnd.ms-excel;base64,';

    //下载的表格模板数据
    let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
    xmlns:x="urn:schemas-microsoft-com:office:excel" 
    xmlns="http://www.w3.org/TR/REC-html40">
    <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
      <x:Name>${worksheet}</x:Name>
      <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
      </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head><body><table>${table.innerHTML}</table></body></html>`;
    //下载模板
    this.href = uri + base64(template)
    this.download = table.name + '.xlsx'
}
//输出base64编码
function base64(s) { return window.btoa(unescape(encodeURIComponent(s))) }