$(document).ready(function() {
    $.fn.hasAttr = function(name) {
	   return this.attr(name) !== undefined;
	};

       $('body').on('click', '.form-line.pressLine:nth-of-type(1) .form-input', function(event) {
        $('.g-recaptcha').css('display', 'block');
    });


    $('.custom_tb a[href$=".zip"], .custom_tb a[href$=".pdf"], .custom_tb a[href$="=="]').click(function (event) {
        if (!$(this).parents('#content').length) {
            event.preventDefault();
            var attr_href = $(this).attr('href');
            $('#pop-press-some-content .popup-body').html("<a href='" + attr_href + "' class='color_red'>Скачать документ для просмотра.</a>")
            $('#pop-press-some-content').css("display", "block");
        }
    });

    $('.togle_el').click(function (event) {
        event.preventDefault();
      if( $(this).parents('tbody').hasClass('table_togl_wr') ) {
          $(this).toggleClass('on');
          $(this).parents('.table_togl_wr').find('.mob_name_wrap').toggleClass('active');
          $(this).parents('.table_togl_wr').find('.togl_type_2').toggleClass('active');
      } else if( $(this).parents('tbody').hasClass('wrap_togl_type_2') ) {
          $(this).toggleClass('on');
          $(this).parents('.wrap_tr_togl').find('td:not(".togle_el")').toggleClass('active');
      }else {
          $(this).toggleClass('on');
          $(this).next().toggleClass('active');
      }
    });

    $('.wrap_tr_type_2').click(function (event) {
        event.preventDefault();
        $(this).find('.togle_el_type_2').toggleClass('on');
        $(this).next().toggleClass('active');

    });
});




/* --- ГЛОБАЛЬНАЯ ФУНКЦИЯ: Карта на странице ---------------------------------*/
function mapInitialize() {
  ymaps.ready(init);
  var myMap,
      myPlacemark;

  function init(){
    myMap = new ymaps.Map("map-wrap", {
      center: [59.8104,30.2996],
      zoom: 14,
      controls: ['fullscreenControl']
    });

    myPlacemark = new ymaps.Placemark([59.8104,30.2996], {
      hintContent: "АО «Авиакомпания «Россия»",
      balloonContentHeader: "АО «Авиакомпания «Россия»",
      balloonContentBody: "Санкт-Петербург, улица Пилотов, д. 18/4"
    },{// Опции
      iconLayout: "default#image",
      iconImageHref: "/local/img/icon_map.png",
      iconImageSize: [50, 50],
      iconImageOffset: [-25, -50] // Смещение левого верхнего угла иконки относительно точки привязки.
    });
    myMap.geoObjects.add(myPlacemark);
  };
};


/*----------- ФУНКЦИИ ПОСЛЕ ГОТОВНОСТИ ---------------------------------------*/

jQuery(document).ready(function( $ ) {
    var cities = [];
    if ($('.city-list').length > 0){
        $('.city-list li').each(function(i, val){
            var name = $(this).text();
            var iata = $(this).data("val");
            cities.push({'name':name, 'iata':iata});
        });
    }



  /* --- ФУНКЦИИ: Прокрутка страниц наверх --------------------------------*/
  $.fn.scrollToTop = function() {
    var scrollLink = $(this);
    scrollLink.hide();
    if ($(window).scrollTop() >= "150") scrollLink.fadeIn("slow");
    $(window).scroll(function() {
        if ($(window).scrollTop() <= "150") scrollLink.fadeOut("slow");
        else scrollLink.fadeIn("slow");
    });
    $(this).click(function() {
        $("html, body").animate({scrollTop: 0}, "slow");
    });
  };
//  Инициализация работы прокрутки страниц наверх
    $(".js-scroll-top").scrollToTop();

/*----------- ФУНКЦИИ: Работа табов ---------------------------------------*/
  $.fn.tabsInit = function(){
    var $tabsHead = $(this),
        $links = $tabsHead.find(".js-tabs-link"),
        $tabsBody = $tabsHead.siblings(".js-tabs-body"),
        $tabs = $tabsBody.find(".js-tabs-item");
   
    $links.click(function(e){
      var tabId = "#" + $(this).data("tab") || "nothing";
      var position = $(this).position();
    //   console.log(position.left);
    $tabsBody.removeAttr("style");
    $tabsBody.css("left", position.left-10);
    // $tabs.last().css("left", position.left-180);

      if ( $(this).hasClass("active") ){
        $(this).removeClass("active");
        $(tabId).removeClass("active");
      } else {
        $links.removeClass("active");
        $(this).addClass("active");
        $tabs.removeClass("active");
        $(tabId).addClass("active");
     
    
      };
    });
    return this;
  };
  $(".js-tabs-head").tabsInit();

/*----------- Слайдер на главной странице ---------------------------------*/
  if ($("#main-page-slider, .cont_clider").length > 0){
      $("#main-page-slider, .cont_clider").slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        autoplay: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        autoplaySpeed: 7000
      });

      $('#main-page-slider, .cont_clider').on('afterChange', function(event, slick, currentSlide, nextSlide){
          var a = 5000;
          if (currentSlide == 0){
              a = 7000;
          }
          $('#main-page-slider, .cont_clider').slick('slickSetOption', 'autoplaySpeed', a, true);

      });

  }
/*----------- Counter -----------------------------------------------------*/
  $('.passenger-detail .dropdown-info').click(function () {
    $(this).toggleClass('open');
    $('.passenger-detail .dropdown-items').slideToggle(50);
  })

  const lang = $('html').attr("lang");
  const passengerCountsName = {
    ru: {
      1: 'Пассажир',
      2: 'Пассажира',
      3: 'Пассажира',
      4: 'Пассажира',
      5: 'Пассажиров',
      6: 'Пассажиров'
    },
    en: {
      1: 'passenger',
      2: 'passengers',
      3: 'passengers',
      4: 'passengers',
      5: 'passengers',
      6: 'passengers'
    }
  }
  $('.passenger-detail .dropdown-items input').change(function () {
    let $total = 0;
    $.each($('.passenger-detail .dropdown-items input'), function (indexInArray, valueOfElement) {
      $total = $total + parseInt($(valueOfElement).val());
    });

    $('.passenger-detail .dropdown-info.counter span').text($total);

    $('.passenger-detail .dropdown-info.counter p').text(passengerCountsName[lang][$total]);
  })

  $(".js-counter .btn-dwn").click(function(){
    var $input = $(this).siblings(".counter-rez"),
        count = parseInt($input.val()) - 1;
    count = count < 0 ? 0 : count;
    if ($input.hasClass("adults-prs"))
        count = count < 1 ? 1 : count;
    $input.val(count).change();
      if ($input.hasClass("book-prs")){
          var babies = +$('.babies-prs').val();
          if ($input.attr("name") == 'adults' && count < babies){
              $('.babies-prs').val(count).change();
          }
      }
  });
  $(".js-counter .btn-upp").click(function(){
    var $input = $(this).siblings(".counter-rez");
    if ($input.hasClass("book-prs")){
        if ($input.attr("name") == 'babies'){
            var adults = +$('.adults-prs').val();
            var babies = +$input.val();
            if (adults <= babies) return false;
        }
        var cnt = 0;
        $.each($(".book-prs"), function(i, val){
           cnt += +$(this).val();
        });
        if (cnt > 5) return false;
    }
    $input.val(parseInt($input.val()) + 1).change();
  });

/*----------- Работа Accordion -------------------------------------------*/
  $(".js-accordion-btn").click(function(){

    var $accordionBtn = $(this),
        $accordionBody = $accordionBtn.closest(".js-accordion-item").children(".js-accordion-body");
        //baseHeight = 0
        //autoHeight = accordionBody.css('height', 'auto').outerHeight();

    if ( $accordionBtn.hasClass("active") ) {
      $accordionBtn.closest(".js-accordion-wrap").find(".js-accordion-btn").removeClass("active");
      $accordionBtn.closest(".js-accordion-wrap").find(".js-accordion-body").slideUp();
      $('.booking-accordion-headtabs_head li.active a').click();

    } else {
      $accordionBtn.closest(".js-accordion-wrap").find(".js-accordion-btn").removeClass("active");
      $accordionBtn.closest(".js-accordion-wrap").find(".js-accordion-body").slideUp();
      $accordionBody.slideDown().addClass("active");
      $accordionBtn.addClass("active");
    };
  });


/*----------- Работа Searcher --------------------------------------------*/
  $(document).on('click', ".searcher-carret", function(){
      var $that = $(this),
          $searcher = $that.closest(".searcher");
      if ($searcher.hasClass("not-active")){
          return false;
      }
      $(this).parent(".searcher").toggleClass("open");
  });
    $(document).on('click', ".time-show", function(){
        $(this).parent(".searcher").toggleClass("open");
    });
  $(document).on('mouseleave', ".searcher", function(){
    $(this).removeClass("open");
  });
  $(document).on('click', ".searcher-drop-list li", function(){
    var $that = $(this),
        $searcher = $that.closest(".searcher"),
        selDataVal = $that.data("val"),
        selDataTxt = $that.text();
    $searcher.children(".searcher-input").val( selDataTxt );
    $searcher.children(".searcher-data")
            .val(selDataVal)
            .trigger('change'); // Событие изменения в поле
    $searcher.removeClass("open");
    if ($searcher.hasClass("hotels-drop")){
        $("#dest_type").val($(this).data("type"));
        $("#dest_id").val($(this).data("val"));
    }
    if ($searcher.hasClass("transfer-drop")){
        var term = selDataVal;
        if ($searcher.hasClass("ec_tr_from")){
            var $destination = $('.destination-from ul');
            var $destinp = $('.destination-from .searcher-data');
            var $sinp = $('.destination-from .searcher-input');
            if ($('#same_location').is(":checked")){
                $(".cntr_inp_to").val(selDataTxt);
                $(".dest_to").find(".searcher-data").val(selDataVal).trigger('change');
            }
        }
        else {
            var $destination = $('.destination-to ul');
            var $destinp = $('.destination-to .searcher-data');
            var $sinp = $('.destination-to .searcher-input');
        }
        $.ajax({
            type: "get",
            url: '/local/tools/ajax/europecar.php',
            data: {code:selDataVal,lang:$('#lang_id').val()},
            dataType: "json",
            error: function(request,error) {
                //alert('Error! Please try again!');
            },
            success: function(data) {
                $destination.empty();
                $destinp.val("0").change();
                $sinp.val("");
                if ($searcher.hasClass("ec_tr_from")){
                    if ($('#same_location').is(":checked")){
                        $('.destination-to ul').empty();
                        $('.destination-to .searcher-data').val("0").change();
                        $('.destination-to .searcher-input').val("");
                    }
                }
                $.each(data, function(i, val){
                    $destination.append('<li data-val="'+val.code+'">'+val.name+'</li>');
                    if ($searcher.hasClass("ec_tr_from")){
                        if ($('#same_location').is(":checked")){
                            $('.destination-to ul').append('<li data-val="'+val.code+'">'+val.name+'</li>');
                        }
                    }
                });
            }
        });
    }
    if ($searcher.hasClass("destination-from")){
        if ($('#same_location').is(":checked")){
            $('.destination-to').find(".searcher-input").val( selDataTxt );
            $('.destination-to').find(".searcher-data")
                .val(selDataVal)
                .trigger('change'); // Событие изменения в поле
        }
    }
    if( selDataVal ) $searcher.removeClass("error");

  });


    $('.europcar_form').submit(function(){
        var date_start = $("#alt-car-start").val();
        var date_end = $("#alt-car-end").val();
        var dest_from = $("#dest_from_transfer").val();
        var dest_to = $("#dest_to_transfer").val();
        var time_from = $("#time_from").val();
        var time_to = $("#time_to").val();
        var country = $("#ecCountry").val();
        var locale = 'ru';
        var deep = '';
        if ($('#lang_id').length > 0){
            locale = 'en';
            deep = '[en]-';
        }
        var params = {
            locale: locale,
            CTRCT: '52133972',
            SKIN: '11010',
            DATECO: date_start+time_from,
            DATECI: date_end+time_to,
            STATIONCO: dest_from,
            STATIONCI: dest_to,
            IATA: '01504791',
            CNTRY: country,
            PROGLIST: '',
            TURBO3: 'rossiya',
            xtor: 'AD-2001-[rossiya_homepage_bookingpod]-[deeplink]-'+deep+'[rossiya-airlines.ru]-[]-[]'

        };

        redirectToURL('https://applications.europcar.com/resaweb/init', params);

        return false;

    });

    function redirectToURL(url, params) {
        var pairs = [];
        for (pr in params) {
            pairs.push(pr + '=' + params[pr]);
        }
        var url = url + '?' + pairs.join('&');
        window.open(url, '_blank');
    }

    if ($('.for-time').length > 0){
        $('.for-time').timepicker({ 'step': 15 });
    }


  $(document).on('keyup', ".searcher-race", function(){ //Поиск через поле ввода
    var $that = $(this),
        $data = $(this).siblings(".searcher-data"),
        $list = $that.closest(".searcher").find(".searcher-drop-list"),
        $searcher = $that.closest(".searcher");
    $data.val(null);
    $that.closest(".searcher").addClass("error");
    $searcher.removeClass("open");
    if( $that.val().length > 0 ) {
        var term = $that.val();
        $.ajax({
            type: "get",
            url: '/local/tools/ajax/airsearch.php',
            data: {q:term,lang:$('#lang_id').val()},
            dataType: "json",
            error: function(request,error) {
                alert('Error! Please try again!');
            },
            success: function(data) {
                $list.empty();
                $.each(data, function(i,val){
                   if (val.name && val.iata){
                       $list.append('<li value="'+val.iata+'" data-val="'+val.iata+'">'+val.name+'</li>');
                   }
                });
            }
        });
      $searcher.addClass("open");
    }
    else {
        $list.empty();
        $.each(cities, function(i,val){
            if (val.name && val.iata){
                $list.append('<li value="'+val.iata+'" data-val="'+val.iata+'">'+val.name+'</li>');
            }
        });
        $searcher.addClass("open");
    }
  });

if ($(".spaceSearch").length > 0){
    var spaceCities = [];
    if ($('.space-list').length > 0){
        $('.space-list li').each(function(i, val){
            var name = $(this).text();
            var iata = $(this).data("val");
            spaceCities.push({'name':name, 'iata':iata});
        });
    }


    $(document).on('keyup', ".spaceSearch", function(){ //РџРѕРёСЃРє С‡РµСЂРµР· РїРѕР»Рµ РІРІРѕРґР°
        var $that = $(this),
            $data = $(this).siblings(".searcher-data"),
            $list = $that.closest(".searcher").find(".searcher-drop-list"),
            $searcher = $that.closest(".searcher");
        $data.val(null);
        $that.closest(".searcher").addClass("error");
        $searcher.removeClass("open");
        if( $that.val().length > 0 ) {
            var term = $that.val();
            var lang = $('html').attr("lang");
            $.ajax({
                type: "get",
                url: '/local/tools/ajax/space.php',
                data: {q:term, action: "autocomplete", lang: lang},
                dataType: "json",
                error: function(request,error) {

                },
                success: function(data) {
                    $list.empty();
                    $.each(data, function(i,val){
                        if (val.name && val.iata){
                            $list.append('<li value="'+val.iata+'" data-val="'+val.iata+'">'+val.name+' <span>- '+val.iata+'</span></li>');
                        }
                    });
                }
            });
            $searcher.addClass("open");
        }
        else {
            $list.empty();
            $.each(spaceCities, function(i,val){
                if (val.name && val.iata){
                    $list.append('<li value="'+val.iata+'" data-val="'+val.iata+'">'+val.name+'</li>');
                }
            });
            $searcher.addClass("open");
        }
    });

    $(".spaceSearch")
        .focus(function () { $(this).select(); } )
        .mouseup(function (e) {e.preventDefault(); });

    $("body").on("change", "#spaceFrom, #spaceTo", function(){
        if (!!$("#spaceFrom").val() && !!$("#spaceTo").val() && $("#spaceFrom").val() > "0" && $("#spaceTo").val() > "0"){
            $(".spaceResult").empty();
            $(".noWays").remove();
            var from = $("#spaceFrom").val();
            var to = $("#spaceTo").val();
            var lang = $('html').attr("lang");
            $.ajax({
                type: "get",
                url: '/local/tools/ajax/space.php',
                data: {from:from, to: to, action: "getSpace", lang: lang},
                dataType: "json",
                error: function(request,error) {
                },
                success: function(data) {
                    yaCounter39012065.reachGoal('advanced-seat-reservation');
                    if (data.length > 0){
                        var portText = (lang == "en") ? "When buying in the departure port" : "Покупка в пункте вылета";
                        var onlineText = (lang == "en") ? "When buying online" : "Покупка онлайн";
                        $(".spaceTable").show();
                        $.each(data, function(i, val){
                            var line = "";
                            line += '<div class="b-table__line">';
                            line += '<div class="b-table__way">';
                            line += '<div class="b-table__way-item">';
                            line += '<div class="b-table__way-title">'+val.from.code+'</div>';
                            line += '<div class="b-table__city">'+val.from.name+'</div>';
                            line += '</div>';
                            line += '<div class="b-table__way-item">';
                            line += '<div class="b-table__way-title">'+val.to.code+'</div>';
                            line += '<div class="b-table__city">'+val.to.name+'</div>';
                            line += '</div>';
                            line += '</div>';
                            line += '<div class="b-table__col" data-cat-title="'+portText+'">';
                            line += '<div class="b-table__text">'+val.isBuy+'</div>';
                            line += '</div>';
                            line += '<div class="b-table__col" data-cat-title="'+onlineText+'">';
                            line += '<div class="b-table__text">'+val.isOnline+'</div>';
                            line += '</div>';
                            line += '</div>';
                            $(".spaceResult").append(line);
                        });
                    } else {
                        $(".spaceTable").hide();
                        var notAvaible = (lang == "en") ? "<h3 class='noWays'>Ancillary services are not available for chosen route</h3>" : "<h3 class='noWays'>На выбранном направлении дополнительные услуги не предусмотрены</h3>";
                        $(".spaceTable").before(notAvaible);
                    }
                }
            });
        }
    });
}

    $(document).on('keyup', ".searcher-hotel", function(){ //Поиск через поле ввода
        var $that = $(this),
            $data = $(this).siblings(".searcher-data"),
            $list = $that.closest(".searcher").find(".searcher-drop-list"),
            $searcher = $that.closest(".searcher");
        $data.val(null);
        /*$that.closest(".searcher").addClass("error");
        $searcher.removeClass("open");
        if( $that.val().length > 2 ) {
            var term = $that.val();
            $.ajax({
                type: "get",
                url: '/local/tools/ajax/hotelsearch.php',
                data: {q:term},
                dataType: "json",
                error: function(request,error) {
                    //alert('Error! Please try again!');
                },
                success: function(data) {
                    $list.empty();
                    $.each(data.city, function(i,val){
                        if(val){
                            if (val.label && val.dest_id && val.dest_type){
                                $list.append('<li value="'+val.iata+'" data-type="'+val.dest_type+'" data-val="'+val.dest_id+'">'+val.label+'</li>');

                            }
                        }
                    });
                }
            });
            $searcher.addClass("open");
        };*/
    });


    /*----------- Календарь в инпутах дат хидера -----------------------------*/
  $("#flight-start").datepicker({
      numberOfMonths: 1,
      dateFormat: "dd M yy",
      altFormat: "yymmdd",
      altField: "#alt-flight-start",
      regional: "ru",
      firstDay: 1,
      minDate: 0,
      maxDate: +330,
      onSelect: function(selectedDate) {
         var minDate = $.datepicker.parseDate("dd M yy", selectedDate);
         minDate.setDate(minDate.getDate());// мин. для 2 поля
         $("#flight-end").datepicker("option", "minDate", minDate);// мин. для 2 поля
         $("#alt-flight-start").change();
      }
  });
  $("#flight-end").datepicker({
      numberOfMonths: 1,
      dateFormat: "dd M yy",
      altFormat: "yymmdd",
      altField: "#alt-flight-end",
      regional: "ru",
      firstDay: 1,
      minDate: 0,
      maxDate: +330,
      onSelect: function(selectedDate) {
         var maxDate = $.datepicker.parseDate("dd M yy", selectedDate);
         maxDate.setDate(maxDate.getDate());// макс. для 1 поля
         $("#flight-start").datepicker("option", "maxDate", maxDate);// макс. для 1 поля
          $("#alt-flight-end").change();
      }
  });

    $("#hotels-start").datepicker({
        numberOfMonths: 1,
        dateFormat: "dd M yy",
        regional: "ru",
        firstDay: 1,
        minDate: 0,
        maxDate: +330,
        onSelect: function(selectedDate) {
            var minDate = $.datepicker.parseDate("dd M yy", selectedDate);
            day = minDate.getDate();
            year = minDate.getFullYear();
            month = minDate.getMonth()+1;
            $("#checkin_monthday").val(day);
            $("#checkin_year_month").val(year+'-'+month);
            minDate.setDate(minDate.getDate());// мин. для 2 поля
            $("#hotels-end").datepicker("option", "minDate", minDate);// мин. для 2 поля
        }
    });

    $("#hotels-end").datepicker({
        numberOfMonths: 1,
        dateFormat: "dd M yy",
        regional: "ru",
        firstDay: 1,
        minDate: +1,
        maxDate: +330,
        onSelect: function(selectedDate) {
            var maxDate = $.datepicker.parseDate("dd M yy", selectedDate);
            day = maxDate.getDate();
            year = maxDate.getFullYear();
            month = maxDate.getMonth()+1;
            $("#checkout_monthday").val(day);
            $("#checkout_year_month").val(year+'-'+month);
            maxDate.setDate(maxDate.getDate() - 1);// макс. для 1 поля

            $("#hotels-start").datepicker("option", "maxDate", maxDate);// макс. для 1 поля
        }
    });

    $("#car-start").datepicker({
        numberOfMonths: 1,
        dateFormat: "dd M yy",
        altFormat: "yymmdd",
        altField: "#alt-car-start",
        regional: "ru",
        firstDay: 1,
        minDate: 0,
        maxDate: +330,
        onSelect: function(selectedDate) {
            var minDate = $.datepicker.parseDate("dd M yy", selectedDate);
            minDate.setDate(minDate.getDate());// мин. для 2 поля
            $("#car-end").datepicker("option", "minDate", minDate);// мин. для 2 поля
            $("#car-start").change();
        }
    });


    $("#_nonempty__date_DATE").datepicker({
        numberOfMonths: 1,
        dateFormat: "dd.mm.yy",
        regional: "ru",
        firstDay: 1,
        minDate: 0,
        maxDate: +330,
        onSelect: function(selectedDate) {
            var minDate = $.datepicker.parseDate("dd.mm.yy", selectedDate);
            minDate.setDate(minDate.getDate());// мин. для 2 поля
            $("#_nonempty__date_DATE_").datepicker("option", "minDate", minDate);// мин. для 2 поля
        }
    });

    $("#_nonempty__date_DATE_").datepicker({
        numberOfMonths: 1,
        dateFormat: "dd.mm.yy",
        regional: "ru",
        firstDay: 1,
        minDate: 0,
        maxDate: +330,
        onSelect: function(selectedDate) {
            var maxDate = $.datepicker.parseDate("dd.mm.yy", selectedDate);
            maxDate.setDate(maxDate.getDate() - 1);// макс. для 1 поля
            $("#_nonempty__date_DATE").datepicker("option", "maxDate", maxDate);// макс. для 1 поля
        }
    });

    $("#car-end").datepicker({
        numberOfMonths: 1,
        dateFormat: "dd M yy",
        altFormat: "yymmdd",
        altField: "#alt-car-end",
        regional: "ru",
        firstDay: 1,
        minDate: 0,
        maxDate: +330,
        onSelect: function(selectedDate) {
            var maxDate = $.datepicker.parseDate("dd M yy", selectedDate);
            maxDate.setDate(maxDate.getDate() - 1);// макс. для 1 поля
            $("#car-start").datepicker("option", "maxDate", maxDate);// макс. для 1 поля
            $("#car-end").change();
        }
    });

    $("#dest_from_transfer, #dest_to_transfer, #alt-car-start, #alt-car-end, #time_from, #time_to").change(function(){
        if (checkCarFields())
            $('.on-car-sbmt').attr('disabled', false);
        else
            $('.on-car-sbmt').attr('disabled', true);
    });


  $(document).on('click', '#data-race-form', function () {
    $(this).datepicker(datePickerRaceOptions).focus();
  });

    function checkCarFields(){
        var car_from = $("#dest_from_transfer").val(),
            car_to = $("#dest_to_transfer").val(),
            car_date_start = $("#alt-car-start").val(),
            car_date_end = $("#alt-car-end").val(),
            car_time_start = $("#time_from").val(),
            car_time_end = $("#time_to").val();
        //console.log(!!"0");
        if (car_from && car_from != "0" && car_to && car_to != "0" &&
            car_date_start && car_date_end && car_time_start &&
            car_time_end && car_time_start != "0" && car_time_end != "0")
            return true;
        return false;
    }

    jQuery.expr[':'].Contains = function(a,i,m){
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())==0;
    };

    $('#same_location').change(function(){
       if ($(this).is(":checked")){
           $(".cntr_inp_to, .place_inp_to").attr("readonly", true);
           $(".dest-to, .destination-to").addClass("not-active");
           $(".cntr_inp_to").val($(".cntr_inp_from").val()).change();
           $('.destination-to ul').empty();
           $('.destination-to .searcher-data').val("0").change();
           $('.destination-to .searcher-input').val("");
           $('.place_list_from li').each(function(val){
               $('.destination-to ul').append('<li data-val="'+$(this).data("val")+'">'+$(this).text()+'</li>');
           });
           $(".place_inp_to").val($(".place_inp_from").val()).change();
           $("#dest_to_transfer").val($("#dest_from_transfer").val()).change();
       }
        else {
           $(".cntr_inp_to, .place_inp_to").attr("readonly", false);
           $(".dest-to, .destination-to").removeClass("not-active");

       }
    });

    $(".for_period").change(function(){
       var val = $('.for_period:checked').val();
       $(".tr-period").removeClass("show");
       if (val == 2) $(".period-period").addClass("show");
       else $(".month-period").addClass("show");

    });

    function filterList(input, list, searcher) {
        //$searcher = $(input).closest(".searcher");
        //console.log($(input).attr("readonly"));

        $(input)
            .change( function () {
                if ($(input).attr("readonly"))
                    return false;
                var filter = $(this).val();
                if(filter) {

                    $matches = $(list).find('li:Contains(' + filter + ')');
                    $('li', list).not($matches).hide();
                    $matches.show();

                } else {
                    $(list).find("li").show();
                }
                searcher.addClass("open");
                return false;
            })
            .keyup( function () {
                $(this).change();
            });
    }

    filterList('.cntr_inp_to', '.cntr_list_to', $('.cntr_inp_to').closest(".searcher"));
    filterList('.cntr_inp_from', '.cntr_list_from', $('.cntr_inp_from').closest(".searcher"));
    filterList('.place_inp_from', '.place_list_from', $('.place_inp_from').closest(".searcher"));
    filterList('.place_inp_to', '.place_list_to', $('.place_inp_to').closest(".searcher"));



    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };

//    $("input[name=departure], input[name=arrival], #alt-flight-start, #alt-flight-end").change(function(){
//        if (checkOnlineFields())
//            $('.on-afl-sbmt').attr('disabled', false);
//        else
//            $('.on-afl-sbmt').attr('disabled', true);
//    });

    $('#race-online').submit(function(e){
        var departureItem = $(this).find("input[name=departure]"),
            arrivalItem = $(this).find("input[name=arrival]"),
            startItem = $(this).find("#alt-flight-start"),
            endItem = $(this).find("#alt-flight-end"),
            departure = departureItem.val(),
            arrival = arrivalItem.val(),
            route = $(this).find("input[name=radio-route]:checked").val(),
            adults = $(this).find("input[name=adults]").val(),
            kids = $(this).find("input[name=kids]").val(),
            babies = $(this).find("input[name=babies]").val(),
            start = startItem.val(),
            end = endItem.val(),
            part = '',
            url = $(this).attr("action");
            errorShow = false;


        const arrError = [departureItem, arrivalItem, startItem, endItem];

        (function () {
            arrError.forEach(function (e) {
                if (!e.val() || e.val() === '0') {
                    e.siblings('.nxr_race_error').addClass('active');
                }
            })
            if (route === 'OW' ) {
                endItem.siblings('.nxr_race_error').removeClass('active');
            }
            if ((!departure || departure === '0' ) || (!arrival || arrival === '0') || !start || (!end && route !== 'OW')) {
                return errorShow = true;
            }
        }
        )()

        /*var newurl = url.split('?');
        if (newurl.length > 1){
            url = newurl[0];
            part = '?'+newurl[1];
        }*/

        if (errorShow) {
            return false
        } else {
			part = "?utm_source=akr&utm_medium=referral&utm_content=search_form";
			part += "&cabin=economy";
			//var tracker = window[window.GoogleAnalyticsObject].getByName('Aeroflot_ru_sendDestination');
			//var tracker = window[window.GoogleAnalyticsObject].getAll()[0];
			//var linkerParam = '&'+tracker.get('linkerParam');
			
			if (route == 'OW') {
				part += "&routes=" + departure + "." + start + "." + arrival;
			} else {
				part += "&routes=" + departure + "." + start + "." + arrival + "-" + arrival + "." + end + "." + departure;
			}
			if (adults) {
				part += "&adults=" + adults;
			}
			if (kids) {
				part += "&children=" + kids;
			}
			if (babies) {
				part += "&infants=" + babies;
			}
			//url = url.slice(0, -1);
			part += "&autosearch=Y";
			//part += linkerParam;
			
			$(".link-to-afl").val(url);
			//showPopup('pop-online-confirm');
			//yaCounter39012065.reachGoal('confirm_booking_rules'); console.log('rafl');
			url += part;
			console.log(url);
			console.log(part);
			//handleOutboundLinkClicks(part);
			window.open(url, '_blank');
			return false;
        }
    });
    
    function handleOutboundLinkClicks(urlParams) {
        ga('Aeroflot_ru_sendDestination.send', 'event', {
            eventCategory: 'akr',
            eventAction: 'click_button-search-ticket',
            eventLabel: urlParams,
            transport: 'beacon'
        });
        console.log(ga);
        console.log("ga must be sent");
    }

    $("#rafl").change(function(){
        var url = $(".link-to-afl").val();
        if ($("#rafl").is(':checked') && url){
            yaCounter39012065.reachGoal('confirm_booking_rules'); console.log('rafl');
            window.open(url, '_blank');
            $('#pop-online-confirm input[type="checkbox"]').attr("checked", false);
            $('#pop-online-confirm .popup-close').trigger('click');
        }
    });

    // Удаление ошибки при изменении поля
    $('#race-online input[name=departure]').change(function (e) {
        $(this).siblings('.nxr_race_error').removeClass('active');
    });
    $('#race-online input[name=arrival]').change(function (e) {
        $(this).siblings('.nxr_race_error').removeClass('active');
    });
    $('#race-online #alt-flight-start').change(function (e) {
        $(this).siblings('.nxr_race_error').removeClass('active');
    });
    $('#race-online #alt-flight-end').change(function (e) {
        $(this).siblings('.nxr_race_error').removeClass('active');
    });

    // Удаление ошибки при клике на любой поле
    $('#race-online input').click(function (e) {
        $(this).siblings('.nxr_race_error').removeClass('active');
    });

    // Удаление ошибки при клике на ошибку
    $('#race-online .nxr_race_error').click(function () {
        $(this).removeClass('active');
    })

    /*----------- Отскрытие билета в списке ----------------------------------*/
    $(".js-flight-toggle").click(function(){
        var $flightBtn = $(this),
            $flightBody = $flightBtn.parent(".flight-list-item");
        $flightBody.toggleClass("active");
    });


    /*----------- Отскрытие рейса в списке табло -----------------------------*/
    $('body').on('click', ".js-schedule-toggle", function(){
        var $flightBtn = $(this),
            $flightBody = $flightBtn.parent(".schedule-list-item");
        $flightBody.toggleClass("active");
    });


    /*----------- Открытие поля поиска в шапке -------------------------------*/
    $(".js-search-init").click(function(){
        var $searchBtn = $(this),
            $searchBody = $searchBtn.siblings(".search-wrap");
        $searchBody.addClass("active");

        $(document).mouseup(function(e){
            var $target = $searchBody;
            if(e.target !== $target[0] && !$target.has(e.target).length){
                $target.removeClass("active");
            };
        });
    });

    /*--- Всплывающее окно ---------------------------------------------------*/
    $(".js-booking-show").click(function(){
        var $showBtn = $(this),
            $booking = $showBtn.parent(".all-pages-booking, .js-booking-body");
        $booking.toggleClass("active");
    });

    /*--- Мобильное меню -----------------------------------------------------*/
    $(".js-mobmenu-toggle").click(function(){
      var $menuShowBtn = $(this),
          $menu = $(".header-midl-nav");
      $menu.toggleClass("active");
      $menu.find(".js-tabs-item, .js-tabs-link").removeClass("active");
    });

    function checkOnlineFields(){
        var departure = $("#race-online input[name=departure]").val(),
            arrival = $("#race-online input[name=arrival]").val(),
            route = $("#race-online input[name=radio-route]:checked").val(),
            start = $("#race-online #alt-flight-start").val(),
            end = $("#race-online #alt-flight-end").val();
        if (!departure || !arrival || !route || !start)
            return false;
        if (route == 'RT' && !end)
            return false;
        return true;
    }


/*--- ФУНКЦИИ: Работа плейсхолдеров в инпутах -----------------------------
  $.fn.inputField = function(){
    $(this).each(function(){
      if($(this).val().trim() !== ''){
        $(this).parent().addClass("input-has-txt");
      };
    });
    $(this).focusin(function(){
      $(this).parent().addClass("input-has-txt");
    });
    $(this).focusout(function(){
      var that = $(this);
      setTimeout(function(){
        if(that.val().trim() === ''){
          that.parent().removeClass("input-has-txt");
        };
      }, 100);
    });
    return this;
  };
//  Инициализация работы плейсхолдеров в инпутах
    $(".input-field").inputField();
*/

/* --- Валидация форм -----------------------------------------------------
  $(".js-validate").each(function(){
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
          mail: "",
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

/* --- Анимация -----------------------------------------------------------
  if ($(window).width() > 800) {
    $(".sec-parks-item").addClass("hidden").viewportChecker({
        classToRemove: 'hidden',
        classToAdd: 'visible animated fadeIn',
        offset: 300
    });
  };
*/

/*---  Ширина скролла -----------------------------------------------------
  var scrollWidth = 0;
  getScroll = function(){
    var div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  };
  getScroll();
*/

/*---  Плавная прокрутка --------------------------------------------------
  $(".js-scroll-to").click(function(e){
    var $link = $(this),
        $target = $( $link.attr('href') ),
        targetTop;

    if ( $target.length ){
        e.preventDefault(); //отменим перход по якорю
        targetTop = $target.offset().top; //сколько прокрутить
        $("html, body").animate({scrollTop: $target.offset().top }, "slow"); //крутим враппер
    };
    return false; // и ничего не вернем
  });
*/

/*---  Защита от копирования ----------------------------------------------
.noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events:none;
}
  $(document).bind("contextmenu",function(e){
    return false;
  });

  function preventSelection(element){
    var preventSelection = false;
    function addHandler(element, event, handler){
      if (element.attachEvent)
      element.attachEvent('on' + event, handler);
      else
      if (element.addEventListener)
      element.addEventListener(event, handler, false);
    }
    function removeSelection(){
      if (window.getSelection) { window.getSelection().removeAllRanges(); }
      else if (document.selection && document.selection.clear)
      document.selection.clear();
    }
    function killCtrlA(event){
      var event = event || window.event;
      var sender = event.target || event.srcElement;
      if (sender.tagName.match(/INPUT|TEXTAREA/i))
      return;
      var key = event.keyCode || event.which;
      if (event.ctrlKey && key == 'A'.charCodeAt(0)) // 'A'.charCodeAt(0) ????? ???????? ?? 65
      {
        removeSelection();
        if (event.preventDefault)
        event.preventDefault();
        else
        event.returnValue = false;
      }
    }
    addHandler(element, 'mousemove', function(){
      if(preventSelection)
      removeSelection();
    });
    addHandler(element, 'mousedown', function(event){
      var event = event || window.event;
      var sender = event.target || event.srcElement;
      preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
    });
    //  dblclick
    addHandler(element, 'mouseup', function(){
      if (preventSelection)
      removeSelection();
      preventSelection = false;
    });
    //  ctrl+A
    addHandler(element, 'keydown', killCtrlA);
    addHandler(element, 'keyup', killCtrlA);
  };

  preventSelection(document.body);
*/


/*--- Всплывающее окно ---------------------------------------------------
  $(".js-show-popup").click(function(){
    var popId = "#" + $(this).data("pop"),
        scrollCorr = 0;

    $(popId).fadeIn(300);
    $("body").addClass("cutted");
    $(document).outerHeight() > $(window).height() ? scrollCorr = scrollWidth : scrollCorr = 0;
    $("body, footer").css("padding-right", scrollCorr);
  });

  $(".popup-close").click(function(){
    $(".popup").fadeOut(300, function(){
      $("body").removeClass("cutted");
      $("body, footer").css("padding-right", 0);
    });
  });
*/

/*----------- Создание поп-апа для просмотра одной картнки ----------------
  $(document).on('click', ".big-img-link", function(){
    var dataLink = $(this).data("link");
    if ( !dataLink.length ){
      return false;
    };
    if ( !$("body").children(".modal").length ){
      $("body").append('<div class="modal"></div>');
    };
    $("#temporary-pop").remove();
    $("body").append(
      '<div class="pop-main" id="temporary-pop">' +
        '<a class="pop-main-close"></a>' +
        '<div class="pop-main-body">' +
          '<div class="clmn-half wide">' +
            '<div class="pop-main-image">' +
              '<img src="' + dataLink + '" alt="__">' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
    $(".modal, #temporary-pop").fadeIn(300);
  });
  */

/*----------- Слайдер  ---------------------------------------------------
  $("#reviews-slider").slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 10000
  });
 */

  /*----------- Перетаскивание -------------------------------------------
  if ( $("#canvas-one").length ) {
    var canvasOne = new Dragdealer('canvas-one', {
      x: 1,
      y: 0,
      vertical: true,
      speed: 0.2,
      loose: true,
      requestAnimationFrame: true
    });
  };
*/

/*----------- Параллакс --------------------------------------------------
  if ( $("#main-parallax").length ){
    $("#main-parallax").parallax({
      limitY: 0
    });
  };
*/

/*------------- Видео ----------------------------------------------------
  function videoAutoStart(){
    var video = $(".js-auto-start")[0];
    if( $(".js-auto-start").length ) {
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        video.load();
        video.play();
      };
    };
  };
  videoAutoStart();
*/

/*----------- Загрузка контента -------------------------------------------
    $(".js-flatview-more").click(function(){
      alert("Заготовка под загрузку еще квартир");
    });
    $(".js-flatview-analog").click(function(){
      alert("Заготовка под загрузку аналогичных квартир");
    });
    $(".js-news-more").click(function(){
      alert("Заготовка под загрузку больше новостей");
    });
*/

/*----------- РЕСАЙЗ ---------------------------------------------------------*/
  $(window).resize(function(){


  });

    $('.subscribe_news').submit(function(){
        var action = $(this).attr("action");
        var email = $(this).find("input[name=email]").val();
        var pop = $(this).data("pop");
        $.ajax({
            type: "post",
            url: action,
            data: {email:email},
            dataType: "html",
            error: function(request,error) {
                alert('Error! Please try again!');
            },
            success: function(data) {
                $('#'.pop).find('h3').text(data);
               showPopup(pop);
            }
        });
        return false;
    });

    //---  Ширина скролла -----------------------------------------------------

     var scrollWidth = 0;
     getScroll = function(){
     var div = document.createElement('div');

     div.style.overflowY = 'scroll';
     div.style.width = '50px';
     div.style.height = '50px';
     div.style.visibility = 'hidden';

     document.body.appendChild(div);
     scrollWidth = div.offsetWidth - div.clientWidth;
     document.body.removeChild(div);
     };
     getScroll();


    function showPopup(pop){
        var popId = "#" + pop,
            scrollCorr = 0;

        $(popId).fadeIn(300);
        $("body").addClass("cutted");
        $(document).outerHeight() > $(window).height() ? scrollCorr = scrollWidth : scrollCorr = 0;
        $("body, footer").css("padding-right", scrollCorr);
    }

    $(".js-show-popup").click(function(){
        var popId = "#" + $(this).data("pop"),
            scrollCorr = 0;
        if (popId == '#pop-registration'){
            var href = $(this).attr("href");
            $('#pop-registration form').attr("action", href);
        }
        $(popId).fadeIn(300);
        $("body").addClass("cutted");
        $(document).outerHeight() > $(window).height() ? scrollCorr = scrollWidth : scrollCorr = 0;
        $("body, footer").css("padding-right", scrollCorr);
        return false;
    });

    $(".popup-close").click(function(){
        $(".popup").fadeOut(300, function(){
            $("body").removeClass("cutted");
            $("body, footer").css("padding-right", 0);
        });
    });

    $('#race-online input[name="radio-route"]').change(function(e){
       var val = $(this).val();
        if (val == 'OW'){
            $('#race-online #flight-end').attr('disabled', true);
        }
        else {
            $('#race-online #flight-end').attr('disabled', false);
        }
        $('#race-online #alt-flight-start').siblings('.nxr_race_error').removeClass('active');
        $('#race-online #alt-flight-end').siblings('.nxr_race_error').removeClass('active');
        // if (checkOnlineFields())
        //     $('.on-afl-sbmt').attr('disabled', false);
        // else
        //     $('.on-afl-sbmt').attr('disabled', true);
    });

	// Реализация задачи https://prodvigaeff.bitrix24.ru/company/personal/user/1261/tasks/task/view/9675/
    $('#pop-registration form').submit(function(){
        var ticket = parseInt($('#pop-registration .onestep-send-inp').val());
        var lng = $(this).find('.lng-snt').val();
        var url = $(this).attr("action");
        var newurl = url.split('?');
        var part = '';
        if (newurl.length > 1){
            var part = '?'+newurl[1];
        }
        console.log('part:', part);

        if(ticket>=2451&&ticket<=2479){
            yaCounter39012065.reachGoal('online_reg_akr');
            if (lng == 'en')
                window.open('https://booking.flyaurora.ru/web-check-in/', '_blank');
            else
                window.open('https://booking.flyaurora.ru/web-check-in/', '_blank');
            $('#pop-registration .popup-close').trigger('click');
        } else if(ticket>=6001&&ticket<=6999){
            yaCounter39012065.reachGoal('online_reg_su');
            if (lng == 'en')
                //window.open('https://www.aeroflot.ru/ru-en/information/airport/checkin/web_checkin'+part, '_blank');
				window.open('https://www.aeroflot.ru/ru-en/information/airport/checkin/web_checkin?utm_source=akr&utm_medium=checkin', '_blank');
            else
                //window.open('https://www.aeroflot.ru/ru-ru/information/airport/checkin/web_checkin'+part, '_blank');
				window.open('https://www.aeroflot.ru/ru-ru/information/airport/checkin/web_checkin?utm_source=akr&utm_medium=checkin', '_blank');
            $('#pop-registration .popup-close').trigger('click');
        } else if(ticket>=5501&&ticket<=5999){
            yaCounter39012065.reachGoal('online_reg_akr');
            if (lng == 'en')
                //window.open('https://wci.rossiya-airlines.ru/?lang=en', '_blank');
				window.open('https://www.aeroflot.ru/ru-en/information/airport/checkin/web_checkin?utm_source=akr&utm_medium=checkin', '_blank');
            else
                //window.open('https://wci.rossiya-airlines.ru/?lang=ru', '_blank');
                window.open('https://www.aeroflot.ru/ru-ru/information/airport/checkin/web_checkin?utm_source=akr&utm_medium=checkin', '_blank');
            $('#pop-registration .popup-close').trigger('click');
        } else {
            if (lng == 'en')
                alert('Wrong flight number');
            else
                alert('Неверный номер рейса');
        }

        return false;
    });

	/*
    $('#pop-registration form').submit(function(){
        var ticket = parseInt($('#pop-registration .onestep-send-inp').val());
        var lng = $(this).find('.lng-snt').val();
        var url = $(this).attr("action");
        var newurl = url.split('?');
        var part = '';
        if (newurl.length > 1){
            var part = '?'+newurl[1];
        }
        console.log('part:', part);
        if(ticket>=5501&&ticket<=5999 || ticket >= 4100 && ticket <= 4999){
            yaCounter39012065.reachGoal('online_reg_akr');
            if (lng == 'en')
                window.open('https://wci.rossiya-airlines.ru/?lang=en', '_blank');
            else
                window.open('https://wci.rossiya-airlines.ru/?lang=ru', '_blank');
            $('#pop-registration .popup-close').trigger('click');
        } else if(ticket>=6000&&ticket<=6999){
            yaCounter39012065.reachGoal('online_reg_su');
            if (lng == 'en')
                window.open('http://www.aeroflot.ru/ru-en/information/checkin/web_checkin'+part, '_blank');
            else
                window.open('http://www.aeroflot.ru/ru-ru/information/checkin/web_checkin'+part, '_blank');
            $('#pop-registration .popup-close').trigger('click');
        } else {
            if (lng == 'en')
                alert('Wrong flight number');
            else
                alert('Неверный номер рейса');
        }

        return false;
    });
	*/

});


/*----------- ФУНКЦИИ ПОСЛЕ ЗАГРУЗКИ -----------------------------------------*/

$(window).load(function(){



  setTimeout(function(){
    $(".preloader").addClass("off");
  }, 1000);

    /*--- Подключим maps api ----*/
    if ($("#map-wrap").length > 0){
        $.getScript(
            "https://api-maps.yandex.ru/2.1/?lang=ru_RU",
            function(){
                mapInitialize();
            }
        );
    };

    $('body').on('click', '.baggage', function(){
        $(this).toggleClass('txt-blue');
        $(this).closest('.accord').next('div').slideToggle(300);
    });

    $('.baggage-page').on('click', 'a[href="#tarif"]', function(e){
        var d = $('#tarif').closest('.tarif-div');
        if (!isVisible(d)){
            d.prev('.accord').find('.baggage').toggleClass('txt-blue');
            d.slideToggle(0);
            $('html, body').animate({
                scrollTop: $('#tarif').offset().top
            }, 300);

        }
        else {
            $('html, body').animate({
                scrollTop: $('#tarif').offset().top
            }, 300);
        }
        e.preventDefault();
    });

    $('body').on('click', '.ch-goto', function(e){
        var l = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(l).offset().top
        }, 500);
        e.preventDefault();
    });



    if ($('.baggage').length > 0){
        function hashChangeAKR(){
            var hash = window.location.hash;
            if(hash) {

                if ($(hash).length > 0){
                    var d = $(hash).closest('div'), a = d.prev('.accord');
                    a.find('.baggage').addClass('txt-blue');
                    d.slideDown(0);
                    var r = a.closest('div');
                    if (r.length > 0){
                        r.prev('.accord').find('.baggage').addClass('txt-blue');
                        r.slideDown(0);
                    }
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top - 60
                    }, 500);
                }
            }
        }
        $(window).on( 'hashchange', function( e ) {
            hashChangeAKR();
        });

        $('body').on('click', '.user-content a[href^="#"]', function(e){
            hashChangeAKR();
        });

        hashChangeAKR();
    }

    function isVisible(el) {
        var element = el;
        if (element.length > 0 && element.css('visibility') !== 'hidden' && element.css('display') !== 'none') {
            return true;
        } else {
            return false;
        }
    }

    //var tracker = window[window.GoogleAnalyticsObject].getAll()[0]; // обращение к первому трекеру на странице
    //var linkerParam = tracker.get('linkerParam'); // запрос на получение параметра связывания
    //console.log(linkerParam);



});

/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
(function( factory ) {
  if ( typeof define === "function" && define.amd ) {
      // AMD. Register as an anonymous module.
      define([ "../datepicker" ], factory );
  } else {
      // Browser globals
      factory( jQuery.datepicker );
  }
}(function( datepicker ) {
  datepicker.regional['ru'] = {
      closeText: 'Закрыть',
      prevText: '<Пред',
      nextText: 'След>',
      currentText: 'Сегодня',
      monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
      'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
      'Июл','Авг','Сен','Окт','Ноя','Дек'],
      dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
      dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
      dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
      weekHeader: 'Нед',
      dateFormat: 'dd.mm.yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''};
  var clng = $('html').attr("lang");
  if (clng == 'ru'){
  datepicker.setDefaults(datepicker.regional['ru']);
  return datepicker.regional['ru'];
  }
}));





$(function () {
	$(".booking-accordion .searcher-data").on("change", function () {
	    console.log("HERE");
		if ($(".bg-flyup .searcher-data").val() != 0 && $(".bg-flyup .searcher-data").length > 0 && $(".bg-flydown .searcher-data").val() != 0  && $(".bg-flydown .searcher-data").length > 0) {
			$(".warning_booking").show();
		} else {
			$(".warning_booking").hide();
		}
	});

	if ($(window).width() < 600) {

		$( ".menu_togl" )
			.mouseenter(function() {
				$(this).parents('.submenu-item').find('.submenu-item-list').show('show', function () {
				});
			})
			.mouseleave(function() {
				$(this).parents('.submenu-item').find('.submenu-item-list').hide('show', function () {
				});
			});
	
			/*
			if ($(window).width() > 576) {

				$( ".submenu-item-title" )
					.mouseenter(function() {
						$(this).parents('.submenu-item').find('.submenu-item-list').show('show', function () {
						});
					})
					.mouseleave(function() {
						$(this).parents('.submenu-item').find('.submenu-item-list').hide('show', function () {
						});
					});

			}
			*/
	}

});