var e = require("../models/models.js"), t = require("../interfaces/userITF.js"), r = {
    getUserInfo: function(r) {
        return t.getUserInfo(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getOrderStatus: function(r) {
        return t.getOrderStatus(r).then(function(t) {
            return 0 == t.code && t.data.list.forEach(function(r, n) {
                "515052264994723" == r.order_no && console.log("515052264994723", r), t.data.list[n] = {
                    headSrc: r.kitchen_image_url,
                    userName: r.kitchen_name,
                    eatingTime: r.receive_time,
                    orderID: r.order_no,
                    userID: r.user_id,
                    orderType: r.order_tip,
                    orderPay: r.pay_fee,
                    kitchenID: r.kitchen_id,
                    sendType: r.send_type,
                    currentStatus: r.current_status,
                    toPayFee: r.to_pay_fee,
                    orderStatus: r.order_status,
                    sendWord: e.getSendByType(r.send_type)
                };
            }), Promise.resolve(t);
        }, e.failHandle);
    },
    getCurrentOrderStatus: function(r) {
        return t.getCurrentOrderStatus(r).then(function(e) {
            if (0 == e.code) {
                var t = [];
                e.data.time_list.forEach(function(e) {
                    t = t.concat(e.list);
                }), t.reverse(), t.forEach(function(e, r) {
                    if (400 == e.status) {
                        var n = e.bg_msg.split(e.dm_phone);
                        t[r].msgArray = n;
                    }
                    if (600 == e.status) {
                        var o = e.bg_msg.split("联系家厨");
                        t[r].callCookMsg = o;
                    }
                }), e.data.time_list = t;
            }
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getCurrentOrderDetail: function(r) {
        return t.getCurrentOrderDetail(r).then(function(t) {
            return t.data.sendWord = e.getDineAddressByType(t.data.send_type), Promise.resolve(t);
        }, e.failHandle);
    },
    getStatusEated: function(r) {
        return t.getStatusEated(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getCancelOrder: function(r) {
        return t.getCancelOrder(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getCommentList: function(r) {
        return t.getCommentList(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getBackOrder: function(r) {
        return t.getBackOrder(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getBackOrderTwo: function(r) {
        return t.getBackOrderTwo(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    }
};

module.exports = r;