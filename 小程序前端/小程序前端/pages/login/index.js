var t = getApp();

Page({
    data: {
        imgUrls: [ "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640", "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640", "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640" ],
        indicatorDots: !0,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onLoad: function(e) {
        var a = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "login.slide"
            },
            success: function(t) {
                a.setData({
                    imgUrls: t.data.data
                });
            }
        });
    },
    authFalse: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    updateUserInfo: function(e) {
        t.util.getUserInfo(function(e) {
            wx.setStorageSync("uid", e.memberInfo.uid), t.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "ox_master",
                    r: "shove.shove_user",
                    uid: e.memberInfo.uid,
                    shove_uid: wx.getStorageSync("shove_uid")
                },
                success: function(t) {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            });
        }, e.detail);
    }
});