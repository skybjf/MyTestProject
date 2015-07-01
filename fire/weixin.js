var imgUrl = "http://"+"gm"+".jiayuan"+".com"+"/development/FirePlane/publish/html5/res/share.jpg";
var lineLink = "http://"+"gm"+".jiayuan"+".com"+"/development/FirePlane/publish/html5";
var descContent = '一起打灰机吧';

wx.ready(function(){
	var shareData = {
		title:"打灰机，动手又动脑，一起来玩~",
		desc: descContent,
		link: lineLink,
		imgUrl: imgUrl
	};
	wx.onMenuShareAppMessage(shareData);
	wx.onMenuShareTimeline(shareData);

});

function shareText(){
	var shareData = {
		title: cc.customTitleRank+'就是我，击落灰机只用'+cc.customStepNum+'步！你行吗？',
		desc: descContent,
		link: lineLink,
		imgUrl: imgUrl
	};
	wx.onMenuShareAppMessage(shareData);
	wx.onMenuShareTimeline(shareData);

}


