var a = getApp();

Page({
    data: {
        list: [],
        page: 1,
        is_last: !1,
        userinfo: [],
        timoney: ""
    },
    onLoad: function(t) {
        var s = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.takeList",
                uid: wx.getStorageSync("uid"),
                page: s.data.page
            },
            success: function(a) {
                s.setData({
                    list: a.data.data.list,
                    userinfo: a.data.data.userinfo
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.jiazai2();
    },
    onReachBottom: function() {
        var t = this;
        t.data.is_last || a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.takeList",
                uid: wx.getStorageSync("uid"),
                page: t.data.page + 1
            },
            success: function(a) {
                a.data.data.list.length < 1 && (t.setData({
                    is_last: !0
                }), wx.showToast({
                    title: "没有更多数据了",
                    icon: "success",
                    duration: 2e3
                }));
                for (var s = t.data.list, e = 0; e < a.data.data.list.length; e++) s.push(a.data.data.list[e]);
                t.setData({
                    list: s,
                    page: t.data.page + 1
                });
            }
        });
    },
    jiazai2: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.takeList",
                uid: wx.getStorageSync("uid"),
                page: 1
            },
            success: function(a) {
                t.setData({
                    list: a.data.data.list,
                    userinfo: a.data.data.userinfo,
                    page: 1,
                    is_last: !1
                });
            }
        });
    }
});