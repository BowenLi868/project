var t = require("../models/models.js"), e = (require("../tools/tools.js"), require("../interfaces/kitchenITF.js")), i = {
    getKitchenInfo: function(i) {
        return e.getKitchenInfo(i).then(function(t) {
            if (0 == t.code) {
                var e = t.data, i = [];
                e.kitchen_image_url = e.kitchen_image_url.split(",")[0], e.kitchen_notice && i.push(e.kitchen_notice), 
                e.kitchen_tip && i.push(e.kitchen_tip), e.alertInfo = i.join(","), t.data = e;
            }
            return Promise.resolve(t);
        }, t.failHandle);
    },
    getKitchenAuthList: function(i) {
        return e.getKitchenAuthList(i).then(function(t) {
            if (0 == t.code) {
                var e = [], i = [], n = [];
                t.data.list.forEach(function(t) {
                    0 == t.type ? e.push(t) : 1 == t.type ? i.push(t) : 2 == t.type && n.push(t);
                }), t.data = {
                    type0: e,
                    type1: i,
                    type2: n
                };
            }
            return Promise.resolve(t);
        }, t.failHandle);
    },
    getKitchenDishList: function(i) {
        return e.getKitchenDishList(i).then(function(t) {
            if (0 == t.code) {
                var e = t.data.dish_list, n = [], s = 1 == i.date_type;
                e.forEach(function(r, u) {
                    n.push({
                        title: r.title,
                        number: r.list.length,
                        index: u
                    }), r.list.forEach(function(n, r) {
                        e[u].list[r].description = n.description.length > 50 ? n.description.substring(0, 50) + "..." : n.description, 
                        e[u].list[r].thumbnail_image_url = n.thumbnail_image_url.split(",")[0] || "http://image.jiashuangkuaizi.com/image/h5/m/one/dish_background.jpg-resize640", 
                        e[u].list[r].orderNum = 0, e[u].list[r].dateType = i.date_type, e[u].list[r].orderText = s ? "预订明日" : "", 
                        e[u].list[r].stock = s ? 99 : n.stock, e[u].list[r].leftStock = s ? 99 : n.stock, 
                        (s && !t.data.tmr_in_business || !s && !t.data.tod_in_business) && (e[u].list[r].stock_notice = "休息中");
                    });
                }), t.data.titleList = n;
            }
            return Promise.resolve(t);
        }, t.failHandle);
    },
    getKitchenCommentList: function(i) {
        return i.size = 10, e.getKitchenCommentList(i).then(function(e) {
            if (0 == e.code) {
                var i = e.data.list;
                i.forEach(function(e, n) {
                    var s = i[n].send_type;
                    s = 1 == s ? 0 : s, i[n].send_type = t.getSendByType(s), i[n].thumbnail_image_url = i[n].thumbnail_image_url ? i[n].thumbnail_image_url.split(",") : [];
                });
            }
            return Promise.resolve(e);
        }, t.failHandle);
    },
    getTicketsList: function(i) {
        return e.getTicketsList(i).then(function(t) {
            if (0 == t.code) {
                var e = [];
                t.data.ticket_list.forEach(function(t) {
                    e.push({
                        ticketID: t.ticket_id,
                        usable: 0 == t.pickup_status || 3 == t.pickup_status,
                        has: 3 == t.pickup_status,
                        over: 1 == t.pickup_status || 2 == t.pickup_status,
                        title: t.ticket_title,
                        warnArray: [ "· " + t.rule, "· " + t.expire_time ],
                        ununableReason: [ "· ", "· " ],
                        type: 3 == t.pickup_status ? "has" : 1 == t.pickup_status || 2 == t.pickup_status ? "over" : ""
                    });
                }), t.data.list = e.slice(0, 3);
            }
            return Promise.resolve(t);
        }, t.failHandle);
    },
    getTicketForSelf: function(i) {
        return e.getTicketForSelf(i).then(function(t) {
            return Promise.resolve(t);
        }, t.failHandle);
    },
    switchCollect: function(i) {
        return e.switchCollect(i).then(function(t) {
            return Promise.resolve(t);
        }, t.failHandle);
    }
};

module.exports = i;