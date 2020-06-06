var a, t = require("../../components/wxSearch/wxSearch.js"), e = require("../../utils/qqmap-wx-jssdk.min.js"), i = !0, n = getApp();

Page({
    data: {
        list: [],
        banner: [],
        info: [],
        isShow: !1,
        uid: "",
        keys: "",
        shove_uid: 0,
        fu_img: []
    },
    onLoad: function(a) {
        console.log(a), a.scene && wx.setStorageSync("shove_uid", a.scene), a.shove_uid > 0 && wx.setStorageSync("shove_uid", a.shove_uid);
        var t = this;
        t.seachTag(), t.vUpdate(), n.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "home.advert"
            },
            success: function(a) {
                a.data.data && t.setData({
                    isShow: !0,
                    advert: a.data.data
                });
            }
        }), n.util.getUserInfo(function(a) {
            a.memberInfo ? (t.setData({
                uid: a.memberInfo.uid
            }), t.getInfo(), wx.setStorageSync("uid", a.memberInfo.uid)) : t.getInfo();
        });
    },
    onShow: function() {
        var a = this;
        i && 1 == a.data.info.ad_status && i.show().catch(function(a) {
            console.error(a);
        });
    },
    getInfo: function(t) {
        var o = this;
        n.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "home.index",
                uid: o.data.uid
            },
            success: function(t) {
                if (t.data.data) {
                    wx.setNavigationBarTitle({
                        title: t.data.data.info.name
                    }), wx.createInterstitialAd && 1 == t.data.data.info.ad_status && (i = wx.createInterstitialAd({
                        adUnitId: t.data.data.info.ad_key
                    }));
                    a = new e({
                        key: "HEQBZ-R6TWR-3YHWF-WJACM-ZH6LE-3SFB6"
                    }), wx.getLocation({
                        type: "gcj02",
                        success: function(a) {
                            o.getCity(a.latitude, a.longitude);
                        }
                    }), o.setData({
                        banner: t.data.data.banner,
                        list: t.data.data.list,
                        nav: t.data.data.nav,
                        nav1: t.data.data.nav1,
                        info: t.data.data.info,
                        goods: t.data.data.goods,
                        shove_uid: t.data.data.shove_uid,
                        fu_img: t.data.data.fu_img
                    });
                }
            }
        });
    },
    xiangji: function() {
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "camera" ],
            success: function(a) {
                a.tempFilePaths;
            }
        });
    },
    goT: function(a) {
        "1" == a.currentTarget.dataset.type && (console.log(a), wx.navigateTo({
            url: a.currentTarget.dataset.url
        })), "2" == a.currentTarget.dataset.type && (console.log(a), wx.navigateToMiniProgram({
            appId: a.currentTarget.dataset.url,
            path: "",
            extraData: {
                foo: "bar"
            },
            success: function(a) {}
        }));
    },
    goDetail: function(a) {
        wx.navigateTo({
            url: "/pages/goods/detail/index?id=" + a.currentTarget.dataset.id
        });
    },
    hideModal: function(a) {
        this.setData({
            isShow: !1
        });
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    updateUserInfo: function(a) {
        var t = this;
        t.hideDialog(), n.util.getUserInfo(function(a) {
            t.setData({
                uid: res.memberInfo.uid
            }), wx.setStorageSync("uid", a.memberInfo.uid);
        }, a.detail);
    },
    onPullDownRefresh: function() {
        var a = this;
        n.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "home.index"
            },
            success: function(t) {
                t.data.data && (wx.setNavigationBarTitle({
                    title: t.data.data.info.name
                }), a.setData({
                    banner: t.data.data.banner,
                    list: t.data.data.list,
                    nav: t.data.data.nav,
                    info: t.data.data.info,
                    goods: t.data.data.goods
                })), wx.stopPullDownRefresh();
            }
        });
    },
    uxuan: function() {
        wx.navigateTo({
            url: "/pages/goods/index"
        });
    },
    goType: function(a) {
        var t = this;
        // n.util.request({
        //     url: "entry/wxapp/Api",
        //     data: {
        //         m: "ox_master",
        //         r: "me.add_formid",
        //         uid: t.data.uid,
        //         formid: a.detail.formId
        //     }
        // }), 
        wx.navigateTo({
            url: "/pages/index/serviceList/index?type=" + a.target.dataset.id
        });
    },
    onShareAppMessage: function() {
        var a = this;
        return {
            path: "pages/index/index?shove_uid=" + this.data.shove_uid,
            title: a.data.info.share_title,
            imageUrl: a.data.info.share_img_path
        };
    },
    gofenlei: function(a) {
        var t = this;
        // n.util.request({
        //     url: "entry/wxapp/Api",
        //     showLoading: !1,
        //     data: {
        //         m: "ox_master",
        //         r: "me.add_formid",
        //         uid: t.data.uid,
        //         formid: a.detail.formId
        //     }
        // }), 
        wx.navigateTo({
            url: "/pages/need/pages/home/index?type_value=" + a.target.dataset.name + "&id=" + a.target.dataset.id
        });
    },
    vUpdate: function() {
        var a = wx.getUpdateManager();
        a.onCheckForUpdate(function(a) {
            console.log(a.hasUpdate);
        }), a.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function(t) {
                    t.confirm && a.applyUpdate();
                }
            });
        });
    },
    wxSearchFn: function(a) {},
    wxSearchInput: function(a) {
        var e = this;
        t.wxSearchInput(a, e);
    },
    wxSerchFocus: function(a) {
        var e = this;
        t.wxSearchFocus(a, e);
    },
    wxSearchBlur: function(a) {
        var e = this;
        t.wxSearchBlur(a, e);
    },
    wxSearchKeyTap: function(a) {
        wx.navigateTo({
            url: "/pages/need/pages/home/index?type_value=" + a.target.dataset.key
        });
    },
    wxSearchDeleteKey: function(a) {
        var e = this;
        t.wxSearchDeleteKey(a, e);
    },
    wxSearchDeleteAll: function(a) {
        var e = this;
        t.wxSearchDeleteAll(e);
    },
    wxSearchTap: function(a) {
        var e = this;
        t.wxSearchHiddenPancel(e);
    },
    seachTag: function(a) {
        var e = this;
        n.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "home.hotTag",
                uid: e.data.uid
            },
            success: function(a) {
                if (a.data.data) {
                    var i = a.data.data.list, n = a.data.data.hot;
                    t.init(e, 46, n), t.initMindKeys(i);
                }
            }
        });
    },
    getCity: function(t, e) {
        var i = this;
        a.reverseGeocoder({
            location: {
                latitude: t,
                longitude: e
            },
            success: function(a) {
                var a = a.result, t = [];
                t.push({
                    title: a.address_component.district
                }), i.setData({
                    title: t[0].title
                });
            },
            fail: function(a) {
                console.error(a);
            }
        });
    }
});