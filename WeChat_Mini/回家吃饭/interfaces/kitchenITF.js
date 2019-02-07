var t = require("./interface.js"), e = require("../app-config.js").host, i = {
    getKitchenInfo: function(i) {
        var n = e.kitchenHost + "/Kitchen/kitchenDetail";
        return t.post(n, i);
    },
    getKitchenAuthList: function(i) {
        var n = e.kitchenHost + "/UKitchen/authList";
        return t.post(n, i);
    },
    getKitchenDishList: function(i) {
        var n = e.kitchenHost + "/Kitchen/dishList";
        return t.post(n, i);
    },
    getKitchenCommentList: function(i) {
        var n = e.kitchenHost + "/UComment/getListByKitchenIdTags";
        return t.post(n, i);
    },
    getTicketsList: function(i) {
        var n = e.kitchenHost + "/UKitchen/ticketList";
        return t.post(n, i);
    },
    getTicketForSelf: function(i) {
        var n = e.kitchenHost + "/User/pullTicket";
        return t.post(n, i);
    },
    switchCollect: function(i) {
        var n = e.kitchenHost + ("add" == i.type ? "/UCollection/add" : "/UCollection/remove");
        return delete i.type, t.post(n, i);
    }
};

module.exports = i;