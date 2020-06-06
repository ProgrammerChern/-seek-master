var t = getApp();

Page({
    data: {
        list: [],
        detail: []
    },
    onLoad: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "home.typeList",
                type: a.type
            },
            success: function(t) {
                t.data.data && (wx.setNavigationBarTitle({
                    title: t.data.data.detail.name
                }), e.setData({
                    list: t.data.data.list,
                    detail: t.data.data.detail
                }));
            }
        });
    },
    onShareAppMessage: function() {},
    gofenlei: function(a) {
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "me.add_formid",
                uid: wx.getStorageSync("uid"),
                formid: a.detail.formId
            }
        }), wx.navigateTo({
            url: "/pages/need/pages/home/index?type_value=" + a.target.dataset.name + "&id=" + a.target.dataset.id
        });
    }
});