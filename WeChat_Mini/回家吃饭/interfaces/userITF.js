var t = require("./interface.js"), e = require("../app-config.js").host, r = {
    getUserInfo: function(r) {
        var n = e.kitchenHost + "/UserInfo/getMyInfo";
        return t.post(n, r);
    },
    getOrderStatus: function(r) {
        var n = e.kitchenHost + "/UOrderAdapter/newList";
        return t.post(n, r);
    },
    getCurrentOrderStatus: function(r) {
        var n = e.kitchenHost + "/UNOrder/orderLifeV27";
        return t.post(n, r);
    },
    getCurrentOrderDetail: function(r) {
        var n = e.kitchenHost + "/UNOrder/detail";
        return t.post(n, r);
    },
    getStatusEated: function(r) {
        var n = e.kitchenHost + "/UNOrder/finish";
        return t.post(n, r);
    },
    getCancelOrder: function(r) {
        var n = e.kitchenHost + "/UOrderAdapter/cancel";
        return t.post(n, r);
    },
    getCommentList: function(r) {
        var n = e.kitchenHost + "/UComment/PreComment";
        return t.post(n, r);
    },
    getBackOrder: function(r) {
        var n = e.kitchenHost + "/UNOrder/checkRefund";
        return t.post(n, r);
    },
    getBackOrderTwo: function(r) {
        var n = e.kitchenHost + "/UNOrder/getRefundMessage";
        return t.post(n, r);
    }
};

module.exports = r;