var t = require("../../../controllers/orderController.js");

Page({
    data: {
        ticketData: []
    },
    onLoad: function(t) {
        var a = this;
        getApp().getLogStatus().then(function() {
            a.initPage();
        });
    },
    initPage: function() {
        var a = this;
        t.otdTickets().then(function(t) {
            a.setData({
                loaded: !0
            }), a.setData({
                ticketData: t.data.unuseList || []
            }), console.log("--过期饭票--", t);
        });
    }
});