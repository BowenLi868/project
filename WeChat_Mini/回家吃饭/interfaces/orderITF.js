var t = require("./interface.js"), e = require("../app-config.js").host, n = {
    setOrderForSure: function(n) {
        var o = e.kitchenHost + "/Order/foodPreCheck";
        return t.post(o, n);
    },
    getAddressList: function(n) {
        var o = e.kitchenHost + "/UAddress/list";
        return t.post(o, n);
    },
    getTimeList: function(n) {
        var o = e.kitchenHost + "/Kitchen/getDiningTimeList";
        return t.post(o, n);
    },
    getUsefulCouponList: function(n) {
        var o = e.kitchenHost + "/User/wallet";
        return t.post(o, n);
    },
    getTicketsList: function(n) {
        var o = e.kitchenHost + "/User/getMyTicket";
        return t.post(o, n);
    },
    getPreCheckInfo: function(n) {
        var o = e.kitchenHost + "/Order/preCheck";
        return t.post(o, n);
    },
    setOrder: function(n) {
        var o = e.kitchenHost + "/Order/add";
        return t.post(o, n);
    },
    pay: function(n) {
        var o = e.kitchenHost + "/UPayment/pay";
        return t.post(o, n);
    },
    preComment: function(n) {
        var o = e.kitchenHost + "/UComment/preComment";
        return t.post(o, n);
    },
    addComment: function(n) {
        var o = e.kitchenHost + "/UComment/add";
        return t.post(o, n);
    },
    otdTickets: function(n) {
        var o = e.kitchenHost + "/Coupon/outOfDateTickets";
        return t.post(o, n);
    },
    otdCoupon: function(n) {
        var o = e.kitchenHost + "/Coupon/outOfDateCoupons";
        return t.post(o, n);
    },
    uaCoupon: function(n) {
        var o = e.kitchenHost + "/Coupon/usableCouponList";
        return t.post(o, n);
    }
};

module.exports = n;