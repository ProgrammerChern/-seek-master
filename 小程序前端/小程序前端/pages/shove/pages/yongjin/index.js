var t = getApp();

Page({
    data: {
        list: [],
        page: 1,
        is_last: !1,
        timoney: ""
    },
    onLoad: function(a) {
        var s = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.yongjin_list",
                uid: wx.getStorageSync("uid"),
                page: s.data.page
            },
            success: function(t) {
                s.setData({
                    list: t.data.data.list
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.jiazai2();
    },
    onReachBottom: function() {
        var a = this;
        a.data.is_last || t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.yongjin_list",
                uid: wx.getStorageSync("uid"),
                page: a.data.page + 1
            },
            success: function(t) {
                t.data.data.list.length < 1 && (a.setData({
                    is_last: !0
                }), wx.showToast({
                    title: "没有更多数据了",
                    icon: "success",
                    duration: 2e3
                }));
                for (var s = a.data.list, i = 0; i < t.data.data.list.length; i++) s.push(t.data.data.list[i]);
                a.setData({
                    list: s,
                    page: a.data.page + 1
                });
            }
        });
    },
    jiazai2: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.yongjin_list",
                uid: wx.getStorageSync("uid"),
                page: 1
            },
            success: function(t) {
                a.setData({
                    list: t.data.data.list,
                    page: 1,
                    is_last: !1
                });
            }
        });
    }
});