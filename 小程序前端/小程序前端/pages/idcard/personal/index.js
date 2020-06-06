var a = getApp();

Page({
    data: {
        coverUrl: "",
        coverShort: "",
        name: "",
        id_code: ""
    },
    onLoad: function(e) {
        var t = this;
        a.util.request({
            url: "entry/wxapp/Api",
            showLoading: !1,
            data: {
                m: "ox_master",
                r: "store.idcard",
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                var e = a.data.data;
                a.data.data && t.setData({
                    detail: e,
                    coverUrl: e.id_img_path,
                    coverShort: e.id_img,
                    name: e.name,
                    id_code: e.id_code,
                    status: e.status,
                    reject: e.reject
                });
            }
        });
    },
    formSubmit: function(e) {
        var t = this;
        if ("" != e.detail.value.name && void 0 != e.detail.value.name) if ("" != e.detail.value.id_code && void 0 != e.detail.value.id_code) {
            var i = {
                name: e.detail.value.name,
                id_code: e.detail.value.id_code,
                id_img: t.data.coverShort,
                uid: wx.getStorageSync("uid"),
                m: "ox_master",
                r: "store.idcard"
            };
            a.util.request({
                url: "entry/wxapp/Api",
                data: i,
                method: "POST",
                success: function(a) {
                    wx.showModal({
                        title: "认证已提交",
                        content: "",
                        success: function(a) {
                            wx.navigateBack({
                                delta: 2
                            });
                        }
                    });
                }
            });
        } else a.util.message({
            title: "请填写身份证号",
            type: "error"
        }); else a.util.message({
            title: "请填写认证人姓名",
            type: "error"
        });
    },
    uplegalId: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            success: function(t) {
                var i = t.tempFilePaths;
                wx.uploadFile({
                    url: a.util.url("entry/wxapp/Api", {
                        m: "ox_master",
                        r: "upload.saveCard"
                    }),
                    filePath: i[0],
                    name: "file",
                    success: function(t) {
                        var i = JSON.parse(t.data);
                        console.log(t), "0" == i.errno ? e.setData({
                            coverUrl: i.data.all,
                            coverShort: i.data.short,
                            name: i.data.idcard.name,
                            id_code: i.data.idcard.id
                        }) : a.util.message({
                            title: "请上传真实身份证照片",
                            type: "error"
                        });
                    }
                });
            }
        });
    },
    deleteIdImg: function() {
        this.setData({
            coverUrl: "",
            coverShort: ""
        });
    },
    payauth: function(e) {
        var t = {
            uid: wx.getStorageSync("uid"),
            m: "ox_master"
        };
        a.util.request({
            url: "entry/wxapp/PayAuth",
            data: t,
            method: "POST",
            success: function(a) {
                a.data && a.data.data && !a.data.errno && wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        wx.showModal({
                            title: "支付成功",
                            content: "您可以报价抢单了",
                            success: function(a) {
                                a.confirm && wx.navigateTo({
                                    url: "/pages/store/pages/admin/index"
                                });
                            }
                        });
                    },
                    fail: function(a) {
                        backApp();
                    }
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && backApp();
                    }
                });
            }
        });
    }
});