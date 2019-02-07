var e = require("../models/models.js"), t = (require("../tools/tools.js"), require("../interfaces/indexITF.js")), i = {
    getIndexData: function(i) {
        return t.getIndexData(i).then(function(e) {
            return e.code, Promise.resolve(e);
        }, e.failHandle);
    },
    getHeaderInfo: function(i) {
        return t.getHeaderInfo(i).then(function(e) {
            if (0 != e.code) return Promise.resolve(e);
            var t = e.data, i = {
                title: t.nickname ? t.nickname : "嗨, " + t.title,
                describe: t.description || "",
                headSrc: t.avatar_url || ""
            };
            return e.data = Object.assign({}, i), Promise.resolve(e);
        }, e.failHandle);
    },
    getNearKitchenList: function(i) {
        return t.getNearKitchenList(i).then(function(e) {
            return 0 != e.code ? Promise.resolve(e) : (console.log("推荐厨房列表：", e.data.list), 
            e.data.list.forEach(function(t, i) {
                var n = [];
                t.activity_list.forEach(function(e) {
                    e.name.indexOf("饭票") > -1 || n.push({
                        ticketImg: e.icon,
                        ticketText: e.name,
                        hasTicket: !1
                    });
                }), n.reverse();
                var r = [ t.native_place ];
                0 != t.month_sale && r.push("月售" + (t.month_sale > 300 ? "300+" : t.month_sale) + "单"), 
                0 != t.star && r.push(t.star + "分"), r.push((t.dispatch_threshold || 0) + "元起订");
                var a = [];
                (t.recommend_msg || "").split(",").forEach(function(e) {
                    e.trim() && a.push(e);
                }), e.data.list[i] = {
                    kitchenID: t.kitchen_id,
                    kitchenBookPrice: t.dispatch_threshold || 0,
                    kitchenTitle: t.kitchen_name,
                    kitchenAlert: t.kitchen_notice ? t.kitchen_notice + "," + t.kitchen_tip : "",
                    kitchenInfo: r.join(" · "),
                    kitchenTags: a,
                    kitchenHeadSrc: t.cook_image_url,
                    kitchenIsBetter: !!t.express_tag.send_level,
                    kitchenShowImgs: t.recommend_dishes,
                    kitchenLocation: t.kitchen_address + " · " + t.distance,
                    kitchenMarks: n,
                    kitchenFlag: t.kitchen_flag,
                    kitchenMoreDish: t.has_more_dish
                };
            }), Promise.resolve(e));
        }, e.failHandle);
    }
};

module.exports = i;