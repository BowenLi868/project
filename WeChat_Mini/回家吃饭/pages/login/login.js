var t = require("../../controllers/loginController.js"), e = require("../../memory/memory.js"), a = require("../../app-config.js");

Page({
    data: {
        phone: "",
        valiCode: "",
        count: 0
    },
    onLoad: function(t) {},
    phoneInput: function(t) {
        var e = t.detail.value;
        e = e.replace(/\D/gm, ""), this.setData({
            phone: e
        });
    },
    valiCodeInput: function(t) {
        var e = t.detail.value;
        e = e.replace(/\D/gm, ""), this.setData({
            valiCode: e
        });
    },
    getValiCode: function() {
        var e = this;
        if (0 == this.data.count) {
            var a = this.data.phone;
            /^1[3456789]\d{9}$/.test(a) ? (wx.showLoading({
                title: "正在发送验证码..."
            }), t.getValiCode({
                phone: a
            }).then(function(t) {
                wx.hideLoading(), 0 != t.code ? wx.showModal({
                    title: "提示",
                    content: t.msg
                }) : (e.setData({
                    valiCode: t.data.code || "",
                    count: 30
                }), setInterval(function() {
                    0 != e.data.count && e.setData({
                        count: e.data.count - 1
                    });
                }, 1e3));
            })) : wx.showModal({
                title: "提示",
                content: "请填写正确的手机号"
            });
        }
    },
    login: function() {
        var o = {
            phone: this.data.phone,
            is_password: 0,
            v_code: this.data.valiCode
        };
        wx.showLoading({
            title: "登录中..."
        }), t.login(o).then(function(n) {
            if (wx.hideLoading(), 0 != n.code) wx.showModal({
                title: "提示",
                content: n.msg
            }); else {
                n.data.phone = o.phone, e.setData("userInfo", n.data);
                var i = {
                    appType: a.appType,
                    openId: e.getData("openId"),
                    utoken: n.data.utoken
                };
                t.signUpUserData(i), wx.navigateBack({
                    delta: 1
                });
            }
        });
    }
});