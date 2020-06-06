function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var t = getApp();

Page({
    data: {
        description: "",
        coverUrl: "",
        coverShort: "",
        loading: !0,
        order_id: "",
        line_id: ""
    },
    onLoad: function(e) {
        var i = this;
        e.order_id && e.line_id ? i.setData({
            order_id: e.order_id,
            line_id: e.line_id
        }) : e.order_id && i.setData({
            order_id: e.order_id
        }), e.line_id && t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.lineDetail",
                order_id: i.data.order_id,
                line_id: i.data.line_id,
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                i.setData({
                    description: e.data.data.line_desc,
                    coverShort: e.data.data.img_url,
                    coverUrl: e.data.data.img_path
                });
            }
        });
    },
    inputDataSet: function(t) {
        this.setData(e({}, t.currentTarget.dataset.name, t.detail.value));
    },
    upCover: function() {
        var e = this;
        e.setData({
            loading: !1
        }), t.uplaod(function(t) {
            e.setData({
                loading: !0
            }), e.setData({
                coverUrl: t.all,
                coverShort: t.short
            });
        });
    },
    deleteImg: function() {
        this.setData({
            coverUrl: "",
            coverShort: ""
        });
    },
    radioChange: function(e) {
        this.setData({
            selType: e.detail.value
        });
    },
    goadd: function() {
        if ("" != this.data.coverShort) if ("" != this.data.description) {
            var e = {
                line_id: this.data.line_id,
                order_id: this.data.order_id,
                img_url: this.data.coverShort,
                uid: wx.getStorageSync("uid"),
                line_desc: this.data.description,
                m: "ox_master",
                r: "store.createLine"
            };
            t.util.request({
                url: "entry/wxapp/Api",
                data: e,
                method: "POST",
                success: function(e) {
                    t.util.message({
                        title: "操作成功",
                        type: "success"
                    }), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 3e3);
                }
            });
        } else t.util.message({
            title: "请填写描述内容",
            type: "error"
        }); else t.util.message({
            title: "请上传图片",
            type: "error"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});