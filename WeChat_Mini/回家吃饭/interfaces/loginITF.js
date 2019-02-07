var t = require("./interface.js"), o = require("../app-config.js").host, r = {
    getValiCode: function(r) {
        var e = o.kitchenHost + "/Passport/sendVerificationCode";
        return t.post(e, r);
    },
    login: function(r) {
        var e = o.kitchenHost + "/Passport/userLogin";
        return t.post(e, r);
    },
    getUserInfoByWxCode: function(r) {
        var e = o.locationHost + "/api/wxApp/getUserInfoByWxCode";
        return t.post(e, r);
    },
    signUpUserData: function(r) {
        var e = o.locationHost + "/api/wxApp/signUpUserData";
        return t.post(e, r);
    },
    logoutUserData: function(r) {
        var e = o.locationHost + "/api/wxApp/logoutUserData";
        return t.post(e, r);
    }
};

module.exports = r;