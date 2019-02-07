var r = {
    isArray: function(r) {
        return !!r && r.constructor === Array;
    },
    isObject: function(r) {
        return !!r && r.constructor === Object;
    },
    isKeyEmptyObject: function(t) {
        if (!r.isObject(t)) throw new Error("参数有误，请传Object类型值");
        return 0 == Object.keys(t).length;
    },
    isDate: function(r) {
        return !!r && r.constructor === Date;
    },
    copy: function(t) {
        return r.isObject(t) || r.isArray(t) ? JSON.parse(JSON.stringify(t)) : t;
    },
    merge: function() {
        for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
        return r.copy(Object.assign.apply({}, e));
    },
    getItem: function(t, e, n) {
        if (!r.isArray(n)) throw new Error("参数有误，请传Array类型值");
        for (var c = 0; c < n.length; c++) {
            var o = n[c];
            if (o[t] == e) return r.copy(o);
        }
        return "";
    },
    getQueryString: function(r, t) {
        var e = new RegExp(r + "=(.*?)(?:&|$)"), n = t.match(e);
        return n && n[1];
    }
};

module.exports = r;