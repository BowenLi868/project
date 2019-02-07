Component({
    properties: {
        dishItem: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        orderNumberCallback: function(e) {
            this.triggerEvent("orderNumberCallback", e.detail, {});
        }
    }
});