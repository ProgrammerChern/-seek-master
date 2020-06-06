var e = getApp();

Page({
    data: {
        billUrl: "",
        billShort: "",
        store: "",
        bg: "/pages/images/share_tpl2.png"
    },
    onLoad: function(a) {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Api",
            showLoading: !1,
            data: {
                m: "ox_master",
                r: "shove.user_shove_img",
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                var a = e.data.data;
                t.setData({
                    user: a,
                    billUrl: a.bill
                });
            }
        }), console.log(t.data);
    },
    savePhoto: function(a) {
        var t = this, s = this;
        if (void 0 != s.data.billUrl && "" != s.data.billUrl && null != s.data.billUrl) {
            wx.showLoading({
                title: "稍等，马上好",
                mask: !0
            });
            var o = wx.createCanvasContext("shareCanvas", this);
            o.drawImage("/pages/images/share_tpl2.png", 0, 0, 414, 530), new Promise(function(e) {
                wx.getImageInfo({
                    src: s.data.billUrl,
                    success: function(a) {
                        o.drawImage(a.path, 0, 0, 414, 276), e();
                    }
                });
            }).then(function() {
                return new Promise(function(e) {
                    wx.getImageInfo({
                        src: t.data.user.shove_qrcode,
                        success: function(a) {
                            console.log(a), o.drawImage(a.path, 67, 326, 120, 120), o.save(), o.beginPath(), 
                            o.stroke(), o.clip(), o.restore(), e();
                        }
                    });
                });
            }).then(function() {
                return new Promise(function(e) {
                    o.draw(), setTimeout(function() {
                        return e();
                    }, 1e3);
                });
            }).then(function() {
                wx.hideLoading(), wx.canvasToTempFilePath({
                    canvasId: "shareCanvas",
                    x: 0,
                    y: 0,
                    width: 414,
                    height: 530,
                    success: function(a) {
                        wx.authorize({
                            scope: "scope.writePhotosAlbum",
                            success: function() {
                                wx.saveImageToPhotosAlbum({
                                    filePath: a.tempFilePath,
                                    success: function(a) {
                                        e.util.message({
                                            title: "海报已保存到相册"
                                        });
                                    },
                                    fail: function(e) {
                                        console.log(e);
                                    }
                                });
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                }, t);
            });
        } else e.util.message({
            title: "请先替换背景",
            type: "error"
        });
    },
    upBill: function(a) {
        var t = this;
        t.setData({
            loading: !1
        }), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            success: function(a) {
                var s = a.tempFilePaths;
                wx.uploadFile({
                    url: e.util.url("entry/wxapp/Api", {
                        m: "ox_master",
                        r: "shove.save_shove_img",
                        uid: wx.getStorageSync("uid")
                    }),
                    filePath: s[0],
                    name: "file",
                    success: function(e) {
                        var a = JSON.parse(e.data);
                        console.log(a), t.setData({
                            loading: !0,
                            billUrl: a.data.all,
                            billShort: a.data.short
                        });
                    }
                });
            }
        });
    }
});