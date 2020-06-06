var a = getApp();

Page({
    data: {
        id: ""
    },
    onLoad: function(e) {
        var t = this, i = decodeURIComponent(e.scene);
        console.log(i), "" != i && "undefined" != i ? (i = i.split(","), t.setData({
            id: i[0]
        }), wx.setStorageSync("shove_uid", i[1])) : e.id > 0 && t.setData({
            id: e.id
        }), e.shove_uid > 0 && wx.setStorageSync("shove_uid", e.shove_uid), t.data.id && a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "home.goodsDetail",
                id: t.data.id,
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                var e = a.data.data.detail.detail;
                t.setData({
                    detail: a.data.data.detail,
                    imgs: a.data.data.imgs,
                    concent: e.replace(/\<img/g, '<img style="width:100%;height:auto;disply:block"')
                }), wx.setNavigationBarTitle({
                    title: a.data.data.detail.goods_name
                });
            }
        });
    },
    goPay: function(a) {
        wx.navigateTo({
            url: "/pages/goods/order/index?id=" + a.currentTarget.dataset.id
        });
    },
    upPhoto: function(a) {
        var e = this, t = this;
        wx.showLoading({
            title: "稍等，马上好",
            mask: !0
        });
        var i = wx.createCanvasContext("shareCanvas", this);
        i.drawImage("/pages/images/share_tpl2.png", 0, 0, 414, 530), new Promise(function(a) {
            wx.getImageInfo({
                src: t.data.imgs[0].img_patch,
                success: function(e) {
                    i.drawImage(e.path, 0, 0, 414, 276), a();
                }
            });
        }).then(function() {
            return new Promise(function(a) {
                wx.getImageInfo({
                    src: e.data.detail.key_qrcode,
                    success: function(e) {
                        console.log(e), i.drawImage(e.path, 67, 326, 120, 120), i.save(), i.beginPath(), 
                        i.stroke(), i.clip(), i.restore(), a();
                    }
                });
            });
        }).then(function() {
            return new Promise(function(a) {
                i.draw(), setTimeout(function() {
                    return a();
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
                    var e = [ a.tempFilePath ];
                    wx.previewImage({
                        urls: e
                    });
                }
            }, e);
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.detail.goods_name,
            path: "pages/goods/detail/index?id=" + this.data.id + "&shove_uid=" + this.data.detail.shove_uid
        };
    }
});