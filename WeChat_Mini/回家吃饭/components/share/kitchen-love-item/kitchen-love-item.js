var e = require("../../../memory/memory.js");

Component({
    properties: {
        item: {
            type: Object,
            value: {}
        }
    },
    data: {
        defaultImg: e.getData("defaultDish")
    },
    methods: {}
});