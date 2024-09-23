var browserChecker = function() {
    var LANGUAGE_COOKIE_NAME = "AF_preferredLanguage",
        Prototype = function() {
            var translations = {
                    ru: {
                        title: "Ваш браузер не поддерживается",
                        description: "Сайт не поддерживает браузер IE11 и более ранние версии.</p><p class='block_text'>Чтобы начать работу с сайтом, советуем воспользоваться одним из следующих браузеров:"
                    },
                    en: {
                        title: "Browser not supported",
                        description: "The website doesn't support your browser version.</p><p class='block_text'>Please upgrade to the latest version of one of these browsers:"
                    }
                },
                lang = "ru";

            function addBodyClass(t) {
                document.body.className += " " + t
            }

            function setBodyClass() {
                var t = window.navigator.userAgent;
                document.body; - 1 != t.indexOf("Safari") && -1 != t.indexOf("Version/10") && addBodyClass("bc-ua-safari--10"), -1 == t.indexOf("MSIE") && -1 == t.indexOf("Trident") && -1 == t.indexOf("Edge") || addBodyClass("bc-ua-ie"), -1 != t.indexOf("MSIE 9") && addBodyClass("bc-ua-ie--9"), -1 != t.indexOf("MSIE 10") && addBodyClass("bc-ua-ie--10"), -1 != t.indexOf("Edge") && addBodyClass("bc-ua-ie--edge"), -1 == t.indexOf("iPhone") && -1 == t.indexOf("iPad") && -1 == t.indexOf("iPod") || (addBodyClass("bc-ua-ios"), addBodyClass("bc-ua-mobile"), -1 != t.indexOf("OS 9") && addBodyClass("bc-ua-ios--9"), -1 != t.indexOf("OS 10") && addBodyClass("bc-ua-ios--10")), -1 == t.indexOf("Windows Phone") && -1 == t.indexOf("IEMobile") || -1 == !t.indexOf("Android") || (addBodyClass("bc-ua-winmobile"), addBodyClass("bc-ua-mobile")), -1 == t.indexOf("Windows Phone") && -1 != t.indexOf("Android") && (addBodyClass("bc-ua-android"), addBodyClass("bc-ua-mobile"))
            }

            function offerBetterBrowser() {
                document.body.innerHTML = '<div class="block__wrapper"> <div class="block__background"> <section class="block__content"> <h1 class="block__title">' + translations[lang].title + '</h1> <p class="block_text">' + translations[lang].description + '</p><ul class="block_links"> <li> <a href="https://www.microsoft.com/windows/microsoft-edge" class="link_item" rel="nofollow"> Microsoft&nbsp;Edge </a> </li> <li> <a href="https://www.mozilla.org/" class="link_item" rel="nofollow"> Mozilla&nbsp;Firefox </a> </li> <li> <a href="https://www.google.com/chrome/" class="link_item" rel="nofollow"> Google&nbsp;chrome </a> </li> <li> <a href="https://www.opera.com/" class="link_item" rel="nofollow"> Opera</a> </li> <li> <a href="https://browser.yandex.ru/" class="link_item" rel="nofollow"> Yandex&nbsp;Browser </a> </li> </ul> </section> </div></div><style>' + css + "</style>"
            }

            function getCookie(t) {
                for (var e = t + "=", o = document.cookie.split(";"), r = 0; r < o.length; r++) {
                    for (var n = o[r];
                         " " === n.charAt(0);) n = n.substring(1, n.length);
                    if (n.substring(0, e.length) === e) return n.substring(e.length, n.length)
                }
            }

            function getLanguage() {
				url = document.location.href;
				if (url.match(/en/)) {
					lang = 'en';
				}
            }

            function isIE() {
                return window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)
            }

            function isUnsupported() {
                var isUnsupported = !1;
                try {
                    eval("var foo = (x) => x+1")
                } catch (t) {
                    isUnsupported = !0
                }
                return !window.Promise || isUnsupported
            }

            function checkBrowser() {
                (isIE() || isUnsupported()) && offerBetterBrowser(lang)
            }
            this.init = function() {
                setBodyClass(), getLanguage(), checkBrowser()
            };
			var css='@font-face{font-family:"Helios";font-display:block;src:url("/local/templates/rossiya_airlines/tpl/fonts/heliosextc.woff2") format("woff2"),url("/local/templates/rossiya_airlines/tpl/fonts/heliosextc.woff") format("woff");font-weight:400;font-style:normal}@font-face{font-family:"Rossiya";font-display:block;src:url("/local/templates/rossiya_airlines/tpl/fonts/Rossiya_regular.ttf") format("truetype");font-weight:400;font-style:normal}body{margin:0}.block__wrapper{position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("/local/templates/rossiya_airlines/tpl/images/content/ie-background.jpg");background-repeat:no-repeat;background-position:center;background-size:cover;-webkit-box-sizing:border-box;box-sizing:border-box}.block__wrapper .block__background{background:#16416e;background:-webkit-gradient(linear,left top,left bottom,from(#16416e),to(rgba(22,65,110,0.4598214286)));background:-o-linear-gradient(top,#16416e 0,rgba(22,65,110,0.4598214286) 100%);background:linear-gradient(180deg,#16416e 0,rgba(22,65,110,0.4598214286) 100%);height:100%;width:100%}.block__wrapper .block__background .block__content{width:100%;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:50px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-family:"Helios"}.block__wrapper .block__background .block__content .block__title{margin:43px 0 19px;font-size:28px;font-family:"Rossiya";text-align:center}.block__wrapper .block__background .block__content .block_text{margin:0;font-size:14.5px;text-align:center}.block__wrapper .block__background .block__content .block_links{list-style:none;padding:0;margin:23px 0 0;display:-webkit-box;display:-ms-flexbox;display:flex}.block__wrapper .block__background .block__content .block_links li:not(:last-child){border-right:3px solid #fff}.block__wrapper .block__background .block__content .block_links .link_item{color:#fff;text-decoration:none;padding:5px 8px;-webkit-transition:all 0.3s;-o-transition:all 0.3s;transition:all 0.3s;font-size:18px}.block__wrapper .block__background .block__content .block_links .link_item:hover{color:#d6b5b9;}@media screen and (max-width:850px){.block__wrapper .block__background .block__content .block_links{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column} .block__wrapper .block__background .block__content .block_links li:not(:last-child){border:none;margin-bottom:10px}}@media screen and (max-width:761px){.block__wrapper .block__background .block__content .block_text{max-width:390px;margin-bottom:15px}}@media screen and (max-width:500px){.block__wrapper .block__background .block__content{padding:10px}}@media screen and (max-width:410px){.block__wrapper .block__background .block__content .block__title{font-size:24px} .block__wrapper .block__background .block__content .block_text{font-size:13px}}'
		};
    return new Prototype
}();
document.addEventListener ? document.addEventListener("DOMContentLoaded", browserChecker.init) : window.onload = browserChecker.init;