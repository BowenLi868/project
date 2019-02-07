Component({
    properties: {
        ticketData: {
            type: Object,
            value: {
                usable: !0,
                number: "5",
                unit: "折优惠券",
                highline: "18元享美味",
                highText: "邻家便当",
                warnArray: [ "· 仅限在 大王来了 厨房使用", "· 有效期：2016.08.01至2016.08.03" ],
                ununableReason: [ "· 原有的不可用优惠券的toast内容", "· 原有的不可用优惠券的toast内容" ]
            }
        }
    },
    data: {
        isOpenUnUnable: !1
    },
    methods: {
        switchOpenReason: function(t) {
            this.data.ticketData.is_frozen, this.setData({
                isOpenUnUnable: !this.data.isOpenUnUnable
            });
        }
    }
});