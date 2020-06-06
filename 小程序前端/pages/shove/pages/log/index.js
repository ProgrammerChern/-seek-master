var t = getApp(), e = 1;

Page({
    data: {
        List: [],
        display: !0,
        ophiden: !0,
        one_open: 1
    },
    onLoad: function() {
        var e = this;
        if ("" == wx.getStorageSync("uid")) t.util.getUserInfo(function(t) {
            if (t.memberInfo) {
                wx.setStorageSync("uid", t.memberInfo.uid);
                var i = t.memberInfo.uid;
                e.getList(0, i), console.log(t.memberInfo.uid);
            } else wx.navigateTo({
                url: "/pages/authlogin/login"
            });
        }); else {
            var i = wx.getStorageSync("uid");
            e.getList(0, i);
        }
    },
    onShow: function() {
        "1" == this.data.one_open && (e = 1, this.setData({
            display: !0,
            ophiden: !0,
            List: []
        }));
    },
    onReachBottom: function() {
        this.getList(e, wx.getStorageSync("uid"));
    },
    getList: function(i, a) {
        var n = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.tuiguang",
                page: i,
                uid: a
            },
            success: function(t) {
                if (0 !== t.data.data.list.length) {
                    var i = n.data.List;
                    i.push.apply(i, t.data.data.list), n.setData({
                        List: i
                    }), e++;
                } else 1 !== e ? n.setData({
                    display: !1
                }) : n.setData({
                    ophiden: !1
                });
            }
        });
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    updateUserInfo: function(e) {
        var i = this;
        wx.navigateTo({
            url: "/pages/authlogin/login"
        }), e.detail.userInfo && t.util.getUserInfo(function(t) {
            var e = t.memberInfo.uid;
            i.getList(0, e), wx.setStorageSync("uid", t.memberInfo.uid);
        }, e.detail);
    }
});