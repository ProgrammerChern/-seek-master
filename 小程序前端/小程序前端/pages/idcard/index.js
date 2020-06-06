var t = getApp();

Page({
    data: {
        content: ""
    },
    onLoad: function() {},
    company: function() {
        t.util.message({
            title: "暂未开放企业认证",
            type: "error"
        });
    },
    goqcert: function() {
        wx.navigateTo({
            url: "/pages/store/pages/qycertificate/index"
        });
    }
});