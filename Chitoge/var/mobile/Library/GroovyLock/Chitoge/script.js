$(document).ready(function(){
	if (blur) {
		$("div.blur").blurjs({
			source: "div.bg",
			radius: blurRadius
		});
	}

	run();
});

function run() {
	if (groovyAPI.isShowingNotifications()){
		$("div.allthethings").animate({
			"top": "-50px"
		}, 1000);
		if (hideBlurWithNotifications) {
			$("div.blur").animate({
				"opacity": "0"
			}, 1000)
		}
	} else {
		$("div.allthethings").animate({
			"top": "100px"
		}, 1000);
		if (hideBlurWithNotifications) {
			$("div.blur").animate({
				"opacity": "1"
			}, 1000)
		}	
	}

	setTimeout(run, 1000);
}