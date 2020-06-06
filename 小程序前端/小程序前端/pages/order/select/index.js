var e = getApp();

Page({
    data: {
        reapirlist: []
    },
    onLoad: function(t) {
        var r = this;
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "bidding.selectReapir",
                uid: wx.getStorageSync("uid"),
                orderid: t.id,
                formid: t.formId
            },
            success: function(e) {
                r.setData({
                    reapirlist: e.data.data,
                    orderid: t.id
                });
            }
        });
    },
    call: function(e) {
        var t = e.currentTarget.dataset.rid;
        wx.navigateTo({
            url: "/pages/store/pages/masterDetail/index?uid=" + t
        });
    },
    selPay: function(e) {
        wx.navigateTo({
            url: "/pages/order/pay/index?bid=" + e.currentTarget.dataset.bid + "&orderid=" + e.currentTarget.dataset.orderid + "&rid=" + e.currentTarget.dataset.rid
        });
    },
    preview: function(e) {
        console.log(e);
        var t = [];
        t[0] = e.currentTarget.dataset.url, wx.previewImage({
            current: e.currentTarget.dataset.url,
            urls: t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});