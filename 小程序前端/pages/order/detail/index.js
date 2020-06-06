var a = getApp();

Page({
    data: {
        detail: "",
        current: 0,
        imgs: []
    },
    onLoad: function(e) {
        var t = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "order.orderDetail",
                uid: wx.getStorageSync("uid"),
                order_id: e.orderid
            },
            success: function(a) {
                t.setData({
                    detail: a.data.data.detail,
                    imgs: a.data.data.imgs,
                    prevImgs: a.data.data.prevImgs,
                    repairData: a.data.data.repairData
                });
            }
        });
    },
    current: function(a) {
        this.setData({
            current: a.currentTarget.dataset.a
        });
    },
    selPay: function(e) {
        wx.navigateTo({
            url: "/pages/order/pay/index?bid=" + e.currentTarget.dataset.bid + "&orderid=" + e.currentTarget.dataset.orderid + "&rid=" + e.currentTarget.dataset.rid
        });
    },
    goLine: function(t) {
        wx.navigateTo({
            url: "/pages/order/line/index?order_id=" + t.target.dataset.orderid
        });
    },
    refound: function(a) {
        wx.navigateTo({
            url: "/pages/order/refound/index?orderid=" + a.currentTarget.dataset.orderid
        });
    },
    call: function(a) {
        wx.makePhoneCall({
            phoneNumber: a.currentTarget.dataset.phone
        });
    },
    preview: function(a) {
        wx.previewImage({
            current: a.currentTarget.dataset.url,
            urls: this.data.prevImgs
        });
    },
    repairInfo: function(a) {
        wx.navigateTo({
            url: "/pages/store/pages/masterDetail/index?uid=" + a.currentTarget.dataset.uid
        });
    }
});