#pageSwapper
单页应用页面导航库

适用于mobile web或cordova、phonegap webapp、无兼容要求单页PC应用等。

可自定义css3动画效果，提供回调接口，当前页面与下个页面切换结束后删除，永远保留一个页面。

搭配backbone更佳，纯原生js，不需要依赖其他库。

##如何使用
引入相关的CSS以及JS, 如下：

	<link rel="stylesheet" href="page.css">

	<script src="pageSwapper.js"></script>

HTML结构需要有一定的要求：
	
	body
		page // 当前页
		page // 即将切换的下一个页面，切换时生成

	// 每个page是个满屏元素, 相当于一个独立的页面。

调用方法：

	Swapper(elem1, elem2, config, callback);

	// elem1 是DOM存在的元素
	// elem2 是DOM还不存在的元素
	// config可自定义
	// callback 切换结束时回调

	config = {
        animateOne: // 默认 'slideouttoleft', 对应 css3 @-webkit-keyframes slideouttoleft
        animateTwo: // 默认 'slideinfromright', 对应 css3 @-webkit-keyframes slideinfromright
        duration: // 默认 400,
        easing: // 默认 'ease-in-out'
    };


