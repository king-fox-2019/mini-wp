$(document).on("click", function(e) {
	// e.preventDefault();
	var $item = $(".rad-dropmenu-item");
	if ($item.hasClass("active")) {
		$item.removeClass("active");
	}

	$(window).on("scroll", function(e) {
		if ($(window).scrollTop() > 50) {
			$("body").addClass("sticky");
		} else {
			$("body").removeClass("sticky");
		}
	});
	
	$('.rad-sidebar a').on("click", function(e) {
		e.stopPropagation();
	});

	$(".rad-toggle-btn").on('click', function() {
		$(".rad-logo-container").toggleClass("rad-nav-min");
		$(".rad-sidebar").toggleClass("rad-nav-min");
		$(".rad-body-wrapper").toggleClass("rad-nav-min");
	});

	$("li.rad-dropdown > a.rad-menu-item").on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(".rad-dropmenu-item").removeClass("active");
		$(this).next(".rad-dropmenu-item").toggleClass("active");
	});

	$(".fa-chevron-down").on("click", function() {
		var $ele = $(this).parents('.panel-heading');
		$ele.siblings('.panel-footer').toggleClass("rad-collapse");
		$ele.siblings('.panel-body').toggleClass("rad-collapse", function() {
			setTimeout(function() {
				initializeCharts();
			}, 200);
		});
	});

	$(".fa-close").on("click", function() {
		var $ele = $(this).parents('.panel');
		$ele.addClass('panel-close');
		setTimeout(function() {
			$ele.parent().remove();
		}, 210);
	});

	$(".fa-rotate-right").on("click", function() {
		var $ele = $(this).parents('.panel-heading').siblings('.panel-body');
		$ele.append('<div class="overlay"><div class="overlay-content"><i class="fa fa-refresh fa-2x fa-spin"></i></div></div>');
		setTimeout(function() {
			$ele.find('.overlay').remove();
		}, 2000);
	});
	
	var colorMap = {
		crimson: "crimson", 
		teal: "#1fb5ad", 
		orange: "#ff503f", 
		purple: "rebeccapurple", 
		twitter: "#55acee"
	};

	$('.rad-color-swatch input[type=radio]').change(function(e) {
		if ($('.rad-chk-pin input[type=checkbox]').is(":checked")) {
			$('body').removeClass().addClass("flat-theme").addClass(this.value);
			$('.rad-color-swatch label').removeClass("rad-option-selected");
			$(this).parent().addClass("rad-option-selected");
			$(window).scrollTop(0);
			
		} else {
			return false;
		}
	});
	
	
	$(".rad-notification-item").on("click", function(e) {
		e.stopPropagation();
	});
	const input = document.getElementById("search-input");
	const searchBtn = document.getElementById("search-btn");
	const expand = () => {
	searchBtn.classList.toggle("close");
	input.classList.toggle("square");
	};

	if (searchBtn) {
		searchBtn.addEventListener("click", expand);
	}
});
