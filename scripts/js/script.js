$(document).ready(function() {

	$("nav p").click(function(e) {

		var linkName = $(this).html().toLowerCase();

		if (linkName != "get location") 
		{
			var url = "http://mypage.iu.edu/~trshelto/ecoSite/scripts/php/func.php";

			var posting = $.post(url, {
				func : "nav",
				navName : linkName
			});

			posting.fail(function(e) {
				$.get("content/" + linkName + ".html", function(data) {
					$('#content').html(data);
				});
			});

			posting.done(function(data) {
				$('#content').html(data);
			});

			$('#mapControl').html('');
		} 
		else 
		{
			var contentArea = $('#content');

			if (navigator.geolocation) 
			{
				var locationContainer;

				navigator.geolocation.getCurrentPosition(showPosition2);

				$('#mapControl').html('<form name="locUpdate">Location (City, State): <input type="text" name="loc"><input type="submit" value="Submit"></form>');

				$('#mapControl form').submit(function(e) {
					e.preventDefault();
					var $form = $(this), 
					yaddress = $form.find('input[name="loc"]').val(); 
					
					alert(yaddress);

					showPosition(yaddress);

					//url = $form.attr('action') + "tmpDInfo/tmpFunc.php";
				
					//var posting = $.post(url, {func: "lc", longitude: longitude, latitude: latitude});

					//showPosition(address);

					// posting.done(function(data) {
					// 	alert(data);
					// });

				});
			} 
			else 
			{
				$('#content').html("Geolocation is not supported by this browser.");
			}
		}

	});
});

		function showPosition(yourAddress) 
		{
			var location = yourAddress;
			var cityLat;
			var cityLon;
			var myLatLng;
			var geo = new google.maps.Geocoder;
			geo.geocode({
				'address' : location
			}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
			myLatLng = results[0].geometry.location;
			cityLat = results[0].geometry.location.lat();
			cityLon = results[0].geometry.location.lng();
			var mapOptions = {
			zoom : 15,
			center : new google.maps.LatLng(cityLat, cityLon),
			mapTypeId : google.maps.MapTypeId.ROADMAP
			};

			var latLng = new google.maps.LatLng(cityLat, cityLon);

			map = new google.maps.Map(document.getElementById('content'), mapOptions);

			var marker = new google.maps.Marker({
			position : myLatLng,
			map : map,
		});

			} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
		});

//$('#content').html("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
}

function showPosition2(positionC) {


var map;

var mapOptions = {
zoom: 15,
center: new google.maps.LatLng(positionC.coords.latitude , positionC.coords.longitude),
mapTypeId: google.maps.MapTypeId.ROADMAP};

var latLng = new google.maps.LatLng(positionC.coords.latitude , positionC.coords.longitude);

map = new google.maps.Map(document.getElementById('content'),mapOptions);

var marker = new google.maps.Marker({
position: latLng,
map: map,
});


//$('#content').html("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
}

