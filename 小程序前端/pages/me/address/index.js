var e = getApp();

Page({
    data: {
        list: [],
        need: !1
    },
    onLoad: function(t) {
        t.id && this.setData({
            need: !0
        }), e.util.getUserInfo(function(e) {
            e.memberInfo || wx.navigateTo({
                url: "/pages/login/index"
            });
        });
    },
    onShow: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "address.addressList",
                uid: wx.getStorageSync("uid")
            },
            method: "get",
            success: function(e) {
                t.setData({
                    list: e.data.data
                });
            }
        });
    },
    add: function(e) {
        e.currentTarget.dataset.id ? wx.navigateTo({
            url: "/pages/me/address/detail/index?id=" + e.currentTarget.dataset.id
        }) : wx.navigateTo({
            url: "/pages/me/address/detail/index"
        });
    },
    selectAddress: function(e) {
        var t = this;
        if (this.data.need) {
            var a = t.data.list[e.currentTarget.dataset.index], n = getCurrentPages();
            n[n.length - 2].setData({
                address: a
            }), wx.navigateBack({
                delta: 1
            });
        }
    },
    formSubmit: function(t) {
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "me.suggest",
                name: t.detail.value.name,
                phone: t.detail.value.phone
            },
            method: "get",
            success: function(e) {
                wx.showModal({
                    title: "",
                    content: "保存成功",
                    success: function(e) {
                        console.log(e), e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        });
    }
});