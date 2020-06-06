var a = getApp();

Page({
    data: {
        imgList: [],
        detail: {},
        appraiseList: "",
        TabCur: 1,
        scrollLeft: 0
    },
    onLoad: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "ox_master",
                r: "store.storeDetail2",
                master_uid: t.uid
            },
            success: function(a) {
                e.setData({
                    detail: a.data.data.detail,
                    imgList: a.data.data.imgs,
                    idcard: a.data.data.idcard,
                    appraiseList: a.data.data.appraiseList
                });
            }
        });
    },
    call: function(a) {
        wx.makePhoneCall({
            phoneNumber: a.target.dataset.phone
        });
    },
    tabSelect: function(a) {
        this.setData({
            TabCur: a.currentTarget.dataset.id,
            scrollLeft: 60 * (a.currentTarget.dataset.id - 1)
        });
    }
});