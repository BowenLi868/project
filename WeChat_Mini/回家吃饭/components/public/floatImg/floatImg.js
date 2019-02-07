Component({
    properties: {
        page: {
            type: String,
            value: ""
        },
        src: {
            type: String,
            value: ""
        },
        isShow: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        linkTo: function() {
            this.data.page && (this.triggerEvent("linkToCallBack", {}, {}), wx.navigateTo({
                url: "/pages/" + this.data.page
            }));
        },
        close: function() {
            this.setData({
                isShow: !1
            });
        }
    }
});