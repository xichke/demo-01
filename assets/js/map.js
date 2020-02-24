var map;
var MY_MAPTYPE_ID = 'custom_style';

var pinShadow = function() {
        return new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(12, 35))
    },
    pin = function(color) {
        return new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color,
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));
    },
    passPin, failPin, androidPin, iosPin;

function initialize() {
    passPin = pin('5FA2FA');
    failPin = pin('FA1111');
    androidPin = pin('009933');
    iosPin = pin('FFFFFF');
    var featureOpts = [{
        "featureType": "administrative.province",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#8a9795"
        }, {
            "gamma": 1.27
        }]
    }, {
        "stylers": [{
            "hue": "#00b2ff"
        }, {
            "saturation": -43
        }, {
            "lightness": -29
        }]
    }, {
        "featureType": "road",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "landscape.man_made",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative.locality",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels.text"
    }, {
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }];
    var zoom = 4,
        lat = 34.397,
        lng = -80.644;
    var url = window.location.href.split('@');
    if (url && url.length > 1 && url[1]) {
        var query = url[1].split(',');
        if (query && query.length > 2) {
            lat = +query[0];
            lng = +query[1];
            zoom = Math.floor(+(query[2].replace('z', '')));
        }
    }
    var mapOptions = {
        zoom: zoom,
        center: new google.maps.LatLng(lat, lng),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var styledMapOptions = {
        name: 'GeoComply'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
    try {
        loadData();
    } catch (e) {}
}

function addCircle(location, data) {
    var r;
    if (data.geolocate_in <= 60 && data.pass == '1') {
        r = 60000;
    } else {
        if (data.pass == '1') {
            r = 600000
        } else {
            r = 180000
        }
    }
    if (data.pass == '1') {
        if (data.operating_system.indexOf('Android') > -1) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: androidPin,
                shadow: pinShadow(),
                animation: google.maps.Animation.DROP
            });
        } else if (data.operating_system.indexOf('iOS') > -1) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: iosPin,
                shadow: pinShadow(),
                animation: google.maps.Animation.DROP
            });
        } else {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: passPin,
                shadow: pinShadow(),
                animation: google.maps.Animation.DROP
            });
        }

        setTimeout(function() {
            marker.setMap(null);
        }, r);
        var contentString = '<div id="content">' +
            '<div id="id">' +
            data.transaction +
            '</div>' +
            '<div id="os">' +
            data.operating_system +
            '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    } else {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: failPin,
            shadow: pinShadow(),
            animation: google.maps.Animation.DROP
        });
        setTimeout(function() {
            marker.setMap(null);
        }, r);
        var contentString = '<div id="content">' +
            '<div id="id">' +
            data.transaction +
            '</div>' +
            '<div id="os">' +
            data.operating_system +
            '</div>' +
            '<div id="error">' +
            data.error +
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }
}

function loadData() {
    var refresh_interval = +$('#txtRefreshInterval').val() || 1000;
    setInterval(function() {
        $.ajax({
                url: '/data',
                cache: false
            })
            .done(function(e) {
                for (var i = 0, j = e.length; i < j; i++) {
                    var data = e[i];
                    if (data.lat == null || data.lon == null) return;
                    addCircle(new google.maps.LatLng(data.lat, data.lon), data);
                }
            });
    }, refresh_interval);
}