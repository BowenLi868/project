Component({
    properties: {
        orderNum: {
            type: Number,
            value: 0
        },
        orderDetail: {
            type: Object,
            value: {}
        },
        orderText: {
            type: String,
            value: ""
        },
        max: {
            type: Number,
            value: 999
        }
    },
    data: {},
    methods: {
        reduce: function() {
            if (this.data.orderNum > 0) {
                var t = this.data.orderNum - 1;
                this.setData({
                    orderNum: t
                });
                var e = this.data.orderDetail;
                e.orderNum = t, this.triggerEvent("callback", e, {});
            }
        },
        plus: function() {
            var t = this.data.orderNum + 1;
            if (!(t > this.data.max)) {
                this.setData({
                    orderNum: t
                });
                var e = this.data.orderDetail;
                e.orderNum = t, this.triggerEvent("callback", e, {});
            }
        }
    }
});