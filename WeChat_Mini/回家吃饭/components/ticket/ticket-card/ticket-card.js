Component({
    properties: {
        ticketData: {
            type: Object,
            value: {
                usable: !0,
                has: !0,
                over: !1,
                title: "满20减8",
                warnArray: [ "· 仅限在 大王来了 厨房使用", "· 有效期：2016.08.01至2016.08.03" ],
                ununableReason: [ "· 原有的不可用优惠券的toast内容", "· 原有的不可用优惠券的toast内容" ]
            }
        },
        fromMy: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        isOpenUnUnable: !1
    },
    methods: {
        switchOpenReason: function(t) {
            this.setData({
                isOpenUnUnable: !this.data.isOpenUnUnable
            });
        },
        choseTicket: function(t) {
            this.triggerEvent("choseTicket", this.data.ticketData, {});
        },
        gotoKitchen: function(t) {
            var e = this.ticketData.kitchenid;
            wx.navigateTo({
                url: "/pages/kitchen/kitchen?kitchenid=" + e
            });
        }
    }
});