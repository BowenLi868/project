var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, a = require("../../controllers/addressController.js"), e = require("../../controllers/locationController.js"), i = require("../../memory/memory.js");

Page({
    data: {
        id: "",
        isChooseLocation: !1,
        saveData: {
            type: 0
        },
        coordinate: "",
        nearList: [],
        isSearchFocus: !1,
        searchList: [],
        openCityCode: {},
        addressValue: "",
        isFirstFocus: !0,
        logPhone: "",
        isShowLogPhone: !1
    },
    onLoad: function(t) {
        var a = i.getData("userInfo").phone || "";
        if (this.setData({
            logPhone: a
        }), t.id) {
            var e = i.getData("addressEditData") || {};
            console.log("编辑地址：", e), this.setData({
                id: t.id,
                saveData: {
                    address_id: e.address_id,
                    coordinate: e.longitude + "," + e.latitude,
                    city_id: e.city_id,
                    province_id: e.province_id,
                    district_id: e.district_id,
                    address: e.map_address,
                    map_address: e.map_address,
                    detailed_address: e.detailed_address,
                    type: e.type,
                    phone: e.phone,
                    name: e.name,
                    longitude: e.longitude,
                    latitude: e.latitude
                }
            });
        }
        this.initPage();
    },
    save: function() {
        if (i.getData("userInfo").utoken) {
            var t = this.data.saveData;
            t.name ? t.phone ? /^1[3456789]\d{9}$/.test(t.phone) ? t.map_address ? t.detailed_address ? (wx.showLoading({
                mask: !0,
                title: "正在保存..."
            }), a.saveAddress(t).then(function(t) {
                wx.hideLoading(), 0 == t.code ? wx.showToast({
                    image: "/images/alert.png",
                    title: "保存成功",
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }) : wx.showToast({
                    image: "/images/alert.png",
                    title: "保存失败"
                });
            })) : wx.showToast({
                image: "/images/alert.png",
                title: "请填写收餐人门牌号"
            }) : wx.showToast({
                image: "/images/alert.png",
                title: "请选择收餐地址"
            }) : wx.showToast({
                image: "/images/alert.png",
                title: "请填写正确的手机号码"
            }) : wx.showToast({
                image: "/images/alert.png",
                title: "请填写收餐人电话"
            }) : wx.showToast({
                image: "/images/alert.png",
                title: "请填写收餐人姓名"
            });
        } else wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    inputName: function(a) {
        var e = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi, i = a.detail.value;
        i = i.replace(e, ""), this.setData({
            saveData: t({}, this.data.saveData, {
                name: i
            })
        });
    },
    inputPhone: function(a) {
        this.setData({
            saveData: t({}, this.data.saveData, {
                phone: a.detail.value
            })
        });
    },
    showLogPhone: function(t) {
        this.setData({
            isShowLogPhone: !0
        });
    },
    hideLogPhone: function(t) {
        this.setData({
            isShowLogPhone: !1
        });
    },
    saveLogPhone: function(a) {
        this.setData({
            isShowLogPhone: !1,
            saveData: t({}, this.data.saveData, {
                phone: this.data.logPhone
            })
        });
    },
    inputDetailAddress: function(a) {
        var e = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi, i = a.detail.value;
        i = i.replace(e, ""), this.setData({
            saveData: t({}, this.data.saveData, {
                detailed_address: i
            })
        });
    },
    switchCompany: function(a) {
        var e = this.data.saveData.type;
        e = 1 == e ? 0 : 1, this.setData({
            saveData: t({}, this.data.saveData, {
                type: e
            })
        });
    },
    switchHome: function(a) {
        var e = this.data.saveData.type;
        e = 2 == e ? 0 : 2, this.setData({
            saveData: t({}, this.data.saveData, {
                type: e
            })
        });
    },
    chooseLocation: function(t) {
        this.setData({
            isChooseLocation: !0
        });
    },
    cancleSearch: function(t) {
        this.setData({
            isChooseLocation: !1
        });
    },
    initPage: function(a) {
        var i = this;
        e.getLocationOnlineCities().then(function(t) {
            if (0 == t.code) {
                var a = {};
                t.data.list.forEach(function(t) {
                    a[t.parent_id] = t.region_id;
                }), i.setData({
                    openCityCode: a
                }), console.log("开通城市: ", a);
            }
        }), e.getLocation().then(function(a) {
            var s = a.data.location ? a.data.location : "";
            i.setData({
                coordinate: s
            }), i.data.id || i.setData({
                saveData: t({}, i.data.saveData, {
                    coordinate: s,
                    longitude: +s.split(",")[0],
                    latitude: +s.split(",")[1]
                })
            }), e.getNearBuildings({
                location: s
            }).then(function(t) {
                200 == t.code && i.setData({
                    nearList: t.data
                });
            });
        });
    },
    searchAddress: function(t) {
        this.setData({
            isFirstFocus: !1,
            addressValue: t.detail.value
        }), this.searching(t.detail.value);
    },
    searching: function(t) {
        var a = this;
        e.getAddressBySearch({
            keywords: t
        }).then(function(t) {
            200 == t.code && (console.log(t.data), a.setData({
                searchList: t.data
            }));
        });
    },
    chooseNearLocation: function(a) {
        var e = a.currentTarget.dataset.item, i = e.location;
        console.log("选取地址:", e), this.data.openCityCode[e.item.pcode] ? this.setData({
            isChooseLocation: !1,
            saveData: t({}, this.data.saveData, {
                coordinate: i,
                longitude: +i.split(",")[0],
                latitude: +i.split(",")[1],
                address: e.title,
                map_address: e.title,
                province_id: e.item.pcode,
                city_id: this.data.openCityCode[e.item.pcode],
                district_id: e.item.adcode
            })
        }) : wx.showToast({
            image: "/images/alert.png",
            title: "您选择的地址不可送达，请重新选择"
        });
    },
    chooseSearch: function(a) {
        var e = a.currentTarget.dataset.item, i = e.location;
        console.log("选取地址:", e), this.data.openCityCode[e.item.pcode] ? this.setData({
            isChooseLocation: !1,
            saveData: t({}, this.data.saveData, {
                coordinate: i,
                longitude: +i.split(",")[0],
                latitude: +i.split(",")[1],
                address: e.title,
                map_address: e.title,
                province_id: e.item.pcode,
                city_id: this.data.openCityCode[e.item.pcode],
                district_id: e.item.adcode
            })
        }) : wx.showToast({
            image: "/images/alert.png",
            title: "您选择的城市未开通回家吃饭"
        });
    },
    blurSearch: function(t) {
        this.setData({
            isSearchFocus: !1
        });
    },
    focusSearch: function(t) {
        this.setData({
            isSearchFocus: !0
        });
    }
});