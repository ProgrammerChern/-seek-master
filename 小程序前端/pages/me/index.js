var e = getApp();

Page({
    data: {
        info: "",
        isShow: !1,
        is_store: 0,
        uid: wx.getStorageSync("uid")
    },
    onLoad: function(e) {},
    onShow: function() {
        var t = this;
        e.util.getUserInfo(function(a) {
            a.memberInfo ? (t.setData({
                nickName: ""
            }), e.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "ox_master",
                    r: "home.getInfo",
                    uid: a.memberInfo.uid,
                    shove_uid: wx.getStorageSync("shove_uid")
                },
                success: function(e) {
                    e.data.data && (t.setData({
                        info: e.data.data.info,
                        store: e.data.data.store
                    }), 1 == t.data.store.status && t.setData({
                        is_store: e.data.data.store.status
                    }));
                }
            }), wx.setStorageSync("uid", a.memberInfo.uid)) : t.setData({
                avatarUrl: "../images/adminmo.png",
                nickName: "点击登录"
            });
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        e.util.getUserInfo(function(a) {
            a.memberInfo ? (e.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "ox_master",
                    r: "home.getInfo",
                    uid: a.memberInfo.uid
                },
                success: function(e) {
                    e.data.data && (t.setData({
                        info: e.data.data.info,
                        store: e.data.data.store
                    }), t.data.store && t.setData({
                        is_store: e.data.data.store.status
                    })), wx.stopPullDownRefresh();
                }
            }), wx.setStorageSync("uid", a.memberInfo.uid)) : t.setData({
                avatarUrl: "../images/adminmo.png",
                nickName: "点击登录"
            });
        });
    },
    login: function() {
        wx.navigateTo({
            url: "/pages/login/index"
        });
    },
    goStore: function() {
        this.data.store && "1" == this.data.store.status ? wx.navigateTo({
            url: "/pages/store/pages/admin/index"
        }) : wx.navigateTo({
            url: "/pages/store/pages/home/index"
        });
    },
    shove: function() {
        "" != wx.getStorageSync("uid") && void 0 != wx.getStorageSync("uid") ? wx.navigateTo({
            url: "/pages/shove/pages/home/index"
        }) : e.util.message({
            title: "请先登录",
            type: "error"
        });
    },
    card: function() {
        "" != wx.getStorageSync("uid") && void 0 != wx.getStorageSync("uid") ? wx.navigateTo({
            url: "/pages/me/card/index"
        }) : e.util.message({
            title: "请先登录",
            type: "error"
        });
    },
    address: function() {
        wx.navigateTo({
            url: "/pages/me/address/index"
        });
    },
    showModal: function(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        });
    },
    suggest: function() {
        wx.navigateTo({
            url: "/pages/me/suggest/index"
        });
    },
    refund: function() {
        wx.navigateTo({
            url: "/pages/me/refund/index"
        });
    },
    richtext: function() {
        wx.navigateTo({
            url: "/pages/me/richtext/index?type=2"
        });
    },
    about: function() {
        wx.navigateTo({
            url: "/pages/me/about/index"
        });
    },
    toRuzhuo: function() {
        this.data.store && "1" == this.data.store.status ? wx.navigateTo({
            url: "/pages/store/pages/admin/index"
        }) : wx.navigateTo({
            url: "/pages/store/pages/home/index"
        });
    },
    hideModal: function(e) {
        this.setData({
            modalName: null
        });
    },
    phoneCall: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.info.phone
        });
    },
    moneylog: function(e) {
        wx.navigateTo({
            url: "/pages/me/money/index?id=" + e.currentTarget.dataset.id
        });
    }
});