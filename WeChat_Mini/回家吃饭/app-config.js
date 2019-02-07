var i = {
    environment: "online",
    devHost: {
        locationHost: "https://beta-m.jiashuangkuaizi.com",
        kitchenHost: "https://test1user.mapi.jiashuangkuaizi.com"
    },
    grayHost: {
        locationHost: "https://m.jiashuangkuaizi.com",
        kitchenHost: "https://grayuser.mapi.jiashuangkuaizi.com"
    },
    onlineHost: {
        locationHost: "https://m.jiashuangkuaizi.com",
        kitchenHost: "https://user.mapi.jiashuangkuaizi.com"
    }
}, t = i[i.environment + "Host"];

module.exports = {
    name: "回家吃饭",
    appVersion: "3.0.3",
    version: "3.9.8",
    platform: "wxapp",
    device: "wxapp",
    environment: i.environment,
    host: t,
    appType: "miniApp",
    mapConfig: {
        key: "665191cd743a43a9",
        appType: "miniApp"
    }
};