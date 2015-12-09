$(function(){
    $.post("/wx/portal/wxconfig/",{
		"url":location.href
	},function(data){
		wx.config(data);
        var share = function() {
            shareJson = {
                link:"http://cmq.qingdianer.com",
                imgUrl:"http://cmq.qingdianer.com/static/image/share.jpg",
                title:"你的脑洞够不够开？",
                desc:"中国移动车联网征名活动邀你一起大猜想~"

            };
			wx.onMenuShareTimeline(shareJson);
			wx.onMenuShareAppMessage(shareJson);
        };
		wx.ready(function(){
            share();
        });
		wx.error(function(res){
			$.get("/wx/portal/update_access_token/",function(data){
				$.post("/wx/portal/wxconfig/",{
					"url":location.href
				},function(data){
					wx.config(data);
					wx.ready(function(){
		                share();
                    });
		        });
		    });
        });
    });
});
