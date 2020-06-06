var e = getApp();

Page({
    data: {
        id: 0,
        imgList: [],
        loading: !0
    },
    onLoad: function(e) {
        this.setData({
            id: e.id
        });
    },
    onShow: function() {},
    formSubmit: function(t) {
        var a = this;
        console.log(t.detail.value.prices), "" != t.detail.value.prices && "undefined" != t.detail.value.prices ? isNaN(t.detail.value.prices) ? e.util.message({
            title: "请填写正确价格",
            type: "error"
        }) : e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "bidding.index",
                uid: wx.getStorageSync("uid"),
                price: t.detail.value.prices,
                remark: t.detail.value.remark,
                imgs: JSON.stringify(a.data.imgList),
                order_id: this.data.id
            },
            success: function(e) {
                wx.showModal({
                    title: "系统消息",
                    content: e.data.message,
                    success: function(e) {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "系统消息",
                    content: e.data.message,
                    success: function(e) {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        }) : e.util.message({
            title: "请填写价格",
            type: "error"
        });
    },
    deleteImg: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.imgList;
        a.splice(t, 1), this.setData({
            imgList: a
        });
    },
    uplaod: function() {
        var t = this;
        wx.chooseImage({
            count: 6,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var i = a.tempFilePaths, s = a.tempFilePaths.length, n = 1;
                t.setData({
                    loading: !1
                });
                for (var r in i) wx.uploadFile({
                    url: e.util.url("entry/wxapp/Api", {
                        m: "ox_master",
                        r: "upload.save"
                    }),
                    filePath: i[r],
                    name: "file",
                    success: function(e) {
                        var a = JSON.parse(e.data), i = t.data.imgList;
                        i.push(a.data), t.setData({
                            imgList: i
                        }), n == s && t.setData({
                            loading: !0
                        }), n += 1;
                    }
                });
            }
        });
    }
});