Component({
    properties: {
        btnText: {
            type: String,
            value: "立刻领取"
        },
        phone: {
            type: String,
            value: ""
        }
    },
    data: {
        placeholder: "输入手机号",
        defaultMsg: "*手机号不对呦",
        valiMsg: ""
    },
    methods: {
        input: function(t) {
            var e = t.detail.value, a = "";
            /^1[3456789]\d{9}$/.test(e) || (a = this.data.defaultMsg), this.setData({
                phone: e,
                valiMsg: a
            });
        },
        receive: function(t) {
            /^1[34578]\d{9}$/.test(this.data.phone) ? this.triggerEvent("receive", this.data.phone, {}) : this.setData({
                valiMsg: this.data.defaultMsg
            });
        }
    }
});