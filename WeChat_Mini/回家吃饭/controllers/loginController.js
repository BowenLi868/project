var e = require("../models/models.js"), n = require("../interfaces/loginITF.js"), r = require("../app-config.js"), o = require("../memory/memory.js"), t = {
    getValiCode: function(r) {
        return n.getValiCode(r).then(function(e) {
            return e.code, Promise.resolve(e);
        }, e.failHandle);
    },
    login: function(r) {
        return n.login(r).then(function(e) {
            return e.code, Promise.resolve(e);
        }, e.failHandle);
    },
    getUserInfoByWxCode: function(r) {
        return n.getUserInfoByWxCode(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    signUpUserData: function(r) {
        return n.signUpUserData(r).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    },
    logoutUserData: function() {
        var t = {
            appType: r.appType,
            openId: o.getData("openId"),
            utoken: o.getData("userInfo").utoken
        };
        return n.logoutUserData(t).then(function(e) {
            return Promise.resolve(e);
        }, e.failHandle);
    }
};

module.exports = t;