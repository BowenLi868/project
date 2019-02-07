Component({
    properties: {
        ticketsData: {
            type: Array,
            value: {}
        },
        ticketData: {
            type: Object,
            value: {
                usable: !1,
                has: !1,
                over: !0,
                title: "满20减8",
                warnArray: [ "· 仅限在 大王来了 厨房使用", "· 有效期：2016.08.01至2016.08.03" ],
                ununableReason: [ "· 原有的不可用优惠券的toast内容", "· 原有的不可用优惠券的toast内容" ]
            }
        },
        unusableData: {
            type: Object,
            value: {
                usable: !1,
                has: !1,
                over: !1,
                title: "满20减8",
                warnArray: [ "· 仅限在 大王来了 厨房使用", "· 有效期：2016.08.01至2016.08.03" ],
                ununableReason: [ "· 原有的不可用优惠券的toast内容", "· 原有的不可用优惠券的toast内容" ]
            }
        }
    },
    data: {},
    methods: {
        closeTicketDetail: function(t) {
            this.triggerEvent("closeTicketDetail", {}, {});
        },
        choseTicket: function(t) {
            this.triggerEvent("choseTicket", t.detail, {});
        }
    }
});