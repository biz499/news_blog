$(document).on('ready',function(){
	"use strict";
	
	/*
	==============================================================
	   slick slider Script Start
	============================================================== 
	*/
	if($('.kf-slider-bitcoin').length){
		$('.kf-slider-bitcoin').slick({
		  infinite: true,
		  slidesToShow: 3,
		  slidesToScroll: 3,
		  responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
		});
	}
	
	if($('.kf_selling_add').length){
		$('.kf_selling_add').mkinfinite({
			maxZoom:       1.3,
			animationTime: 3000,
			imagesRatio:   (960 / 720),
			isFixedBG:     true,
			zoomIn:        true,
			imagesList:    new Array(
				'images/selling-add.png',
				'images/selling-add1.png',
				'images/selling-add2.png',
				'images/selling-add3.png',
				'images/selling-add.png',
			)
		});
	}
	
	if($('.instagram-slide').length){
		$('.instagram-slide').slick({
		  infinite: true,
		  slidesToShow: 6,
		  slidesToScroll: 6,
		   responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
		});
	}
	
	/*
	==============================================================
	   slick slider Script Start
	============================================================== 
	*/
	if($('.kf-bit-row-slide').length){
		$('.kf-bit-row-slide').slick({
		  infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1
		});
	}
	/*
	==============================================================
	   slick slider Script Start
	============================================================== 
	*/
	if($('.top-news-slide').length){
		$('.top-news-slide').slick({
		  infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  autoplay:true
		});
	}
	/*
	==============================================================
	   slick slider Script Start
	============================================================== 
	*/
	if($('.kf-blog-slide').length){
		$('.kf-blog-slide').slick({
		  infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  autoplay:true
		});kf-blog-slide
	}
	/*
	==============================================================
	   slick slider Script Start
	============================================================== 
	*/
	if($('.filtr-container').length){
		$('.filtr-container').filterizr();
	}
	
	/*
	==============================================================
	   slick slider Script Start
	============================================================== 
	*/
	if($('.mega-slider').length){
		$('.mega-slider').slick({
		  infinite: true,
		  slidesToShow: 4,
		  slidesToScroll: 4,
		  autoplay:true
		});
	}
	
	/* ---------------------------------------------------------------------- */
	/*	DL Responsive Menu
	/* ---------------------------------------------------------------------- */
	if(typeof($.fn.dlmenu) == 'function'){
		$('#kode-responsive-navigation').each(function(){
			$(this).find('.dl-submenu').each(function(){
				if( $(this).siblings('a').attr('href') && $(this).siblings('a').attr('href') != '#' ){
					var parent_nav = $('<li class="menu-item kode-parent-menu"></li>');
					parent_nav.append($(this).siblings('a').clone());
					
					$(this).prepend(parent_nav);
				}
			});
			$(this).dlmenu();
		});
	}
		
	/* ----------------------------Google Map-------------------------------------- */
	if($('#map-canvas').length){
		google.maps.event.addDomListener(window, 'load', initialize);
	}
	
});

/* Google Map Function */
function initialize() {
	var MY_MAPTYPE_ID = 'custom_style';
	var map;
	var brooklyn = new google.maps.LatLng(40.6743890, -73.9455);
	var featureOpts = [
		{
		  stylers: [
			{ hue: '#cbe6a3' },			
			{ visibility: 'simplified' },
			{ gamma: 0.9 },
			{ saturation: -500 },
			{ lightness: 15 },
			{ weight: 0.6 }
		  ]
		},
		{
		featureType: "road",
		  elementType: "geometry",
		  stylers: [
			{ lightness: 30 },
			{ visibility: "simplified" }
		  ]
		},
		{
		  elementType: 'labels',
		  stylers: [		  
			{ visibility: 'on' }
		  ]
		},
		{
		  featureType: 'water',
		  stylers: [
			{ color: '#cbe6a3' }
		  ]
		}
	];	

	var mapOptions = {
		zoom: 13,
		center: brooklyn,
		mapTypeControlOptions: {
		  mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
		},
		mapTypeId: MY_MAPTYPE_ID
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
		  mapOptions);

	var styledMapOptions = {
		name: 'Custom Style'
	};

	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}