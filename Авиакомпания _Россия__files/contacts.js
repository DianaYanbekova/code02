$(document).ready(function(e){

    if ( $('.mask_phone').length > 0 ) {

        $('.mask_phone').mask('+7 (999) 999-99-99');

        var oldV = [];
        var useMask = true;
        $('.mask_phone').on('keyup', function(e) {
            if (useMask){
                if (e.key === "Backspace") {
                    oldV.pop();
                    if (oldV.length == 0) {
                        $(this).unmask().val("");
                        useMask = false;
                    }
                    console.log('ok go', oldV)
                } else {
                    oldV.push(e.target.value);
                }
            }

        });

    }

    var formMessages = {
      ru: {
          name: 'Введите ФИО',
          phone: 'Введите телефон',
          email: 'Введите E-mail',
          wrongEmail: 'Неправильный формат',
          theme: 'Введите тему',
          agree: 'Подтвердите согласие',
          message: 'Введите сообщение',
          company: 'Введите название компании',
          post: 'Введите должность',
          request: 'Заполните поле',
          response: 'Заполните поле',
          place: 'Заполните поле'
      },
      en: {
          name: 'Введите ФИО',
          phone: 'Phone number',
          email: 'Введите E-mail',
          wrongEmail: 'Неправильный формат',
          theme: 'Введите тему',
          agree: 'Подтвердите согласие',
          message: 'Введите сообщение',
          company: 'Введите название компании',
          post: 'Введите должность',
          request: 'Заполните поле',
          response: 'Заполните поле',
          place: 'Заполните поле'
      }
    };

    var currentLangMess = formMessages[$('html').attr('lang')];


    if ( $('.pressForm').length > 0 ) {
        $(".pressForm").validate({
            ignore: "",
            rules: {
                name: {required: true},
                agentsCompany: {required: true},
                agentsPost: {required: true},
                agentsPlace: {required: true},
                phone: {required: true},
                email: {
                    required: true,
                    email: true,
                    remote: {
                        url: "/local/tools/ajax/checkEmail.php",
                        type: "post",
                        data: {
                            action: "checkEmail"
                        }
                    }
                },
                theme: {required: true},
                request: {required: true},
                response: {required: true},
                agree: "required",
                message: {required: true}
            },
            messages: {
                name: {required: currentLangMess.name},
                phone: {required: currentLangMess.phone},
                email: {
                    required: currentLangMess.email,
                    email: currentLangMess.wrongEmail,
                    remote: currentLangMess.wrongEmail
                },
                theme: {required: currentLangMess.theme},
                agree: currentLangMess.agree,
                message: {required: currentLangMess.message},
                agentsCompany: {required: currentLangMess.company},
                agentsPost: {required: currentLangMess.post},
                agentsPlace: {required: currentLangMess.place},
                request: {required: currentLangMess.request},
                response: {required: currentLangMess.response},
            },

            errorElement: 'span',
            errorClass: 'input-error',

            submitHandler: function (form) {
                $.post($(form).attr("action"), $(form).serialize(), function (response) {
                    if (!!response.status && response.status === 1) {
                        $(form).find(".form-input").val("");
                        $(form).find("textarea.form-input").text("");
                        if ($(".dZUpload__UI").length > 0) {
                            var myDropzone = Dropzone.forElement(".dZUpload__UI");
                            myDropzone.removeAllFiles(true);
                        }

                        //if (!!grecaptcha) {
                        //    grecaptcha.reset();
                        //}

                        if (!!response.isSubscribe) {
                            $("#pop-subscribe").find("h3").text(response.message);
                            showPressSuccess("pop-subscribe");
                        } else {
                            showPressSuccess("pop-press-success");
                        }
                    }
                }, 'json');
                return false;
            }
        });
    }

    var dropZoneOptions = {
        url : "/local/tools/ajax/images/",
        paramName: "file",
        params: {
            action: "docs"
        },
        addRemoveLinks: true,
        dictRemoveFile: '',
        dictCancelUpload: '',

        init: function () {

            var that = this;

            this.on("addedfile", function() {

            });
            this.on("complete", function (file) {

            });
            this.on("success", function(file, responseText) {
                var response = jQuery.parseJSON(responseText);
                var p = !!$(that.element).data("action") ? $(that.element).data("action") : "docs";
                if (response.status === "ok"){
                    var f = $('<input type="hidden" name="'+p+'[]" id="'+response.name+'"/>').val(JSON.stringify(response.file));
                    $(that.element).append(f);
                    file.id = response.name;
                }
            });

            this.on("error", function(file, errormessage, xhr){
                this.removeFile(file);
            });
            this.on("removedfile", function(file){
                $("#"+file.id).remove();
            });

        }
    };


    if ( $('.dZUpload__UI').length > 0 ) {
        $('.dZUpload__UI').dropzone(dropZoneOptions);
    }

    function showPressSuccess(pop){
        var popId = "#" + pop,
            scrollCorr = 0;
        var scrollWidth = 0;
        var getScrollN = function(){
            var div = document.createElement('div');

            div.style.overflowY = 'scroll';
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.visibility = 'hidden';

            document.body.appendChild(div);
            scrollWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
        };
        getScrollN();
        $(popId).fadeIn(300);
        $("body").addClass("cutted");
        $(document).outerHeight() > $(window).height() ? scrollCorr = scrollWidth : scrollCorr = 0;
        $("body, footer").css("padding-right", scrollCorr);
    }

    if ($(".dateInForm").length > 0){
        $(".dateInForm").datepicker({
            numberOfMonths: 1,
            yearRange: "1930:2018",
            changeYear: true,
            changeMonth: true,
            dateFormat: "dd.mm.yy",
            regional: "ru",
            firstDay: 1,
            onSelect: function(selectedDate) {

            }
        });

        $.getJSON( "/local/json/cities.json", function( data ) {
            console.log(data);
            var items = [];

            $('.js-select-city').selectize({
                create: false,
                searchField: ['name'],
                sortField: {field: 'sort'}
            });

            var sTo = $('.js-select-city')[0].selectize;


            $.each(data.cities, function (key, val) {
                sTo.addOption({value: val.name, text: val.name, name: val.name, sort: val.sort});
            });

        });


    }

    $('body').on('click', '.agreeCookies', function(e){
        $.post("/local/tools/ajax/cookies.php", {}, function (response) {
            $(".cookies-wrap").remove();
        });

        e.preventDefault();
    });

});