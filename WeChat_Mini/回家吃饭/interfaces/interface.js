var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
}, t = require("../memory/memory.js"), o = {
    appConfig: require("../app-config.js"),
    get: function(e, t) {
        var r = {
            url: e,
            data: t || {},
            method: "get"
        };
        return o.request(r);
    },
    post: function(e, t) {
        var r = {
            url: e,
            data: t || {},
            method: "post"
        };
        return o.request(r);
    },
    request: function(e) {
        return new Promise(function(t, r) {
            var a = {
                url: e.url,
                data: e.data,
                header: {},
                method: e.method,
                dataType: "json",
                success: function(r) {
                    var a = o.resolveResponseData(r.data, e);
                    t(a);
                },
                fail: function(e) {
                    r("");
                }
            };
            a.data = o.resolveRequestData(a.data), a.header = o.resolveRequestHeader(a.header), 
            wx.request(a);
        });
    },
    resolveRequestData: function(r) {
        return e({}, r, {
            _platform: o.appConfig.platform,
            _version: o.appConfig.version,
            _osversion: o.appConfig.platform,
            _device: o.appConfig.device,
            _city: t.getData("locationInfo") ? t.getData("locationInfo").cityCode : "",
            utoken: t.getData("userInfo") ? t.getData("userInfo").utoken : ""
        });
    },
    resolveResponseData: function(e, r) {
        var a = o.appConfig.host.kitchenHost;
        return console.log(" --- host: --- ", a), r.url.indexOf(a) > -1 && 202 == e.code && t.setData("userInfo", {}), 
        e;
    },
    resolveRequestHeader: function(e) {
        var t = {
            "content-type": "application/x-www-form-urlencoded"
        };
        return Object.assign({}, e, t);
    }
};

module.exports = o;