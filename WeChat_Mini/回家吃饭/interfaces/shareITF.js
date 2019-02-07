var t = require("./interface.js"), o = require("../app-config.js").host, e = {
    getExclusive: function(e) {
        var n = o.locationHost + "/api/OperateActivityCoupon/WebActiveDetails";
        return t.post(n, e);
    },
    getExclusiveCoupon: function(e) {
        var n = o.locationHost + "/api/V201702/NewUserExclusiveCoupon";
        return t.post(n, e);
    },
    getPacket: function(e) {
        var n = o.locationHost + "/api/RedPaper/OnlineRedPaperDetails";
        return t.post(n, e);
    },
    getPacketCoupon: function(e) {
        var n = o.locationHost + "/api/RedPaper/RedPaperResult";
        return t.post(n, e);
    },
    getDandelionInviter: function(e) {
        var n = o.locationHost + "/api/V201608/PuGongYingCommendUser";
        return t.post(n, e);
    },
    getDandelionKitchen: function(e) {
        var n = o.locationHost + "/api/V201608/PuGongYingCommendKitchen";
        return t.post(n, e);
    },
    getDandelionCoupon: function(e) {
        var n = o.locationHost + "/activities/pugongying/attend";
        return t.post(n, e);
    },
    getActivity: function(e) {
        var n = o.locationHost + "/api/OperateActivityCoupon/WebActiveDetails";
        return t.post(n, e);
    },
    getActivityCoupon: function(e) {
        var n = o.locationHost + "/api/OperateActivityCoupon/PutOutCoupon";
        return t.post(n, e);
    },
    getIndexFloatImg: function(e) {
        var n = o.kitchenHost + "/AppActivity/getByPageKey";
        return t.post(n, e);
    }
};

module.exports = e;