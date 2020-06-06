var e = getApp();

Page({
    data: {
        isShow: !1,
        user_info: [],
        hqiphone: 2,
        uid: "",
        banner: []
    },
    onLoad: function(e) {
        var t = this;
        t.setData({
            uid: wx.getStorageSync("uid")
        }), t.getinfo(wx.getStorageSync("uid"));
    },
    onShow: function(e) {},
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    getinfo: function(t) {
        var a = this;
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.index",
                uid: t
            },
            success: function(e) {
                e.data.data && (a.setData({
                    user_info: e.data.data.user_info,
                    banner: e.data.data.banner,
                    info: e.data.data.info
                }), "2" != a.data.user_info.status ? a.setData({
                    hqiphone: 1
                }) : a.setData({
                    hqiphone: 0
                }));
            }
        });
    },
    getPhoneNumber: function(t) {
        var a = this;
        e.util.getUserInfo(function(n) {
            t.detail.iv && e.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "ox_master",
                    r: "shove.userphone",
                    iv: t.detail.iv,
                    uid: a.data.uid,
                    encryptedData: t.detail.encryptedData
                },
                success: function(e) {
                    a.setData({
                        phone: e.data.data
                    });
                }
            });
        });
    },
    gohome: function() {
        wx.switchTab({
            url: "/pages/me/index"
        });
    },
    tuiguang: function() {
        wx.navigateTo({
            url: "/pages/shove/pages/log/index"
        });
    },
    yongjin: function() {
        wx.navigateTo({
            url: "/pages/shove/pages/yongjin/index"
        });
    },
    cash: function() {
        wx.navigateTo({
            url: "/pages/shove/pages/cash/index"
        });
    },
    cashlog: function() {
        wx.navigateTo({
            url: "/pages/shove/pages/cashlog/index"
        });
    },
    rank: function() {
        wx.navigateTo({
            url: "/pages/shove/pages/rank/index"
        });
    },
    shareset: function() {
        wx.navigateTo({
            url: "/pages/shove/pages/ku/index"
        });
    },
    storeview: function() {
        wx.navigateTo({
            url: "/pages/shove/pages/storeview/index"
        });
    },
    myku: function() {
        wx.navigateTo({
            url: "/pages/shove/pages/userku/index"
        });
    },
    formSubmit: function(t) {
        var a = this;
        console.log(123), "" != t.detail.value.phone && "undefined" != t.detail.value.phone ? "" != t.detail.value.name && "undefined" != t.detail.value.name ? /^1[3456789]\d{9}$/.test(t.detail.value.phone) ? "" != t.detail.value.address && "undefined" != t.detail.address ? e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.sub_user",
                name: t.detail.value.name,
                phone: t.detail.value.phone,
                address: t.detail.value.address,
                uid: wx.getStorageSync("uid")
            },
            method: "post",
            success: function(e) {
                wx.showModal({
                    title: "",
                    content: "提交成功，请等待审核",
                    success: function(e) {
                        console.log(e), a.getinfo(wx.getStorageSync("uid"));
                    }
                });
            }
        }) : e.util.message({
            title: "请填写服务地址",
            type: "error"
        }) : e.util.message({
            title: "请检查手机格式",
            type: "error"
        }) : e.util.message({
            title: "请填写联系人",
            type: "error"
        }) : e.util.message({
            title: "请填写联系方式",
            type: "error"
        });
    },
    tomap: function() {
        var e = this;
        wx.authorize({
            scope: "scope.userLocation",
            success: function(t) {
                wx.chooseLocation({
                    success: function(t) {
                        e.setData({
                            latitude: t.latitude,
                            longitude: t.longitude,
                            address: t.address
                        }), qqmapsdk = new QQMapWX({
                            key: "HEQBZ-R6TWR-3YHWF-WJACM-ZH6LE-3SFB6"
                        });
                        var a = t.latitude, n = t.longitude;
                        e.getCity(a, n);
                    },
                    fail: function() {
                        wx.getSetting({
                            success: function(e) {
                                e.authSetting["scope.userLocation"] || wx.showModal({
                                    content: "请允许获取地理位置后再次尝试",
                                    success: function(e) {
                                        e.confirm ? wx.openSetting({
                                            success: function(e) {
                                                e.authSetting = {
                                                    "scope.userInfo": !0,
                                                    "scope.userLocation": !0
                                                };
                                            },
                                            fail: function(e) {
                                                console.log(e);
                                            }
                                        }) : e.cancel && console.log("用户点击取消");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    shareimage: function(e) {
        var t = this;
        wx.showLoading({
            title: "稍等，马上好",
            mask: !0
        });
        var a = wx.createCanvasContext("shareCanvas", this);
        a.drawImage("/pages/images/share_tpl2.png", 0, 0, 414, 530), new Promise(function(e) {
            wx.getImageInfo({
                src: t.data.user_info.img0,
                success: function(t) {
                    a.drawImage(t.path, 0, 0, 414, 276), e();
                }
            });
        }).then(function() {
            return new Promise(function(e) {
                wx.getImageInfo({
                    src: t.data.user_info.shove_qrcode,
                    success: function(t) {
                        console.log(t), a.drawImage(t.path, 67, 326, 120, 120), a.save(), a.beginPath(), 
                        a.stroke(), a.clip(), a.restore(), e();
                    }
                });
            });
        }).then(function() {
            return new Promise(function(e) {
                a.draw(), setTimeout(function() {
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
                success: function(e) {
                    var t = [ e.tempFilePath ];
                    wx.previewImage({
                        urls: t
                    });
                }
            }, t);
        });
    }
});