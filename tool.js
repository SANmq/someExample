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
