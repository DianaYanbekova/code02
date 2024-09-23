$(document).ready(function() {
	$.fn.hasAttr = function(name) {
	   return this.attr(name) !== undefined;
	};
    $('body').on('click', '.tabs_form li', function(e){
        var $accBody = $(this).closest('.js-accordion-item').find('.js-accordion-body');
        if (!$(this).hasClass("active")){
            $('.tabs_form li').removeClass("active");
            $(this).addClass("active");
            $('.tab_item').removeClass("active");
            var index = $(this).index();
            $(".tab_item:eq( " + index + " )").addClass("active");

        }
        if (!$accBody.is(':visible')){
            $(this).closest(".js-accordion-wrap").find(".js-accordion-btn").removeClass("active");
            $(this).closest(".js-accordion-wrap").find(".js-accordion-body").slideUp();
            $accBody .slideDown().addClass("active");
        }
    });

	// Реализация задачи https://prodvigaeff.bitrix24.ru/company/personal/user/1261/tasks/task/view/9675/
	function bookOnline(ticket){
        var lang = $("html").attr("lang");
        var url = (lang == "en") ? "https://www.aeroflot.ru/sb/pnr/app/ru-en#/search?utm_source=akr&utm_medium=booking" : 'https://www.aeroflot.ru/sb/pnr/app/ru-ru#/search?utm_source=akr&utm_medium=booking';
        var wciUrl = (lang == "en") ? "https://booking.flyaurora.ru/websky/#/search-order" : 'https://booking.flyaurora.ru/websky/#/search-order';
        var wciUrlFV = (lang == "en") ? "https://wci.rossiya-airlines.ru/services/?lang=en#/search-order" : 'https://wci.rossiya-airlines.ru/services/?lang=ru#/search-order';

	    if (ticket>=2451&&ticket<=2479) {
            window.open(wciUrl, '_blank');
        } else if (ticket>=6001&&ticket<=6999){
            window.open(url, '_blank');
        } else if (ticket>=5501&&ticket<=5999){
            window.open(url, '_blank');
		} else {
            if (lang == 'en')
                alert('Wrong flight number');
            else
                alert('Неверный номер рейса');
            return false;
        }

        return true;
    }

	/*
    function bookOnline(ticket){
        var lang = $("html").attr("lang");
        var url = (lang == "en") ? "https://m.aeroflot.ru/b/info/pnr/load?_preferredLanguage=en" : 'https://m.aeroflot.ru/b/info/pnr/load?_preferredLanguage=ru';
        var wciUrl = (lang == "en") ? "https://wci.rossiya-airlines.ru/services/?lang=en#/search-separate-order" : 'https://wci.rossiya-airlines.ru/services/?lang=ru';
        if(ticket>=5501&&ticket<=5999){
            window.open(wciUrl, '_blank');
        } else if(ticket>=6000&&ticket<=6999){
            window.open(url, '_blank');
        } else {
            if (lang == 'en')
                alert('Wrong flight number');
            else
                alert('Неверный номер рейса');
            return false;
        }
        return true;
    }
	*/

    $('#pop-registration-book form').submit(function(){
        var ticket = parseInt($('#pop-registration-book .onestep-send-inp').val());
        if (bookOnline(ticket)){
            $('#pop-registration-book .popup-close').trigger('click');
        }
        return false;
    });

    $('#book-online').submit(function(){
        var ticket = parseInt($('#book-online .form-input').val());
        bookOnline(ticket);
        return false;
    });

    function isHomePage(){
    if (!!window.location){
        if (window.location.pathname == '/' || window.location.pathname == '/index.php'){
	    if (!!window.location.hash && window.location.hash == '#check-in'){
		$('.header a[data-pop="pop-registration"]').trigger("click");	  
	    }
        }
    }
}

isHomePage();

    if ($(".main-b-one").length > 0) {
        var firstSlide = $(".bleft-main .main-b-one:first-child");
        var firstSlideHtml = '<div class="bleft-main inMobile"><div class="main-b-one">' + firstSlide.html() + '</div></div>';
        var isInMobile = false;
        var needContainer = $('.three-bs .has-left-inset');

        function setSlideIn() {
            var width = $(window).width();
            if (width <= 600 && !isInMobile) {
                firstSlide.hide();
                needContainer.prepend(firstSlideHtml);
                isInMobile = true;
            } else if (width > 600 && isInMobile) {
                $(".bleft-main.inMobile").remove();
                firstSlide.show();
                isInMobile = false;
            }
        }

        setSlideIn();

        $(window).resize(function(){

            setSlideIn();
        });
    }

    // --- Валидация форм -----------------------------------------------------
 /* $(".js-validate").each(function(){
  $(this).validate({
      focusInvalid: false,
      rules: {
          name: {
              required: true
          },
          mail: {
              required: true,
              email: true
          },
          numb: {
              required: true
          },
          text: {
              required: true
          }
      },
      messages: {
          name: "",
          mail: "Неверный адрес",
          numb: "",
          text: ""
      },
      errorClass: "input-error",
      highlight: function(element, errorClass, validClass) {
        $(element).parent().addClass(errorClass);
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).parent().removeClass(errorClass);
      },
      submitHandler: function(form) { 
        alert("Submitted!"); 
        //form.submit();
      }
    });
  });
//  Маска ввода в поле телефонного номера
    $("[name='numb']").mask("+7 (999) 999-99-99",{placeholder:"_"});
*/

});

