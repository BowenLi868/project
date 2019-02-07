var e = require("../../../controllers/orderController.js"), t = require("../../../memory/memory.js");

Page({
    data: {
        kitchenID: 0,
        dateType: 0,
        useList: [],
        unuseList: []
    },
    onLoad: function(e) {
        this.setData({
            kitchenID: e.kitchen_id,
            dateType: e.date_type
        }), this.initPage();
    },
    initPage: function(a) {
        var o = this, n = {
            date_type: this.data.dateType,
            kitchen_id: this.data.kitchenID
        };
        n = t.getData("preCheckArgs") || n, e.getUsefulCouponList(n).then(function(e) {
            if (0 == e.code) {
                var t = e.data;
                console.log("优惠券列表:", e), o.setData({
                    useList: t.useList,
                    unuseList: t.unuseList
                });
            }
        });
    },
    choseCoupon: function(e) {
        var a = e.currentTarget.dataset.item;
        t.setData("orderCoupon", a), wx.navigateBack({
            delta: 1
        }), console.group("选中优惠券："), console.log(a), console.groupEnd();
    },
    donotUseCoupon: function(e) {
        t.setData("orderCoupon", {}), wx.navigateBack({
            delta: 1
        });
    }
});