//ipLookUp({}, true);

function getNavigationBrowser() {
  console.log(1);
    if ("geolocation" in navigator) {
      console.log(3);
        navigator.geolocation.getCurrentPosition(
            function success(position) {
              console.log(position);
                ipLookUp({"lat": position.coords.latitude, "lng": position.coords.longitude}, false);
            },
            function error(error) {
              console.log(error);
                $(".searcher #departure").val(0);
                $(".searcherDep").val("");
            }
        );
    } else {
      console.log(2);
        // ipLookUp({});
    }
}

getNavigationBrowser();


function ipLookUp(data, need) {
    $.ajax({
        type: "post",
        url: '/local/tools/ajax/getGeolocation.php',
        data: data,
        dataType: "json",
        error: function(request,error) {
        },
        success: function(data) {
            if (!!data && !!data.data) {
                $('.depCityList li[data-val="'+data.data+'"]').trigger("click");
            }
            if (need) getNavigationBrowser();
        }
    });
}
