var e = getApp();

Page({
    data: {
        coverUrl: "",
        coverShort: "",
        name: "",
        id_code: ""
    },
    onLoad: function(a) {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Api",
            showLoading: !1,
            data: {
                m: "ox_master",
                r: "store.idcard",
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                var a = e.data.data;
                e.data.data && t.setData({
                    detail: a,
                    coverUrl: a.id_img_path,
                    coverShort: a.id_img,
                    name: a.name,
                    id_code: a.id_code,
                    status: a.status,
                    reject: a.reject
                });
            }
        });
    },
    formSubmit: function(a) {
        var t = this;
        if ("" != a.detail.value.name && void 0 != a.detail.value.name) if ("" != a.detail.value.id_code && void 0 != a.detail.value.id_code) if ("" != a.detail.value.coverShort && void 0 != a.detail.value.coverShort) {
            var i = {
                name: a.detail.value.name,
                id_code: a.detail.value.id_code,
                id_img: t.data.coverShort,
                uid: wx.getStorageSync("uid"),
                m: "ox_master",
                r: "store.idcard"
            };
            e.util.request({
                url: "entry/wxapp/Api",
                data: i,
                method: "POST",
                success: function(e) {
                    wx.showModal({
                        title: "认证已提交",
                        content: "",
                        success: function(e) {
                            wx.navigateBack({
                                delta: 2
                            });
                        }
                    });
                }
            });
        } else e.util.message({
            title: "请上传身份证照片",
            type: "error"
        }); else e.util.message({
            title: "请填写身份证号",
            type: "error"
        }); else e.util.message({
            title: "请填写认证人姓名",
            type: "error"
        });
    },
    uplegalId: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            success: function(t) {
                var i = t.tempFilePaths;
                wx.uploadFile({
                    url: e.util.url("entry/wxapp/Api", {
                        m: "ox_master",
                        r: "upload.saveCard"
                    }),
                    filePath: i[0],
                    name: "file",
                    success: function(t) {
                        var i = JSON.parse(t.data);
                        console.log(t), "0" == i.errno ? a.setData({
                            coverUrl: i.data.all,
                            coverShort: i.data.short,
                            name: i.data.idcard.name,
                            id_code: i.data.idcard.id
                        }) : e.util.message({
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
    }
});