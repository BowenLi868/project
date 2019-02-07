var e = require("../../../memory/memory.js");

Component({
    properties: {
        headSrc: {
            type: String,
            value: ""
        },
        headSize: {
            type: String,
            value: "80"
        },
        kitchenFlag: {
            type: String,
            value: ""
        },
        isBetter: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        defaultImg: e.getData("defaultHeader"),
        errorImg: ""
    },
    methods: {
        imgError: function(e) {
            this.setData({
                errorImg: this.data.defaultImg
            });
        }
    }
});