var t = require("../../../memory/memory.js");

Component({
    properties: {
        nearItem: {
            type: Object,
            value: {}
        }
    },
    data: {
        defaultImg: t.getData("defaultDish")
    },
    methods: {
        gotoKitchen: function(t) {
            this.triggerEvent("gotoKitchen", this.data.nearItem, {});
        },
        imgError: function(t) {
            console.log(t);
        }
    }
});