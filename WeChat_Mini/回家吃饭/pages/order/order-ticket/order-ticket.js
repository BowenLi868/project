var t = require("../../../controllers/orderController.js"), e = require("../../../memory/memory.js");

Page({
    data: {
        kitchenID: "",
        useList: [],
        unuseList: []
    },
    onLoad: function(t) {
        this.setData({
            kitchenID: t.kitchen_id
        }), this.initPage();
    },
    initPage: function() {
        var e = this, i = {
            kitchen_id: this.data.kitchenID
        };
        t.getTicketsList(i).then(function(t) {
            0 == t.code && e.setData({
                useList: t.data.useList,
                unuseList: t.data.unuseList
            });
        });
    },
    choseTicket: function(t) {
        var i = t.currentTarget.dataset.item;
        e.setData("orderTicket", i), wx.navigateBack({
            delta: 1
        }), console.group("选中饭票："), console.log(i), console.groupEnd();
    },
    donotUseTicket: function(t) {
        e.setData("orderTicket", {}), wx.navigateBack({
            delta: 1
        });
    }
});