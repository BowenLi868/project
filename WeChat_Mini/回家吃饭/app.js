require("./tools/lib/ald-stat.js");

var e = require("controllers/loginController.js"), o = require("memory/memory.js"), t = require("app-config");

App({
    onLaunch: function() {
        this.getLogStatus();
    },
    onHide: function() {
        o.setData("shareHistory", []);
    },
    getLogStatus: function() {
        return new Promise(function(n, a) {
            wx.login({
                success: function(i) {
                    if (i.code) {
                        var s = {
                            appType: t.appType,
                            code: i.code
                        };
                        e.getUserInfoByWxCode(s).then(function(e) {
                            if (o.setData("openId", e.data.openId), 200 == e.code) {
                                var t = {
                                    phone: e.data.phone,
                                    utoken: e.data.utoken
                                };
                                wx.setStorageSync("phone", t.phone), o.setData("userInfo", t);
                            }
                            n();
                        }, function() {
                            a();
                        });
                    }
                }
            });
        });
    },
    checkUtoken: function() {
        return !!o.getData("userInfo").utoken || (wx.showModal({
            title: "提示",
            content: "身份认证失败，请重新登录",
            success: function() {
                wx.navigateTo({
                    url: "/pages/login/login"
                });
            }
        }), !1);
    },
    globalData: {
        defaultDish: "http://image.jiashuangkuaizi.com/image/h5/m/one/dish_background.jpg-resize640",
        defaultHeader: "http://image.jiashuangkuaizi.com/images/kitchen/0/1474274623_13507.png",
        userInfo: {},
        locationInfo: null,
        system: {}
    }
});