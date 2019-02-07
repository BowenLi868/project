var t = require("../tools/tools.js"), n = {
    data: {},
    init: function() {
        n.data = getApp() ? getApp().globalData : n.data;
    },
    getData: function(o) {
        if (n.init(), "string" != typeof o) throw new Error("参数有误，请传String类型值");
        if (n.data.hasOwnProperty(o)) return t.copy(n.data[o]);
    },
    setData: function(o, r) {
        if (n.init(), "string" != typeof o) throw new Error("参数有误，键名请传String类型值");
        return n.data[o] = t.copy(r), r;
    },
    removeData: function(t) {
        if (n.init(), "string" != typeof t) throw new Error("参数有误，键名请传String类型值");
        n.data.hasOwnProperty(t) && delete n.data[t];
    },
    checkUtoken: function() {
        return !!n.getData("userInfo").utoken || (wx.showModal({
            title: "提示",
            content: "身份认证失败，请重新登录",
            success: function() {
                wx.navigateTo({
                    url: "/pages/login/login"
                });
            }
        }), !1);
    }
};

module.exports = n;