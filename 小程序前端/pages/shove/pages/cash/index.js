var e = getApp();

Page({
    data: {
        userinfo: [],
        timoney: ""
    },
    onLoad: function(e) {
        this.get_info();
    },
    get_info: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.cash",
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                t.setData({
                    userinfo: e.data.data.userinfo
                });
            }
        });
    },
    onShow: function() {
        this.get_info();
    },
    tixian: function(t) {
        var a = this;
        "" != t.detail.value.takemoney && "undefined" != t.detail.value.takemoney ? a.data.userinfo.money - t.detail.value.takemoney < 0 ? e.util.message({
            title: "账户余额不足",
            type: "error"
        }) : t.detail.value.takemoney - a.data.userinfo.min_cash < 0 ? e.util.message({
            title: "最低提现额：" + a.data.userinfo.min_cash + "元",
            type: "error"
        }) : e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "shove.takeAdd",
                uid: wx.getStorageSync("uid"),
                formid: t.detail.formId,
                takemoney: t.detail.value.takemoney
            },
            success: function(t) {
                a.setData({
                    timoney: ""
                }), "0" == t.data.errno ? (e.util.message({
                    title: "提交申请成功",
                    type: "success"
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: "/pages/shove/pages/cashlog/index"
                    });
                }, 2e3)) : e.util.message({
                    title: t.data.message,
                    type: "success"
                });
            }
        }) : e.util.message({
            title: "请填写提现金额",
            type: "error"
        });
    },
    quanti: function() {
        this.setData({
            timoney: this.data.userinfo.money
        });
    },
    cashlog: function() {
        wx.navigateTo({
            url: "/pages/shove/pages/cashlog/index"
        });
    }
});