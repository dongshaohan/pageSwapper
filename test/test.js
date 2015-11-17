(function () {
	var $home = $('#home');
	var $body = $('#body');
	var $back = $body.find('.return');
	var index = 0;
	var option = [
		{
			animateOne: 'slideouttoleft',
			animateTwo: 'slideinfromright'
		},
		{
			animateOne: 'slideouttoright',
			animateTwo: 'slideinfromleft'
		},
		{
			animateOne: 'scaleItOut',
			animateTwo: 'scaleItIn'
		},
		{
			animateOne: 'fadeOutIt',
			animateTwo: 'fadeInIt'
		}
	];

	$back.remove();

	$body.on('click', '.slideLeft', function () {
		index = 1;
		Swapper($home[0], $back[0], option[0], function () {
			console.log('左到右切换结束');
		});
	})
	.on('click', '.slideRight', function () {
		index = 0;
		Swapper($home[0], $back[0], option[1], function () {
			console.log('右到左切换结束');
		});
	})
	.on('click', '.scaleIn', function () {
		index = 2;
		Swapper($home[0], $back[0], option[2], function () {
			console.log('缩小到放大切换结束');
		});
	})
	.on('click', '.fadeIn', function () {
		index = 3;
		Swapper($home[0], $back[0], option[3], function () {
			console.log('渐隐渐现切换结束');
		});
	})
	.on('click', '.return', function () {
		Swapper($back[0], $home[0], option[index], function () {
			console.log('返回切换结束');
		});
	});			
}());