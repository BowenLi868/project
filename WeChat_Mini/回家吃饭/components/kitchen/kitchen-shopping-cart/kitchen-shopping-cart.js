Component({
    properties: {
        cartData: {
            type: Object,
            value: {
                mainFoodName: "米饭",
                mainFoodPrice: 0,
                mainFoodNum: 0,
                shopNumber: 9,
                price: 12,
                startBookPrice: 4,
                btnText: "差10元起订",
                discount: ""
            }
        },
        shopDetail: {
            type: Object,
            value: {}
        },
        collectData: {
            type: Object,
            value: {
                isCollect: !1,
                collectNum: 13
            }
        },
        isShowCartList: {
            type: Boolean,
            value: !1
        },
        isIphonex: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        switchEnjoy: function(t) {
            var a = this.data.collectData;
            this.triggerEvent("switchCollect", a, {});
        },
        book: function(t) {
            var a = this.data.cartData;
            a.startBookPrice <= a.price && this.triggerEvent("orderDish", {}, {}), console.log("订餐");
        },
        switchCartList: function(t) {
            console.log("菜篮打开关系:", this.data.shopDetail), Object.keys(this.data.shopDetail).length <= 1 || this.setData({
                isShowCartList: !this.data.isShowCartList
            });
        },
        clearCartList: function(t) {
            this.setData({
                isShowCartList: !1
            }), this.triggerEvent("shopClearCallBack", t.detail, {});
        },
        callback: function(t) {
            this.triggerEvent("callback", t.detail, {}), Object.keys(this.data.shopDetail).length <= 1 && this.setData({
                isShowCartList: !1
            });
        },
        riceCallback: function(t) {
            this.triggerEvent("riceCallback", t.detail, {});
        },
        viewTomorrow: function(t) {
            this.triggerEvent("viewTomorrow", t.detail, {});
        }
    }
});