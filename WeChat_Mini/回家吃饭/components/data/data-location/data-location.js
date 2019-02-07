Component({
    properties: {
        locationStatus: {
            type: String,
            value: "process"
        },
        locationText: {
            type: String,
            value: "定位中..."
        }
    },
    data: {},
    methods: {
        getTextByStatus: function() {
            var t = "";
            switch (this.data.locationStatus) {
              case "process":
                t = "定位中...";
                break;

              case "fail":
                t = "定位失败";
                break;

              case "success":
                t = this.data.locationText;
            }
            return t;
        }
    }
});