var a = getApp();

Page({
    data: {
        list: [],
        mingci: ""
    },
    onLoad: function(a) {
        this.jiazai();
    },
    onPullDownRefresh: function() {
        this.jiazai2();
    },
    jiazai: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.rank",
                uid: wx.getStorageSync("uid"),
                page: t.data.page
            },
            success: function(a) {
                t.setData({
                    list: a.data.data.list,
                    mingci: a.data.data.mingci
                });
            }
        });
    }
});