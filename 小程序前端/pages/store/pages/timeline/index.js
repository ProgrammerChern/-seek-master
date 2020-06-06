var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        ColorList: t.globalData.ColorList,
        logList: [],
        order_id: "",
        is_del_show: !1,
        c_del_id: "",
        title: "",
        share_img_path: ""
    },
    onLoad: function(a) {
        var e = this;
        wx.hideShareMenu(), e.setData({
            order_id: a.order_id
        }), t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.orderDetail",
                order_id: a.order_id,
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                e.setData({
                    title: t.data.data.detail.type_name
                });
            }
        });
    },
    onShow: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.lineList",
                order_id: a.data.order_id,
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                a.setData({
                    logList: t.data.data.list,
                    share_img_path: t.data.data.share_img_path
                });
            }
        });
    },
    pageBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    toform: function() {
        var t = this;
        wx.navigateTo({
            url: "/pages/store/pages/lineadd/index?order_id=" + t.data.order_id
        });
    },
    gosetting: function(t) {
        var a = this;
        wx.navigateTo({
            url: "/pages/store/pages/lineadd/index?order_id=" + a.data.order_id + "&line_id=" + t.currentTarget.dataset.id
        });
    },
    hideModal: function() {
        this.setData({
            is_del_show: !1
        });
    },
    goDel: function(t) {
        this.setData({
            is_del_show: !0,
            c_del_id: t.currentTarget.dataset.id
        });
    },
    delItem: function() {
        var a = this;
        a.data.c_del_id && t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.delLine",
                order_id: a.data.order_id,
                line_id: a.data.c_del_id,
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                a.setData({
                    is_del_show: !1
                }), t.util.request({
                    url: "entry/wxapp/Api",
                    data: {
                        m: "ox_master",
                        r: "store.lineList",
                        order_id: a.data.order_id,
                        uid: wx.getStorageSync("uid")
                    },
                    success: function(t) {
                        a.setData({
                            logList: t.data.data.list,
                            share_img_path: t.data.data.share_img_path
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        if ("menu" != t.from) return {
            title: this.data.title + "当前进度",
            path: "/pages/order/line/index?order_id=" + this.data.order_id,
            imageUrl: this.data.share_img_path
        };
    }
});