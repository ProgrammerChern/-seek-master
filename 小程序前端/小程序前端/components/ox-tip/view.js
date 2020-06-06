getApp();

Component({
    properties: {},
    data: {
        addShow: !1,
        hc_addShow: wx.getStorageSync("addShow")
    },
    ready: function(t) {
        var a = wx.getMenuButtonBoundingClientRect(), o = wx.getSystemInfoSync().windowWidth / 750;
        console.log(a), 1 == this.data.hc_addShow ? this.setData({
            addShow: !1
        }) : (this.setData({
            addShow: !0
        }), wx.setStorageSync("addShow", 1)), console.log(this.data.hc_addShow), this.setData({
            tip: a,
            win: o
        });
    },
    methods: {
        closeTap: function() {
            this.setData({
                addShow: !1
            });
        }
    }
});