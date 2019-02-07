Component({
    properties: {
        timeData: {
            type: Object,
            value: {
                day: "今日",
                title: "今日 08月10日",
                dayArray: [ "今日", "明日" ],
                timeArray: []
            }
        }
    },
    data: {
        dayScrollHeight: 0,
        timeScrollHeight: 0,
        dayInto: "day-2",
        timeInto: "time-2",
        dayIndex: 0,
        timeIndex: 0
    },
    methods: {
        dayScroll: function(t) {
            var a = this;
            if (this.data.dayEnd) this.setData({
                dayEnd: !1
            }); else {
                var e = t.detail.scrollTop;
                wx.createSelectorQuery().in(this).select("#day-2").boundingClientRect(function(t) {
                    var i = t.height, d = i / 2, n = parseInt(e / i);
                    n += e % i > d ? 1 : 0, n -= 2, console.log("dayIndex", n), n >= a.data.timeData.dayArray.length + 4 || a.setData({
                        dayEnd: !0,
                        dayInto: "day" + n,
                        dayIndex: +n + 2,
                        timeInto: "time" + (a.data.timeData.dayArray[+n + 2].type - 2),
                        timeIndex: a.data.timeData.dayArray[+n + 2].type
                    });
                }).exec();
            }
        },
        touchEnd: function(t) {
            var a = this.data.dayIndex, e = this.data.timeIndex;
            this.setData({
                dayInto: "day" + (a - 2),
                timeInto: "time" + (e - 2)
            });
        },
        timeScroll: function(t) {
            var a = this;
            if (this.data.timeEnd) this.setData({
                timeEnd: !1
            }); else {
                var e = t.detail.scrollTop;
                wx.createSelectorQuery().in(this).select("#day-2").boundingClientRect(function(t) {
                    var i = t.height, d = i / 2, n = parseInt(e / i);
                    if (n += e % i > d ? 1 : 0, console.log("timeIndex", n), !(n >= a.data.timeData.timeArray.length)) {
                        for (var r = 0, y = 0; y < a.data.timeData.dayArray.length; y++) if (a.data.timeData.dayArray[y].index == a.data.timeData.timeArray[n].type) {
                            r = y;
                            break;
                        }
                        a.setData({
                            timeEnd: !0,
                            timeInto: "time" + (n - 2),
                            timeIndex: +n,
                            dayInto: "day" + (r - 2),
                            dayIndex: r
                        });
                    }
                }).exec();
            }
        },
        clickDay: function(t) {
            this.setData({
                dayInto: "day" + (t.currentTarget.dataset.index - 2)
            });
        },
        clickTime: function(t) {
            this.setData({
                timeInto: "time" + (t.currentTarget.dataset.index - 2)
            });
        },
        cancleHandle: function(t) {
            this.triggerEvent("cancleHandle", {}, {});
        },
        saveHandle: function(t) {
            var a = this.data.timeIndex >= this.data.timeData.timeArray.length ? this.data.timeIndex - 1 : this.data.timeIndex, e = {
                day: this.data.timeData.day,
                time: this.data.timeData.timeArray[a].time
            };
            this.triggerEvent("saveHandle", e, {});
        }
    }
});