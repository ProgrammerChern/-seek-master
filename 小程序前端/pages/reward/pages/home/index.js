var a = getApp(), t = [ "6:00~8:00", "7:00~9:00", "8:00~10:00", "9:00~11:00", "10:00~12:00", "11:00~13:00", "12:00~14:00", "13:00~15:00", "14:00~16:00", "15:00~17:00", "16:00~18:00", "17:00~19:00", "18:00~20:00", "19:00~21:00", "20:00~22:00" ];

Page({
    data: {
        isShow: !1,
        loading: !0,
        imgList: [],
        type: [],
        dateIndex: [ 0, 0 ],
        date: [ [], [] ],
        days: [],
        time: [],
        type_value: "",
        type_index: "",
        userblack: 0,
        userblack_info: []
    },
    onLoad: function(t) {
        var e = this;
        a.util.getUserInfo(function(a) {
            a.memberInfo ? e.black(a.memberInfo.uid) : wx.navigateTo({
                url: "/pages/login/index"
            });
        }), t.id && e.setData({
            id: t.id
        }), this.setData({
            type_value: t.type_value
        }), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "master.need",
                uid: wx.getStorageSync("uid"),
                id: e.data.id
            },
            success: function(a) {
                e.setData({
                    address: a.data.data.address,
                    info: a.data.data.info,
                    date: [ a.data.data.days, a.data.data.times ],
                    time: a.data.data.times,
                    days: a.data.data.days
                });
                var t = a.data.data.type.content;
                t && e.setData({
                    content: t.replace(/\<img/g, '<img style="width:100%;height:auto;disply:block"')
                });
            }
        }), wx.setNavigationBarTitle({
            title: t.type_value
        });
    },
    onShow: function() {},
    address: function() {
        wx.navigateTo({
            url: "/pages/me/address/index?id=1"
        });
    },
    shuoming: function() {
        this.setData({
            content: ""
        });
    },
    black: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "me.userblack",
                uid: t
            },
            success: function(a) {
                a.data.data.user && e.setData({
                    userblack: 1,
                    userblack_info: a.data.data.user
                });
            }
        });
    },
    formSubmit: function(t) {
        var e = this;
        if ("" != e.data.address && "undefined" != e.data.address) if (e.data.imgList.length < 1) a.util.message({
            title: "请上传图片方便服务人员了解具体情况",
            type: "error"
        }); else {
            var d = {
                formid: t.detail.formId,
                id: e.data.id,
                type_name: e.data.type_value,
                address: e.data.address.address,
                address_detail: e.data.address.address_detail,
                mapy: e.data.address.longitude,
                mapx: e.data.address.latitude,
                province: e.data.address.province,
                city: e.data.address.city,
                district: e.data.address.district,
                phone: e.data.address.phone,
                name: e.data.address.name,
                remark: t.detail.value.remark,
                imgs: JSON.stringify(e.data.imgList),
                uid: wx.getStorageSync("uid"),
                time: e.data.date[0][e.data.dateIndex[0]] + e.data.date[1][e.data.dateIndex[1]],
                m: "ox_master"
            };
            a.util.request({
                url: "entry/wxapp/PayRepair",
                data: d,
                method: "POST",
                success: function(a) {
                    a.data && "1" == a.data.message && wx.showModal({
                        title: "预约成功",
                        content: "正在为您联系服务人员",
                        success: function(a) {
                            console.log(a), a.confirm && wx.switchTab({
                                url: "/pages/order/index"
                            });
                        }
                    }), a.data && a.data.data && !a.data.errno && "1" != a.data.message && wx.requestPayment({
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
    getPhoneNumber: function(t) {
        var e = this;
        t.detail.iv && a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "home.userphone",
                iv: t.detail.iv,
                encryptedData: t.detail.encryptedData
            },
            success: function(a) {
                e.setData({
                    phone: a.data.data
                }), console.log(a);
            }
        });
    },
    deleteImg: function(a) {
        var t = a.currentTarget.dataset.id, e = this.data.imgList;
        e.splice(t, 1), this.setData({
            imgList: e
        });
    },
    uplaod: function() {
        var t = this;
        wx.chooseImage({
            count: 6,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var d = e.tempFilePaths, s = e.tempFilePaths.length, i = 1;
                t.setData({
                    loading: !1
                });
                for (var n in d) wx.uploadFile({
                    url: a.util.url("entry/wxapp/Api", {
                        m: "ox_master",
                        r: "upload.save"
                    }),
                    filePath: d[n],
                    name: "file",
                    success: function(a) {
                        var e = JSON.parse(a.data), d = t.data.imgList;
                        d.push(e.data), t.setData({
                            imgList: d
                        }), i == s && t.setData({
                            loading: !0
                        }), i += 1;
                    }
                });
            }
        });
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
        var e = this;
        0 == a.detail.column && (0 == a.detail.column && 0 == a.detail.value ? e.setData({
            date: [ e.data.days, e.data.time ]
        }) : this.setData({
            date: [ e.data.days, t ]
        }));
    }
});