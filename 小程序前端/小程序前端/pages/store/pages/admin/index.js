var t = getApp();

Page({
    data: {
        user: "",
        page: 1,
        uid: wx.getStorageSync("uid")
    },
    onLoad: function(a) {
        var e = this;
        t.util.getUserInfo(function(a) {
            a.memberInfo && (t.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "ox_master",
                    r: "store.manage",
                    uid: a.memberInfo.uid
                },
                success: function(t) {
                    e.setData({
                        idcard: t.data.data.idcard,
                        detail: t.data.data.detail
                    });
                }
            }), wx.setStorageSync("uid", a.memberInfo.uid));
        });
    },
    onPullDownRefresh: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.orderList",
                uid: wx.getStorageSync("uid"),
                page: 1
            },
            success: function(t) {
                a.setData({
                    list: t.data.data.list,
                    page: 1,
                    is_last: !1
                }), wx.stopPullDownRefresh();
            }
        });
    },
    goUrl: function(t) {
        var a = t.currentTarget.dataset.url;
        1 == t.currentTarget.dataset.type && this.data.store.store_id && (a += this.data.store.store_id), 
        wx.navigateTo({
            url: a
        });
    },
    cash: function() {
        wx.navigateTo({
            url: "/pages/me/take/index"
        });
    },
    jumpBase: function() {
        wx.navigateTo({
            url: "/pages/store/pages/home/index"
        });
    }
});