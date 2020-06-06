var t = getApp();

Page({
    data: {
        TabCur: 1,
        scrollLeft: 0,
        list: [],
        page: 1,
        status: 1,
        is_last: !1,
        error: !0,
        price: "",
        orderid: ""
    },
    onLoad: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.uxuanList",
                uid: wx.getStorageSync("uid"),
                status: e.data.status,
                page: e.data.page
            },
            success: function(t) {
                e.setData({
                    list: t.data.data
                });
            }
        });
    },
    daohang: function(t) {
        wx.openLocation({
            latitude: Number(t.currentTarget.dataset.latitude),
            longitude: Number(t.currentTarget.dataset.longitude),
            name: t.currentTarget.dataset.address,
            address: t.currentTarget.dataset.address
        });
    },
    tabSelect: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.uxuanList",
                uid: wx.getStorageSync("uid"),
                status: a.currentTarget.dataset.id,
                page: 1
            },
            success: function(t) {
                e.setData({
                    list: t.data.data,
                    TabCur: a.currentTarget.dataset.id,
                    scrollLeft: 60 * (a.currentTarget.dataset.id - 1),
                    status: a.currentTarget.dataset.id,
                    page: 1,
                    is_last: !1
                });
            }
        });
    },
    onPullDownRefresh: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.uxuanList",
                uid: wx.getStorageSync("uid"),
                status: a.data.status,
                page: 1
            },
            success: function(t) {
                a.setData({
                    list: t.data.data,
                    page: 1,
                    is_last: !1
                }), wx.stopPullDownRefresh();
            }
        });
    },
    onReachBottom: function() {
        var a = this;
        a.data.is_last || t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.uxuanList",
                uid: wx.getStorageSync("uid"),
                page: a.data.page + 1,
                status: a.data.status
            },
            success: function(t) {
                t.data.data.length < 1 && (a.setData({
                    is_last: !0
                }), wx.showToast({
                    title: "没有更多数据了",
                    icon: "success",
                    duration: 2e3
                }));
                for (var e = a.data.list, s = 0; s < t.data.data.length; s++) e.push(t.data.data[s]);
                a.setData({
                    list: e,
                    page: a.data.page + 1
                });
            }
        });
    },
    showModal: function(t) {
        this.setData({
            modalName: t.currentTarget.dataset.target,
            orderid: t.currentTarget.dataset.orderid
        });
    },
    hideModal: function(t) {
        this.setData({
            modalName: null
        });
    },
    call: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.target.dataset.phone
        });
    }
});