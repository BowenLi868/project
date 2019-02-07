require("../../../controllers/locationController.js");

var e = require("../../../controllers/orderController.js"), t = require("../../../controllers/addressController.js"), s = require("../../../memory/memory.js");

Page({
    data: {
        kitchenID: "",
        coordinate: "",
        usefulList: [],
        unUsefulList: []
    },
    onLoad: function(e) {
        this.setData({
            kitchenID: e.kitchenID
        }), this.initPage();
    },
    onShow: function() {
        this.checkUtoken() && this.initPage();
    },
    initPage: function() {
        var t = this, a = s.getData("locationInfo"), n = {
            coordinate: a ? a.location : "",
            kitchen_id: this.data.kitchenID
        };
        e.getAddressList(n).then(function(e) {
            0 == e.code && (t.setData({
                usefulList: e.data.usefulList,
                unUsefulList: e.data.unUsefulList
            }), console.log("我的地址列表:", e)), t.setData({
                loaded: !0
            });
        });
    },
    addAddress: function() {
        this.checkUtoken() && wx.navigateTo({
            url: "/pages/address/address"
        });
    },
    editAddress: function(e) {
        this.checkUtoken() && (s.setData("addressEditData", e.currentTarget.dataset.item), 
        wx.navigateTo({
            url: "/pages/address/address?id=" + e.currentTarget.dataset.item.address_id
        }));
    },
    chooseAddress: function(e) {
        if (this.checkUtoken()) {
            var t = e.currentTarget.dataset.item, a = this.data.usefulList;
            a.forEach(function(e, s) {
                e.address_id == t.address_id ? a[s].isChosed = !0 : a[s].isChosed = !1;
            }), this.setData({
                usefulList: a
            }), t.address_id && (s.setData("orderAddress", {
                addressID: t.address_id,
                typeName: t.typeName,
                user: t.name + " " + t.phone,
                address: t.address,
                linkman: t.name,
                phone: t.phone
            }), wx.navigateBack({
                delta: 1
            }));
        }
    },
    unusefulTap: function(e) {
        wx.showModal({
            title: "提示",
            content: "该地址不在配送范围之内"
        });
    },
    removeTap: function(e) {
        var t = this;
        if (this.checkUtoken()) {
            var s = e.currentTarget.dataset.item.address_id;
            wx.showModal({
                title: "温馨提示",
                content: "确认删除该条送餐地址",
                success: function(e) {
                    e.confirm ? t.cancleAddress(s) : e.cancel && console.log("取消");
                }
            });
        }
    },
    cancleAddress: function(e) {
        var a = this, n = e;
        t.cancleAddress({
            address_id: n
        }).then(function(e) {
            0 == e.code && (wx.showToast({
                image: "/images/alert.png",
                title: "删除成功"
            }), (s.getData("orderAddress") || {}).addressID == n && s.setData("orderAddress", {}), 
            a.initPage());
        });
    },
    checkUtoken: function() {
        return !!s.getData("userInfo").utoken || (wx.showModal({
            title: "提示",
            content: "身份认证失败，请重新登录",
            success: function() {
                wx.navigateTo({
                    url: "/pages/login/login"
                });
            }
        }), !1);
    }
});