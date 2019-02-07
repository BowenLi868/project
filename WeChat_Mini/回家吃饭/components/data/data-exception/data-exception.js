Component({
    properties: {
        exceptionType: {
            type: String,
            value: "nokitchen"
        }
    },
    data: {},
    methods: {
        recommend: function() {
            console.log("推荐家厨");
        }
    }
});