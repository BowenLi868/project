var t = require("../../controllers/locationController.js"), a = require("../../controllers/addressController.js"), s = require("../../memory/memory.js");

Page({
    data: {
        openCityCode: {},
        isAddressFocus: !1,
        isAddressHasWord: !1,
        isShowCityChoose: !1,
        currentCity: {},
        addressValue: "",
        cityList: [],
        locationStatus: "process",
        locations: {},
        addressList: [],
        searchList: [],
        nearList: [],
        isExplore: !1
    },
    onLoad: function(t) {
        this.initPage();
    },
    onShow: function() {
        this.initPage();
    },
    switchCityControl: function() {
        this.setData({
            isShowCityChoose: !this.data.isShowCityChoose
        });
    },
    chooseCity: function(t) {
        var a = t.currentTarget.dataset.option;
        s.setData("hasShare", !1), this.setData({
            currentCity: a,
            isShowCityChoose: !1
        });
    },
    searchAddress: function() {
        this.setData({
            isAddressFocus: !0,
            isShowCityChoose: !1
        });
    },
    quitSearchAddress: function() {
        this.setData({
            addressValue: "",
            isAddressHasWord: !1,
            searchList: [],
            isAddressFocus: !1
        });
    },
    writeAddress: function(t) {
        var a = t.detail.value;
        this.setData({
            isAddressHasWord: "" != a.trim()
        }), this.searching(a);
    },
    clearAddressInput: function(t) {
        this.setData({
            addressValue: "",
            isAddressHasWord: !1,
            searchList: []
        });
    },
    initPage: function() {
        var s = this, e = t.getLocationOnlineCities().then(function(t) {
            if (0 == t.code) {
                var a = {};
                t.data.list.forEach(function(t) {
                    a[t.parent_id] = t.region_id;
                }), s.setData({
                    openCityCode: a,
                    currentCity: t.data.list[0] || {},
                    cityList: t.data.list
                });
            }
        }), i = t.getLocation().then(function(t) {
            return 200 == t.code ? s.setData({
                locationStatus: "success",
                locations: t.data
            }) : s.setData({
                locationStatus: "fail"
            }), Promise.resolve(t.data.location);
        }, function() {
            s.setData({
                locationStatus: "fail"
            });
        }).then(function(e) {
            a.getAddressList({
                coordinate: e
            }).then(function(t) {
                0 == t.code && s.setData({
                    addressList: t.data
                });
            }), t.getNearBuildings({
                location: e
            }).then(function(t) {
                200 == t.code && s.setData({
                    nearList: t.data
                });
            });
        });
        Promise.all([ e, i ]).then(function() {
            s.setData({
                loaded: !0
            });
        });
    },
    reLocation: function() {
        var a = this;
        this.setData({
            locationStatus: "process"
        }), t.getLocation().then(function(t) {
            200 == t.code ? a.setData({
                locationStatus: "success",
                locations: t.data
            }) : a.setData({
                locationStatus: "fail"
            });
        }, function() {
            a.setData({
                locationStatus: "fail"
            });
        });
    },
    exploreAddress: function() {
        this.setData({
            isExplore: !this.data.isExplore
        });
    },
    searching: function(a) {
        var s = this, e = (this.data.currentCity.name || "") + a;
        t.getAddressBySearch({
            keywords: e
        }).then(function(t) {
            200 == t.code && s.setData({
                searchList: t.data
            });
        });
    },
    locationToIndex: function() {
        s.setData("locationInfo", this.data.locations), wx.navigateBack({
            delta: 1
        });
    },
    addressToIndex: function(t) {
        var a = t.currentTarget.dataset.item;
        s.setData("locationInfo", {
            cityCode: a.city_id,
            locationText: a.addressMap,
            location: a.addressCoordinate
        }), wx.navigateBack({
            delta: 1
        });
    },
    searchToIndex: function(t) {
        var a = t.currentTarget.dataset.item, e = this.data.openCityCode[a.item.pcode];
        console.log(e), e ? (s.setData("locationInfo", {
            cityCode: this.data.currentCity.region_id,
            locationText: a.title,
            location: a.location
        }), wx.navigateBack({
            delta: 1
        })) : wx.showToast({
            image: "/images/alert.png",
            title: "该城市未开通回家吃饭"
        });
    },
    addAddress: function() {
        wx.navigateTo({
            url: "/pages/address/address"
        });
    }
});