var a = {
    getFailData: function() {
        var a = {
            data: {},
            code: 400,
            msg: "请求失败"
        };
        return Object.assign({}, a);
    },
    getValiData: function(a) {
        var t = {
            data: {},
            code: 0,
            msg: a || "数据不合法"
        };
        return Object.assign({}, t);
    },
    failHandle: function(t) {
        return Promise.resolve(t || a.getFailData());
    }
};

module.exports = a;