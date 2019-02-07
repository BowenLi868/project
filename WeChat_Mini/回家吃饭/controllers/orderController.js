var e = require("../models/models.js"), t = require("../interfaces/orderITF.js"), n = require("../memory/memory.js"), r = {
    setOrderForSure: function(n) {
        return t.setOrderForSure(n).then(function(e) {
            return e.code, Promise.resolve(e);
        }, e.failHandle);
    },
    getAddressList: function(n) {
        return t.getAddressList(n).then(function(t) {
            if (0 == t.code) {
                var n = [], r = [];
                t.data.list.forEach(function(t, i) {
                    t.typeName = e.getAddressByType(t.type), t.is_frozen ? r.push(t) : n.push(t);
                }), t.data.usefulList = n, t.data.unUsefulList = r;
            }
            return Promise.resolve(t);
        }, e.failHandle);
    },
    getTimeList: function(n) {
        return t.getTimeList(n).then(function(t) {
            if (0 == t.code) {
                for (var r = 0 == n.date_type ? "今日" : "明日", i = t.data.list[0].type, a = {
                    day: r,
                    title: r + " " + t.data.send_date,
                    dayArray: [],
                    timeArray: []
                }, o = i; o <= 3; o++) a.dayArray.push({
                    index: o,
                    type: o,
                    text: e.getDiningByType(o)
                });
                var u = 0;
                t.data.list.forEach(function(e, t) {
                    a.timeArray.length > 0 ? a.timeArray[a.timeArray.length - 1].type != e.type && (a.dayArray[++u].type = t) : a.dayArray[u].type = t, 
                    a.timeArray.push({
                        time: e.format_time,
                        title: e.title,
                        type: e.type
                    });
                }), t.data = a;
            }
            return Promise.resolve(t);
        }, e.failHandle);
    },
    getUsefulCouponList: function(n, r) {
        return t.getUsefulCouponList(n).then(function(e) {
            if (0 == e.code) {
                var t = [], n = [];
                e.data.coupon_list.forEach(function(e) {
                    var i = [];
                    e.unusable_msg.split(";").forEach(function(e) {
                        e.trim() && i.push(e);
                    });
                    var a = !0;
                    a = r ? e.is_expired : e.is_expired || i.length > 0, e.is_frozen && (i = [ e.frozen_reason ]);
                    var o = {
                        couponID: e.coupon_id,
                        type: e.type,
                        usable: !a,
                        number: e.money,
                        unit: 6 == e.type ? "折优惠券" : "元",
                        highline: e.coupon_title,
                        highText: e.coupon_sub_title,
                        warnArray: [ "· " + e.rule_desc, "· 有效期: " + e.valid_date ],
                        ununableReason: i,
                        is_frozen: e.is_frozen
                    };
                    o.usable ? t.push(o) : n.push(o);
                }), e.data.useList = t, e.data.unuseList = n;
            }
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getTicketsList: function(n) {
        return t.getTicketsList(n).then(function(e) {
            if (0 == e.code) {
                var t = [], r = [];
                e.data.list.forEach(function(e) {
                    var i = {
                        kitchenid: e.kitchen_id,
                        ticketID: e.id,
                        usable: e.usable && e.kitchen_id == n.kitchen_id,
                        has: !1,
                        over: !1,
                        title: e.ticket_title,
                        warnArray: [ "· " + e.rule, "· " + e.expire_time ],
                        ununableReason: [ "· " + e.unusable_msg ]
                    };
                    i.usable ? t.push(i) : r.push(i);
                }), e.data.useList = t, e.data.unuseList = r;
            }
            return Promise.resolve(e);
        }, e.failHandle);
    },
    getPreCheckInfo: function(n) {
        return t.getPreCheckInfo(n).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    setOrder: function(n) {
        return t.setOrder(n).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    pay: function(r) {
        return r.openid = n.getData("openId") || "", t.pay(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    preComment: function(n) {
        return t.preComment(n).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    addComment: function(n) {
        return t.addComment(n).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    otdTickets: function(n) {
        return t.otdTickets(n).then(function(e) {
            var t = [];
            return e.data.list = e.data.list || [], e.data.list.forEach(function(e) {
                var n = {
                    kitchenid: e.kitchen_id,
                    ticketID: e.id,
                    usable: !1,
                    has: !1,
                    over: !1,
                    title: e.ticket_title,
                    warnArray: [ "· " + e.rule, "· " + e.expire_time ],
                    ununableReason: []
                };
                t.push(n);
            }), e.data.unuseList = t, Promise.resolve(e);
        }, e.failHandle);
    },
    otdCoupon: function(n) {
        return t.otdCoupon(n).then(function(e) {
            var t = [];
            return e.data.list = e.data.list || [], e.data.list.forEach(function(e) {
                var n = {
                    couponID: e.coupon_id,
                    type: e.type,
                    usable: !1,
                    number: e.money,
                    unit: 6 == e.type ? "折优惠券" : "元",
                    highline: e.coupon_title,
                    highText: e.coupon_sub_title,
                    warnArray: [ "· " + e.rule_desc, "· 有效期: " + e.valid_date ],
                    ununableReason: [],
                    fromOtd: !0,
                    is_frozen: e.is_frozen
                };
                t.push(n);
            }), e.data.unuseList = t, Promise.resolve(e);
        }, e.failHandle);
    },
    uaCoupon: function(n) {
        return t.uaCoupon(n).then(function(e) {
            var t = [];
            return e.data.coupon_list = e.data.coupon_list || [], e.data.coupon_list.forEach(function(e) {
                var n = [], r = e.is_expired || n.length > 0, i = {
                    couponID: e.coupon_id,
                    type: e.type,
                    usable: !r,
                    number: e.money,
                    unit: 6 == e.type ? "折优惠券" : "元",
                    highline: e.coupon_title,
                    highText: e.coupon_sub_title,
                    warnArray: [ "· " + e.rule_desc, "· 有效期: " + e.valid_date ],
                    ununableReason: n,
                    is_frozen: e.is_frozen
                };
                t.push(i);
            }), e.data.coupon_list = t, Promise.resolve(e);
        }, e.failHandle);
    }
};

module.exports = r;