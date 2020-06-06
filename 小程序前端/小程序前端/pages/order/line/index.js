var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        ColorList: a.globalData.ColorList,
        logList: [],
        order_id: "",
        is_del_show: !1,
        c_del_id: ""
    },
    onLoad: function(a) {
        this.setData({
            order_id: a.order_id
        });
    },
    onShow: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "order.lineList",
                order_id: t.data.order_id
            },
            success: function(a) {
                console.log(a), t.setData({
                    logList: a.data.data.list
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
        var a = this;
        wx.navigateTo({
            url: "/pages/store/pages/lineadd/index?order_id=" + a.data.order_id
        });
    },
    gosetting: function(a) {
        var t = this;
        wx.navigateTo({
            url: "/pages/store/pages/lineadd/index?order_id=" + t.data.order_id + "&line_id=" + a.currentTarget.dataset.id
        });
    },
    onShareAppMessage: function(a) {}
});