var e = {
    getDiningByType: function(e) {
        return {
            1: "早餐",
            2: "午餐",
            3: "晚餐"
        }[e];
    },
    getAddressByType: function(e) {
        return {
            0: "",
            1: "公司",
            2: "家"
        }[e];
    },
    getSendByType: function(e) {
        return {
            0: "配送",
            1: "配送",
            2: "自取",
            3: "堂食"
        }[e];
    },
    getDineAddressByType: function(e) {
        return {
            1: "送餐地址",
            2: "取餐地址",
            3: "就餐地址"
        }[e];
    }
};

module.exports = e;