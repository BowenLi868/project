var e = require("../../../memory/memory.js");

Page({
    data: {
        message: "",
        wordNum: 140,
        tags: [ {
            checked: !1,
            text: "多放辣"
        }, {
            checked: !1,
            text: "微辣"
        }, {
            checked: !1,
            text: "不放辣"
        }, {
            checked: !1,
            text: "多点米饭"
        }, {
            checked: !1,
            text: "米饭少些"
        }, {
            checked: !1,
            text: "菜多些"
        }, {
            checked: !1,
            text: "不要香菜"
        }, {
            checked: !1,
            text: "别放葱"
        }, {
            checked: !1,
            text: "少放油"
        }, {
            checked: !1,
            text: "少放盐"
        }, {
            checked: !1,
            text: "记得给醋"
        }, {
            checked: !1,
            text: "尽快送"
        } ],
        checkedArray: []
    },
    onLoad: function(t) {
        var a = e.getData("orderMessageData");
        if (a) {
            var c = a.checkedArray || [], s = this.data.tags;
            c.forEach(function(e) {
                s.forEach(function(t, a) {
                    t.text == e && (s[a].checked = !0);
                });
            }), this.setData({
                tags: s,
                checkedArray: c,
                message: a.message || ""
            });
        }
    },
    inputMessage: function(e) {
        var t = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi, a = e.detail.value;
        (a = a.replace(t, "")).length;
        this.setData({
            message: a,
            wordNum: 140 - a.length
        });
    },
    save: function(t) {
        e.setData("orderMessage", this.data.checkedArray.join(" ") + " " + this.data.message), 
        e.setData("orderMessageData", {
            checkedArray: this.data.checkedArray,
            message: this.data.message
        }), wx.navigateBack({
            delta: 1
        });
    },
    addTag: function(e) {
        var t = this.data.tags, a = [];
        t.forEach(function(c, s) {
            c.text == e.currentTarget.dataset.item.text && (t[s].checked = !t[s].checked), c.checked && a.push(c.text);
        }), this.setData({
            tags: t,
            checkedArray: a
        });
    }
});