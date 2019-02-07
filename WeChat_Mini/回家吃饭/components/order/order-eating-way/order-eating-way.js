Component({
    properties: {
        currentWay: {
            type: Number,
            value: 1
        },
        eatingType: {
            type: Object,
            value: {
                is_distr: 1,
                is_door: 1,
                is_refectory: 1
            }
        }
    },
    data: {},
    methods: {
        switchWay: function(t) {
            var e = t.currentTarget.dataset.way;
            -1 != e && (this.setData({
                currentWay: t.currentTarget.dataset.way
            }), this.triggerEvent("switchWay", {
                way: e
            }, {}));
        }
    }
});