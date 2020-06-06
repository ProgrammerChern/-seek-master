App({
    data: {},
    siteInfo: require("siteinfo.js"),
    util: require("we7/resource/js/util.js"),
    onLaunch: function() {},
    uplaod: function(e) {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            success: function(i) {
                var u = i.tempFilePaths;
                wx.uploadFile({
                    url: t.util.url("entry/wxapp/Api", {
                        m: "ox_master",
                        r: "upload.save"
                    }),
                    filePath: u[0],
                    name: "file",
                    success: function(t) {
                        var i = JSON.parse(t.data);
                        "function" == typeof e && e(i.data);
                    }
                });
            }
        });
    },
    uid: function(e) {
        var t = wx.getStorageSync("uid");
        if (t) return t;
        this.util.getUserInfo(function(e) {
            if (e.memberInfo) {
                var t = e.memberInfo.uid;
                return wx.setStorageSync("uid", t), t;
            }
            return "";
        });
    },
    globalData: {
        userInfo: null
    }
});