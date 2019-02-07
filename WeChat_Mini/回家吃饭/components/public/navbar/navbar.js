Component({
    properties: {
        kitchenPage: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        gotoCenter: function() {
            wx.navigateTo({
                url: "/pages/user/user"
            });
        },
        gotoMain: function() {
            wx.reLaunch({
                url: "/pages/index/index"
            });
        }
    }
});