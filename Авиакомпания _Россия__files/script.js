/*----------- ФУНКЦИИ: Подбор размера картинок для слайдера  -------------*/
  function mainPageSliderImgs(start){

    var $slider = $("#main-page-slider"),
        $slides = $slider.find(".main-page-slide"),
        $redLine = $(".main-page-redline"),
	wWidth = $(window).width();

	var retina = window.devicePixelRatio > 1 ? true : false;

	var winWidth = retina ? window.matchMedia('(max-width: 1990px)').matches :  window.matchMedia('(max-width: 990px)').matches;
	

    if (start){
         if (winWidth){
		$slider.attr('data-type', 'mob');
	 }
    }
	$slider.attr("data-type", "mob");
    if ( wWidth < 990 ){ 

	slideHeight = $(window).width()/2;
//console.log($redLine);
	 $redLine.css('height','auto');
	 $slider.css('height',slideHeight+'px');
    }
    else {
	 $redLine.removeAttr( 'style' );
	 $slider.css('height', '100%');
	 //$slider.prop("style", "height: 100%;");
    }

    if (start || old != winWidth){
		
	    $slides.each( function(){
	      var $slide = $(this);
		
	      if ( winWidth ){
	        //$slide.attr("style", "background-image: url(" + $slide.attr("data-image-ltl") + ");");
	      } else {
	        //$slide.attr("style", "background-image: url(" + $slide.attr("data-image-big") + ");");
	      };
	    });
    }
    old = winWidth;
  };

$(document).ready(function() {
  var old = false;
  mainPageSliderImgs(true);
  $(window).resize(function(){ mainPageSliderImgs(false); });
});