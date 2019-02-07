var e = require("./base-tool.js"), t = {
    formatTime: function(e) {
        var t = e.getFullYear(), r = e.getMonth() + 1, n = e.getDate(), o = e.getHours(), i = e.getMinutes(), a = e.getSeconds(), u = function(e) {
            return (e = e.toString())[1] ? e : "0" + e;
        };
        return [ t, r, n ].map(u).join("/") + " " + [ o, i, a ].map(u).join(":");
    },
    isExpire: function(t, r, n) {
        if (n || (n = new Date()), e.isDate(r) && e.isDate(n)) return n - r < +t;
        throw new Error("参数有误，请传Date类型值");
    }
};

module.exports = t;