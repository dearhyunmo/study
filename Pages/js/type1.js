$(document).ready(function(){
			$box = $(".b-sel-title");  
			$box.click(function(){
				$(this).next().toggleClass('on');          
			});
		});