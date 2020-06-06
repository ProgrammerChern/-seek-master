var t = getApp();

Page({
    data: {
        tabid: 1,
        xianshi: 0
    },
    onLoad: function(e) {
        var a = this;
        if (void 0 == wx.getStorageSync("uid") || null == wx.getStorageSync("uid")) return t.util.message({
            title: "请先登录",
            type: "error"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/pages/me/index"
            });
        }, 3e3);
        1 == e.type ? t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "home.get_card",
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                t.util.message({
                    title: "领取成功",
                    type: "error"
                }), a.getlist();
            },
            fail: function(e) {
                t.util.message({
                    title: e.data.message,
                    type: "error"
                }), a.getlist();
            }
        }) : a.getlist();
    },
    tabSelect: function(t) {
        this.setData({
            tabid: t.currentTarget.dataset.id
        }), this.getlist();
    },
    getlist: function() {
        var e = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "home.getUserCard",
                tabid: e.data.tabid,
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                e.setData({
                    list: t.data.data
                });
            }
        });
    },
    showrule: function(t) {
        this.data.xianshi == t.currentTarget.dataset.id ? this.setData({
            xianshi: 0
        }) : this.setData({
            xianshi: t.currentTarget.dataset.id
        });
    },
    goindex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    }
});