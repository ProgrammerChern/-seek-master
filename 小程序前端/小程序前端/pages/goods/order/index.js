var a = getApp(), t = [ "6:00~8:00", "7:00~9:00", "8:00~10:00", "9:00~11:00", "10:00~12:00", "11:00~13:00", "12:00~14:00", "13:00~15:00", "14:00~16:00", "15:00~17:00", "16:00~18:00", "17:00~19:00", "18:00~20:00", "19:00~21:00", "20:00~22:00" ];

Page({
    data: {
        imgList: [],
        type: [],
        dateIndex: [ 0, 0 ],
        date: [ [], [] ],
        days: [],
        time: [],
        type_value: "",
        type_index: "",
        card: [],
        card_id: 0
    },
    onLoad: function(t) {
        var d = this;
        console.log(t), a.util.getUserInfo(function(a) {
            a.memberInfo || wx.navigateTo({
                url: "/pages/login/index"
            });
        }), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "master.order",
                uid: wx.getStorageSync("uid"),
                id: t.id
            },
            success: function(a) {
                d.setData({
                    address: a.data.data.address,
                    date: [ a.data.data.days, a.data.data.times ],
                    time: a.data.data.times,
                    days: a.data.data.days,
                    detail: a.data.data.detail,
                    card: a.data.data.card,
                    card_id: a.data.data.card.id
                });
            }
        });
    },
    onShow: function(a) {},
    address: function() {
        wx.navigateTo({
            url: "/pages/me/address/index?id=1"
        });
    },
    formSubmit: function(t) {
        var d = this;
        if ("" != d.data.address && "undefined" != d.data.address) {
            var e = {
                formid: t.detail.formId,
                orderid: d.data.detail.id,
                address: d.data.address.address,
                address_detail: d.data.address.address_detail,
                mapy: d.data.address.longitude,
                mapx: d.data.address.latitude,
                province: d.data.address.province,
                city: d.data.address.city,
                district: d.data.address.district,
                phone: d.data.address.phone,
                name: d.data.address.name,
                remark: t.detail.value.remark,
                uid: wx.getStorageSync("uid"),
                time: d.data.date[0][d.data.dateIndex[0]] + d.data.date[1][d.data.dateIndex[1]],
                card_id: d.data.card_id,
                m: "ox_master"
            };
            a.util.request({
                url: "entry/wxapp/PayGoods",
                data: e,
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
                                title: "预约成功",
                                content: "正在为您联系服务人员",
                                success: function(a) {
                                    a.confirm && wx.switchTab({
                                        url: "/pages/order/index"
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
        } else a.util.message({
            title: "请选择地址",
            type: "error"
        });
    },
    edit_card_id: function(a) {
        var t = this.data.detail;
        1 == a.detail.value.length ? (t.rear_price = t.rear_price - this.data.card.jian, 
        t.rear_price = t.rear_price.toFixed(2), t.rear_price < 0 && (t.rear_price = 0), 
        this.setData({
            card_id: this.data.card.id,
            detail: t
        })) : (t.rear_price = this.data.detail.price, this.setData({
            card_id: 0,
            detail: t
        }));
    },
    datechange: function(a) {
        this.setData({
            selectTime: a.detail
        });
    },
    bindPickerChange: function(a) {
        this.setData({
            dateIndex: a.detail.value
        });
    },
    bindColumnChange: function(a) {
        var d = this;
        0 == a.detail.column && (0 == a.detail.column && 0 == a.detail.value ? d.setData({
            date: [ d.data.days, d.data.time ]
        }) : this.setData({
            date: [ d.data.days, t ]
        }));
    }
});