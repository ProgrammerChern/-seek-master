var a = getApp();

Page({
    data: {
        order: "",
        bidding: "",
        master: ""
    },
    onLoad: function(t) {
        var e = this;
        console.log(t), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "order.getOrder",
                uid: wx.getStorageSync("uid"),
                rid: t.rid,
                orderid: t.orderid,
                bid: t.bid
            },
            success: function(a) {
                e.setData({
                    order: a.data.data.order,
                    bidding: a.data.data.bidding,
                    master: a.data.data.master
                });
            }
        });
    },
    onShow: function(a) {},
    sureReapir: function(t) {
        a.util.request({
            url: "entry/wxapp/PaySel",
            data: {
                m: "ox_master",
                uid: wx.getStorageSync("uid"),
                rid: t.target.dataset.rid,
                orderid: t.target.dataset.orderid
            },
            success: function(a) {
                a.data && a.data.data && !a.data.errno && "1" != a.data.message && wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        t.target.dataset.bid, t.target.dataset.rid, t.target.dataset.price, t.target.dataset.orderid;
                        wx.showModal({
                            title: "支付成功",
                            content: "师傅会第一时间联系您",
                            success: function(a) {
                                a.confirm && wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    },
                    fail: function(a) {
                        backApp();
                    }
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && backApp();
                    }
                });
            }
        });
    },
    upPayStaus: function(t) {
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "bidding.upOrder",
                uid: wx.getStorageSync("uid"),
                rid: t.rid,
                bid: t.bid,
                price: t.price,
                orderid: t.orderid
            },
            success: function(a) {},
            fail: function(a) {}
        });
    }
});