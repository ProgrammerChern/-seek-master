var a, t = getApp(), e = require("../../../../utils/qqmap-wx-jssdk.min.js");

Page({
    data: {
        isShow: !1,
        loading: !0,
        imgList: [],
        type: [],
        address: "",
        mapy: "",
        mapx: "",
        phone: "",
        detail: "",
        sexvalue: "",
        typeall: "",
        type_name: [],
        type_id: [],
        province: "",
        city: "",
        district: "",
        qq_map_key: ""
    },
    onLoad: function(a) {
        var e = this;
        t.util.getUserInfo(function(a) {
            a.memberInfo ? (t.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "ox_master",
                    r: "master.type",
                    uid: a.memberInfo.uid
                },
                success: function(a) {
                    e.setData({
                        typeall: a.data.data.typeall,
                        qq_map_key: a.data.data.qq_map_key,
                        type_num: a.data.data.type_num
                    });
                    for (var t = [], i = [], d = 0; d < a.data.data.typeall.length; d++) a.data.data.typeall[d].xuanzhong && (t.push(a.data.data.typeall[d].id), 
                    i.push(a.data.data.typeall[d].name));
                    e.setData({
                        type_name: i,
                        type_id: t
                    }), a.data.data.detail.mapx && (e.setData({
                        detail: a.data.data.detail,
                        address: a.data.data.detail.address,
                        mapy: a.data.data.detail.mapy,
                        mapx: a.data.data.detail.mapx,
                        province: a.data.data.detail.province,
                        city: a.data.data.detail.city,
                        district: a.data.data.detail.district,
                        sexvlue: a.data.data.detail.sex
                    }), a.data.data.detail.imgs.length > 0 && e.setData({
                        imgList: a.data.data.detail.imgs
                    }));
                }
            }), wx.setStorageSync("uid", a.memberInfo.uid)) : e.hideDialog();
        });
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    updateUserInfo: function(a) {
        var e = this;
        e.hideDialog(), t.util.getUserInfo(function(a) {
            t.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "ox_master",
                    r: "master.type",
                    uid: a.memberInfo.uid
                },
                success: function(a) {
                    a.data.data.store && 2 == a.data.data.store.status && t.util.message({
                        title: "已入驻跳转中",
                        redirect: "redirect:/pages/store/pages/manage/index"
                    }), e.setData({
                        typeall: a.data.data.typeall,
                        qq_map_key: a.data.data.qq_map_key,
                        type_num: a.data.data.type_num
                    });
                    for (var i = [], d = [], s = 0; s < a.data.data.typeall.length; s++) a.data.data.typeall[s].xuanzhong && (i.push(a.data.data.typeall[s].id), 
                    d.push(a.data.data.typeall[s].name));
                    e.setData({
                        type_name: d,
                        type_id: i
                    }), a.data.data.detail.address && (e.setData({
                        detail: a.data.data.detail,
                        address: a.data.data.detail.address,
                        mapy: a.data.data.detail.mapy,
                        mapx: a.data.data.detail.mapx,
                        province: a.data.data.detail.province,
                        city: a.data.data.detail.city,
                        district: a.data.data.detail.district,
                        sexvlue: a.data.data.detail.sex
                    }), a.data.data.detail.imgs.length > 0 && e.setData({
                        imgList: a.data.data.detail.imgs
                    }));
                }
            }), wx.setStorageSync("uid", a.memberInfo.uid);
        }, a.detail);
    },
    formSubmit: function(a) {
        var e = this;
        if (e.data.type_id.length < 1) t.util.message({
            title: "请选择服务类型",
            type: "error"
        }); else if ("" != a.detail.value.name && "undefined" != a.detail.value.name) if ("" != a.detail.value.phone && "undefined" != a.detail.value.phone) if (/^1[3456789]\d{9}$/.test(a.detail.value.phone)) if ("" != a.detail.value.address && "undefined" != a.detail.address) if ("" != e.data.mapx && "undefined" != e.data.mapx) if ("" != a.detail.value.address_detail && "undefined" != a.detail.address_detail) {
            var i = {
                formid: '',
                type_id: e.data.type_id,
                type_name: e.data.type_name,
                address: a.detail.value.address,
                name: a.detail.value.name,
                age: a.detail.value.age,
                detail: a.detail.value.detail,
                address_detail: '',
                mapy: e.data.mapy,
                mapx: e.data.mapx,
                sex: e.data.sexvlue,
                phone: a.detail.value.phone,
                imgs: JSON.stringify(e.data.imgList),
                uid: wx.getStorageSync("uid"),
                province: e.data.province,
                city: e.data.city,
                district: e.data.district,
                id: a.detail.value.id,
                m: "ox_master",
                r: "store.create"
            };
            t.util.request({
                url: "entry/wxapp/Api",
                data: i,
                method: "POST",
                success: function(a) {
                    wx.showModal({
                        title: "提交成功",
                        content: "",
                        success: function(a) {
                            a.confirm && wx.switchTab({
                                url: "/pages/me/index"
                            });
                        }
                    });
                }
            });
        } else t.util.message({
            title: "请填写店铺详细地址",
            type: "error"
        }); else t.util.message({
            title: "请点击获取地址",
            type: "error"
        }); else t.util.message({
            title: "请填写店铺地址",
            type: "error"
        }); else t.util.message({
            title: "请检查手机格式",
            type: "error"
        }); else t.util.message({
            title: "请填写服务电话",
            type: "error"
        }); else t.util.message({
            title: "请填写真实姓名",
            type: "error"
        });
    },
    getCity: function(t, e) {
        var i = this;
        a.reverseGeocoder({
            location: {
                latitude: t,
                longitude: e
            },
            success: function(a) {
                var a = a.result;
                i.setData({
                    province: a.address_component.province,
                    city: a.address_component.city,
                    district: a.address_component.district
                });
            },
            fail: function(a) {
                console.error(a);
            }
        });
    },
    sexChange: function(a) {
        this.setData({
            sexvlue: a.detail.value
        });
    },
    getPhoneNumber: function(a) {
        var e = this;
        t.util.getUserInfo(function(i) {
            a.detail.iv && t.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "ox_master",
                    r: "home.userphone",
                    iv: a.detail.iv,
                    encryptedData: a.detail.encryptedData
                },
                success: function(a) {
                    e.setData({
                        phone: a.data.data
                    }), console.log(a);
                }
            });
        });
    },
    tomap: function() {
        var t = this;
        wx.chooseLocation({
            success: function(i) {
                console.log(i), t.setData({
                    mapx: i.latitude,
                    mapy: i.longitude,
                    address: i.address
                }), a = new e({
                    key: t.data.qq_map_key
                });
                var d = i.latitude, s = i.longitude;
                t.getCity(d, s);
            },
            fail: function() {
                wx.getSetting({
                    success: function(a) {
                        a.authSetting["scope.userLocation"] || wx.showModal({
                            content: "请允许获取地理位置后再次尝试",
                            success: function(a) {
                                a.confirm ? wx.openSetting({
                                    success: function(a) {
                                        a.authSetting = {
                                            "scope.userInfo": !0,
                                            "scope.userLocation": !0
                                        };
                                    },
                                    fail: function(a) {
                                        console.log(a);
                                    }
                                }) : a.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                });
            }
        });
    },
    bindChange: function(a) {
        this.setData({
            type_index: a.detail.value,
            type_value: this.data.type[a.detail.value]
        });
    },
    deleteImg: function(a) {
        var t = a.currentTarget.dataset.id, e = this.data.imgList;
        e.splice(t, 1), this.setData({
            imgList: e
        });
    },
    uplaod: function() {
        var a = this;
        wx.chooseImage({
            count: 6,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var i = e.tempFilePaths, d = e.tempFilePaths.length, s = 1;
                a.setData({
                    loading: !1
                });
                for (var l in i) wx.uploadFile({
                    url: t.util.url("entry/wxapp/Api", {
                        m: "ox_master",
                        r: "upload.save"
                    }),
                    filePath: i[l],
                    name: "file",
                    success: function(t) {
                        var e = JSON.parse(t.data), i = a.data.imgList;
                        i.push(e.data), a.setData({
                            imgList: i
                        }), s == d && a.setData({
                            loading: !0
                        }), s += 1;
                    }
                });
            }
        });
    },
    typeselect: function(a) {
        var e = a.currentTarget.dataset.index, i = this.data.typeall;
        if (this.data.type_id.length != this.data.type_num || i[e].xuanzhong) {
            i[e].xuanzhong = !i[e].xuanzhong;
            for (var d = [], s = [], l = 0; l < this.data.typeall.length; l++) this.data.typeall[l].xuanzhong && (d.push(this.data.typeall[l].id), 
            s.push(this.data.typeall[l].name));
            this.setData({
                typeall: i,
                type_name: s,
                type_id: d
            });
        } else t.util.message({
            title: "最多只能选" + this.data.type_num + "个",
            type: "error"
        });
    }
});