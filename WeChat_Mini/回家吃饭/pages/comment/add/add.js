var t = require("../../../controllers/orderController.js"), a = require("../../../models/models.js"), e = require("../../../memory/memory.js");

Page({
    data: {
        sendStar: 0,
        sendStarTxt: "",
        kitchenStar: 0,
        kitchenStarTxt: "",
        timeTag: {},
        expTag: {},
        orderTag: {},
        word: "",
        wordLength: 0,
        dishTag: {},
        preComment: {},
        orderId: 0,
        location: "0,0",
        starAdvice: {
            0: "是吃货总会想遇，给家厨一些鼓励或建议吧",
            1: "哪里不满意？写评价告诉我们，家厨和我们一起改进",
            2: "哪里不满意？写评价告诉我们，家厨和我们一起改进",
            3: "感觉一般？给我们提点建议吧",
            4: "是吃货总会想遇，给家厨一些鼓励或建议吧",
            5: "是吃货总会想遇，给家厨一些鼓励或建议吧"
        }
    },
    onLoad: function(t) {
        var a = this;
        this.setData({
            orderId: t.orderid,
            u_id: t.u_id
        });
        var i = e.getData("locationInfo") ? e.getData("locationInfo").location : null, o = this;
        i ? o.setData({
            location: i
        }) : wx.getLocation({
            type: "gcj02",
            success: function(t) {
                i = t.longitude + "," + t.latitude, o.setData({
                    location: i
                });
            }
        }), getApp().getLogStatus().then(function() {
            a.initPage();
        });
    },
    initPage: function() {
        var e = this, i = {
            order_no: this.data.orderId,
            coordinate: this.data.location,
            u_id: this.data.u_id
        };
        t.preComment(i).then(function(t) {
            if (e.setData({
                loaded: !0
            }), 0 == t.code) {
                var i = t.data;
                i.send_type_text = a.getSendByType(i.send_type), e.setData({
                    preComment: i
                }), console.log("--preComment--", t);
            }
        });
    },
    setSendStar: function(t) {
        if (!this.data.focusText) {
            console.log("--配送打分--", t);
            var a = t.currentTarget.dataset.num;
            this.setData({
                sendStar: a,
                sendStarTxt: this.getTxtByStar(a),
                timeTag: {},
                expTag: {}
            });
        }
    },
    setKitchenStar: function(t) {
        if (!this.data.focusText) {
            console.log("--厨房打分--", t);
            var a = t.currentTarget.dataset.num;
            this.setData({
                kitchenStar: a,
                kitchenStarTxt: this.getTxtByStar(a),
                orderTag: {}
            });
        }
    },
    getTxtByStar: function(t) {
        return {
            1: "非常不满意",
            2: "不满意",
            3: "一般",
            4: "满意",
            5: "非常满意"
        }[t];
    },
    chooseTimeTag: function(t) {
        var a = t.currentTarget.dataset.item.tag, e = this.data.timeTag;
        e[a] = !e[a];
        var i = {};
        i[a] = e[a], this.setData({
            timeTag: i
        });
    },
    chooseExpTag: function(t) {
        var a = t.currentTarget.dataset.item.tag, e = this.data.expTag;
        e[a] = !e[a], this.setData({
            expTag: e
        });
    },
    chooseOrderTag: function(t) {
        var a = t.currentTarget.dataset.item.tag, e = this.data.orderTag;
        e[a] = !e[a], this.setData({
            orderTag: e
        });
    },
    inputWord: function(t) {
        var a = this.data.word;
        a = t.detail.value.length < 500 ? t.detail.value : t.detail.value.substring(0, 500), 
        this.setData({
            word: a,
            wordLength: a.length
        });
    },
    setZan: function(t) {
        var a = t.currentTarget.dataset.item.dish_id, e = this.data.dishTag;
        e[a] = "zan" == e[a] ? "" : "zan", this.setData({
            dishTag: e
        });
    },
    setCai: function(t) {
        var a = t.currentTarget.dataset.item.dish_id, e = this.data.dishTag;
        e[a] = "cai" == e[a] ? "" : "cai", this.setData({
            dishTag: e
        });
    },
    submitComment: function() {
        var a = this.data, e = {
            order_no: a.orderId,
            distr_star: a.sendStar,
            star: a.kitchenStar,
            content: a.word,
            tag_id: "",
            praise: "",
            is_collect: a.preComment.is_collected,
            coordinate: a.location,
            u_id: a.u_id
        };
        if (e.distr_star || 1 != a.preComment.send_type) if (e.star) {
            var i = a.preComment.praise, o = a.dishTag, n = [];
            i.forEach(function(t) {
                o[t.dish_id] && n.push({
                    dish_id: t.dish_id,
                    dish_name: t.dish_name,
                    is_praise: "zan" == o[t.dish_id] ? 1 : 0
                });
            }), e.praise = JSON.stringify(n);
            var s = [];
            for (var r in a.timeTag) a.timeTag && s.push(r);
            for (var d in a.expTag) a.expTag && s.push(d);
            for (var c in a.orderTag) a.orderTag && s.push(c);
            e.tag_id = s.join(","), console.log("--评论数据--", e), t.addComment(e).then(function(t) {
                0 == t.code ? wx.showModal({
                    title: "温馨提示",
                    content: "评论成功",
                    showCancel: !1,
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }) : wx.showModal({
                    title: "温馨提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function() {}
                });
            });
        } else wx.showModal({
            title: "温馨提示",
            content: "请为饭菜口味打分",
            showCancel: !1
        }); else wx.showModal({
            title: "温馨提示",
            content: "请为配送服务打分",
            showCancel: !1
        });
    },
    focusText: function() {
        this.setData({
            focusText: !0
        });
    },
    blurText: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                focusText: !1
            });
        }, 100);
    }
});